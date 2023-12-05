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
import {
  addToFaves,
  delFromFaves,
  getAllFavorites,
} from "../../store/favorites";
import {
  addToWishlist,
  delFromWishlist,
  getWishlist,
} from "../../store/wishlist";

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

  const handleAdd = async (e, shippable) => {
    e.preventDefault();
    let data = null;
    if (shippable) {
      data = await dispatch(addToWishlist(e.target.value));
    } else {
      data = await dispatch(addToFaves(e.target.value));
      if (data) {
        console.log(data);
      }
    }
    if (!data) {
      let msg;
      if (shippable) {
        msg = "Successfully added to wishlist";
      } else {
        msg = "Successfully added to favorites";
      }
      alert(msg);
    }
  };
  const handleRemove = async (e, shippable) => {
    e.preventDefault();
    let data = null;
    if (shippable) {
      data = await dispatch(delFromWishlist(e.target.value));
    } else {
      data = await dispatch(delFromFaves(e.target.value));
    }
    if (data) {
      console.log(data);
    }
    if (!data) {
      let msg;
      if (shippable) {
        msg = "Successfully removed from wishlist";
      } else {
        msg = "Successfully removed from favorites";
      }
      alert(msg);
    }
  };

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
                <p>${product.price} --- maybe add purchase options later</p>
              </NavLink>
              <button>
                Add to {product.category.shippable ? "Cart" : "Bag"}
              </button>
              {user &&
                (user.role.name == "Owner" || user.role.name == "Manager") && (
                  <>
                    <button>Edit Product</button>
                    <button>Delete Product</button>
                  </>
                )}
              {userFaves && userWishes && (
                <>
                  {!Object.keys(userWishes).includes(product.id?.toString()) &&
                    product.category.shippable && (
                      <button
                        value={product.id}
                        onClick={(e) => handleAdd(e, true)}
                      >
                        Add to Wishlist
                      </button>
                    )}
                  {!Object.keys(userFaves).includes(product.id?.toString()) &&
                    !product.category.shippable && (
                      <button
                        value={product.id}
                        onClick={(e) => handleAdd(e, false)}
                      >
                        Add to Favorites
                      </button>
                    )}
                  {Object.keys(userWishes).includes(product.id?.toString()) &&
                    product.category.shippable && (
                      <button
                        value={product.id}
                        onClick={(e) => handleRemove(e, true)}
                      >
                        Remove From Wishlist
                      </button>
                    )}
                  {Object.keys(userFaves).includes(product.id?.toString()) &&
                    !product.category.shippable && (
                      <button
                        value={product.id}
                        onClick={(e) => handleRemove(e, false)}
                      >
                        Remove From Favorites
                      </button>
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
