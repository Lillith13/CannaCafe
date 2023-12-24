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
import CreateReview from "../AllModals/Review";
import ProductReviews from "./ProductReviews";

import "./ProductDetails.css";
import { getProductReviews } from "../../store/reviews";

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
  const [showReviews, setShowReviews] = useState(false);

  useEffect(async () => {
    const data = await dispatch(loadProduct(id))
      .then(() => dispatch(getAllFavorites()))
      .then(() => dispatch(getWishlist()))
      .then(() => dispatch(getProductReviews(id)))
      .then(() => setIsLoaded(true));
    if (data) {
      console.log("data.errors => ", data.errors);
    }
  }, [dispatch]);

  return isLoaded ? (
    <div className="pageContainer">
      {!product.category.age_restricted ||
      (product.category.age_restricted && user) ? (
        <>
          <div className="goBackButtonDiv">
            <button
              className="goBackButton"
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >
              Go Back
            </button>
          </div>

          <div className="productContainerDiv">
            <div className="productDetailsContainerDiv">
              <div className="nameNavailNpriceDiv">
                <h1>{product.name}</h1>
                <div
                  className={
                    !product.category.shippable ? "priceOnly" : "numAvailNprice"
                  }
                >
                  {product.category.shippable && (
                    <h3>{product.units_available} Available</h3>
                  )}
                  <h3>${product.price}</h3>
                </div>
              </div>

              <div className="productContainer">
                <div className="productImageDiv">
                  {product.previewImg ? (
                    <img
                      className="productImage"
                      src={`${product.previewImg}`}
                    />
                  ) : (
                    <img className="productImage" src={imgPlaceholder} />
                  )}
                </div>
                <div className="prodInfoNButtonsDiv">
                  <div className="productInfoDiv">
                    <p>{product.description}</p>
                  </div>

                  <div className="productButtonsDiv">
                    <div className="universallyAccessibleButtons">
                      <OpenModalButton
                        buttonText={`Add to ${
                          product.category.shippable
                            ? "Shopping Cart"
                            : "Takeaway Bag"
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

                      {userFaves && !product.category.shippable && (
                        <>
                          {Object.keys(userFaves).includes(
                            product.id?.toString()
                          ) && !product.category.shippable ? (
                            <div
                              className="removeFromButton"
                              id="productDetailsRemoveFrom"
                            >
                              <OpenModalButton
                                buttonText="Remove From Favorites"
                                modalComponent={
                                  <ConfirmRemove
                                    where="Favorites"
                                    product={product}
                                  />
                                }
                              />
                            </div>
                          ) : (
                            <div className="productsUnivButton">
                              <OpenModalButton
                                buttonText="Add to Favorites"
                                modalComponent={
                                  <ConfirmAdd
                                    where="Favorites"
                                    product={product}
                                  />
                                }
                              />
                            </div>
                          )}
                        </>
                      )}
                      {userWishes && product.category.shippable && (
                        <>
                          {Object.keys(userWishes).includes(
                            product.id?.toString()
                          ) && product.category.shippable ? (
                            <div
                              className="removeFromButton"
                              id="productDetailsRemoveFrom"
                            >
                              <OpenModalButton
                                buttonText="Remove From Wishlist"
                                modalComponent={
                                  <ConfirmRemove
                                    where="Wishlist"
                                    product={product}
                                  />
                                }
                              />
                            </div>
                          ) : (
                            <div className="productsUnivButton">
                              <OpenModalButton
                                buttonText="Add to Wishlist"
                                modalComponent={
                                  <ConfirmAdd
                                    where="Wishlist"
                                    product={product}
                                  />
                                }
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {user &&
                      (user.role.name === "Manager" ||
                        user.role.name === "Owner") && (
                        <div className="protectedButtons">
                          <div
                            className="editProductButton"
                            id="productDetailsEditProduct"
                          >
                            <OpenModalButton
                              buttonText="Edit Product"
                              modalComponent={
                                <EditProduct
                                  type={[
                                    product.category.shippable
                                      ? "product"
                                      : "menu",
                                  ]}
                                  product={product}
                                />
                              }
                            />
                          </div>
                          <div
                            className="deleteProductButton"
                            id="productDeatilsDeleteProduct"
                          >
                            <OpenModalButton
                              buttonText="Delete Product"
                              modalComponent={
                                <ConfirmDeleteItem
                                  product={product}
                                  type={
                                    product.category.shippable
                                      ? "product"
                                      : "menu"
                                  }
                                />
                              }
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {reviews && Object.values(reviews).length > 0 ? (
            <>
              <p
                onClick={() => setShowReviews(!showReviews)}
                style={{ cursor: "pointer" }}
              >
                {showReviews ? "Hide " : "Show "} Reviews
              </p>
              {showReviews ? (
                <ProductReviews
                  productId={product.id}
                  user={user ? user : null}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            <div className={user.role.name === "Member" ? "" : "hidden"}>
              <h1>Be the first to review!</h1>
              <div className="postReviewModalButton">
                <OpenModalButton
                  buttonText="Add Review"
                  modalComponent={
                    <CreateReview
                      itemId={product.id}
                      locationInfo={{ from: "productDetails" }}
                    />
                  }
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1>This product is Age Restricted</h1>
          <h2>Please Login or Signup to view</h2>
          <OpenModalButton buttonText="Login" modalComponent={<Login />} />
          <OpenModalButton buttonText="Signup" modalComponent={<Signup />} />
        </>
      )}
    </div>
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
