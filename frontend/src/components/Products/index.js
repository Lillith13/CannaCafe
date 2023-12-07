import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";
import {
  getProdsByCat,
  loadAllAll,
  loadAllProducts,
} from "../../store/products";
import { getAllFavorites } from "../../store/favorites";
import { getWishlist } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import EditProduct from "../AllModals/EditProduct";
import ConfirmDeleteItem from "../AllModals/ConfirmDelete/confirmDeleteItem";
import ConfirmAdd from "../AllModals/ConfirmAddTo";
import ConfirmRemove from "../AllModals/ConfirmRemove";

export default function Products() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const userFaves = useSelector((state) => state.favorites);
  const userWishes = useSelector((state) => state.wishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    let data;
    if (params.name) {
      data = await dispatch(getProdsByCat(params.name))
        .then(() => dispatch(getAllFavorites()))
        .then(() => dispatch(getWishlist()))
        .then(() => setIsLoaded(true));
    } else {
      const path = location.pathname.slice(1);
      if (path === "allProducts") {
        data = await dispatch(loadAllAll()).then(() => setIsLoaded(true));
      } else {
        data = await dispatch(loadAllProducts(path)).then(() =>
          setIsLoaded(true)
        );
      }
    }
    if (data) {
      console.log(data.errors);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Go Back
      </button>

      {params && params.name ? (
        <h1>{params.name}</h1>
      ) : (
        <h1>
          {location.pathname.slice(1)[0].toUpperCase() +
            location.pathname.slice(1).substring(1)}
        </h1>
      )}

      {products && (
        <>
          {Object.values(products).map((product) => (
            <div key={product.id}>
              <NavLink
                exact
                to={
                  product.category.shippable
                    ? `/product/${product.id}`
                    : `/menu/${product.id}`
                }
              >
                {product.previewImg ? (
                  <img src={`${product.previewImg}`} />
                ) : (
                  <img src={imgPlaceholder} />
                )}
                <h3>{product.name}</h3>
                {/* Add purchase options later */}
                <p>${product.price}</p>
              </NavLink>
              <OpenModalButton
                buttonText={`Add to ${
                  product.category.shippable ? "Shopping Cart" : "Takeaway Bag"
                }`}
                modalComponent={
                  <ConfirmAdd
                    where={
                      product.category.shippable
                        ? "Shopping Cart"
                        : "Takeaway Bag"
                    }
                    product={product}
                    user={user}
                  />
                }
              />
              {user &&
                (user.role.name == "Owner" || user.role.name == "Manager") && (
                  <>
                    <OpenModalButton
                      buttonText="Edit Product"
                      modalComponent={
                        <EditProduct
                          type={[
                            product.category.shippable ? "product" : "menu",
                          ]}
                          product={product}
                        />
                      }
                    />
                    <OpenModalButton
                      buttonText="Delete Product"
                      modalComponent={<ConfirmDeleteItem product={product} />}
                    />
                  </>
                )}
              {userFaves && userWishes && (
                <>
                  {!Object.keys(userWishes).includes(product.id?.toString()) &&
                    product.category.shippable && (
                      <OpenModalButton
                        buttonText="Add to Wishlist"
                        modalComponent={
                          <ConfirmAdd where="Wishlist" product={product} />
                        }
                      />
                    )}
                  {!Object.keys(userFaves).includes(product.id?.toString()) &&
                    !product.category.shippable && (
                      <OpenModalButton
                        buttonText="Add to Favorites"
                        modalComponent={
                          <ConfirmAdd where="Favorites" product={product} />
                        }
                      />
                    )}
                  {Object.keys(userWishes).includes(product.id?.toString()) &&
                    product.category.shippable && (
                      <OpenModalButton
                        buttonText="Remove From Wishlist"
                        modalComponent={
                          <ConfirmRemove where="Wishlist" product={product} />
                        }
                      />
                    )}
                  {Object.keys(userFaves).includes(product.id?.toString()) &&
                    !product.category.shippable && (
                      <OpenModalButton
                        buttonText="Remove From Favorites"
                        modalComponent={
                          <ConfirmRemove where="Favorites" product={product} />
                        }
                      />
                    )}
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
