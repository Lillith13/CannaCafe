import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";
import { loadProduct } from "../../store/products";
import { getAllFavorites } from "../../store/favorites";
import { getWishlist } from "../../store/wishlist";
import //
"../../store/reviews";

import OpenModalButton from "../OpenModalButton";
import Login from "../AllModals/Login";
import Signup from "../AllModals/Signup";
import EditProduct from "../AllModals/EditProduct";
import ConfirmDeleteItem from "../AllModals/ConfirmDelete/confirmDeleteItem";
import ConfirmAdd from "../AllModals/ConfirmAddTo";
import ConfirmRemove from "../AllModals/ConfirmRemove";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products);
  const reviews = useSelector((state) => state.reviews);
  const userFaves = useSelector((state) => state.favorites);
  const userWishes = useSelector((state) => state.wishlist);
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(loadProduct(id))
      .then(() => dispatch(getAllFavorites()))
      .then(() => dispatch(getWishlist()))
      .then(() => setIsLoaded(true));
    if (data) {
      console.log("data.errors => ", data.errors);
    }
  }, [dispatch]);

  return isLoaded ? (
    <>
      {!product.category.age_restricted ||
      (product.category.age_restricted && user) ? (
        <>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >
              Go Back
            </button>
          </div>
          <div>
            <h1>{product.name}</h1>
            {product.previewImg ? (
              <img src={`${product.previewImg}`} />
            ) : (
              <img src={imgPlaceholder} />
            )}
          </div>
          <div>
            <p>{product.description}</p>
            <p>{product.units_available} Available</p>
            <p>${product.price}</p>
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
              (user.role.name === "Manager" || user.role.name === "Owner") && (
                <>
                  <OpenModalButton
                    buttonText="Edit Product"
                    modalComponent={
                      <EditProduct
                        type={[product.category.shippable ? "product" : "menu"]}
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
          <h3>Reviews</h3>
          <p>Product reviews will load here...</p>
        </>
      ) : (
        <>
          <h1>This product is Age Restricted</h1>
          <h2>Please Login or Signup to view</h2>
          <OpenModalButton buttonText="Login" modalComponent={<Login />} />
          <OpenModalButton buttonText="Signup" modalComponent={<Signup />} />
        </>
      )}
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

/*
category
:
{age_restricted: true, id: 5, name: 'Smoke', shippable: true}
description
:
"Demo smoke - the greenest of trees"
id
:
6
name
:
"demoSmoke"
otherImgs
:
Array(0)
length
:
0
[[Prototype]]
:
Array(0)
previewImg
:
null
price
:
"15.00"
units_available
:
150 */
