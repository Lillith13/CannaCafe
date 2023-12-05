import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";
import { loadProduct } from "../../store/products";
import {
  addToFaves,
  delFromFaves,
  getAllFavorites,
} from "../../store/favorites";
import {
  getWishlist,
  addToWishlist,
  delFromWishlist,
} from "../../store/wishlist";

import OpenModalButton from "../OpenModalButton";
import Login from "../AllModals/Login";
import Signup from "../AllModals/Signup";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products);
  const userFaves = useSelector((state) => state.favorites);
  const userWishes = useSelector((state) => state.wishlist);
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(loadProduct(params.id))
      .then(() => dispatch(getAllFavorites()))
      .then(() => dispatch(getWishlist()))
      .then(() => setIsLoaded(true));
    if (data) {
      console.log("data.errors => ", data.errors);
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
            <button>
              Add to {product.category.shippable ? "cart" : "bag"}
            </button>
            {user &&
              (user.role.name === "Manager" || user.role.name === "Owner") && (
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
