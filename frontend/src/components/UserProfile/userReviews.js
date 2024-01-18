import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getALLreviews, getUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../AllModals/ConfirmDelete/ConfirmDeleteReview";
import EditReview from "../AllModals/EditReview";

import noPreviewImage from "../../assets/noImgAvailable.jpg";
import profileIcon from "../../assets/profile_icon.png";
import blackCannaLeaf from "../../assets/blackCannaLeaf.png";

import "./css/tabs/reviews.css";
import "./css/tabs/univ.css";
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

export default function UserReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    if (user.role.name == "Owner" || user.role.name == "Manager") {
      dispatch(getALLreviews()).then((data) => {
        if (!data || data == "undefined") {
          setIsLoaded(true);
        }
      });
    } else {
      dispatch(getUserReviews()).then((data) => {
        if (!data || data == "undefined") {
          setIsLoaded(true);
        }
      });
    }
  }, [dispatch]);

  return isLoaded ? (
    <div className="profileReviewsTabContainer" id="doASiSAYdammit">
      {reviews && reviews.length > 0 ? (
        <>
          {user.role.name == "Owner" || user.role.name == "Manager" ? (
            reviews.reverse().map((review) => (
              <div
                key={review.id}
                className="profileTabReviewDiv"
                id="doASiSAYdammit"
              >
                <div>
                  <div className="userPicNInfo userProfile">
                    <img
                      src={
                        review.user.profile_image
                          ? review.user.profile_image
                          : profileIcon
                      }
                      className="userProfilePicture userProfile"
                    />
                    <h3>{review.user.username}</h3>
                    <h4>
                      {new Date(review.updated_at).toISOString().split("T")[0]}
                    </h4>
                  </div>
                  <div
                    className="reviewedProductImageDiv"
                    style={{
                      backgroundImage: `url(${
                        review.product.preview
                          ? review.product.preview
                          : noPreviewImage
                      })`,
                    }}
                  ></div>

                  <div
                    className="reviewBodyContainer userProfile"
                    id={review.user.id != user.id ? "dontOwn" : ""}
                  >
                    <NavLink exact to={`/products/`}>
                      {console.log(review)}
                      <h4 className="reviewedProductName">
                        {review.product.name}
                      </h4>
                    </NavLink>

                    <div className="reviewStarsDiv userProfile">
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 1
                            ? "selectedRating userProfile"
                            : "starsInProfile userProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 2
                            ? "selectedRating userProfile"
                            : "starsInProfile userProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 3
                            ? "selectedRating userProfile"
                            : "starsInProfile userProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 4
                            ? "selectedRating userProfile"
                            : "starsInProfile userProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating == 5
                            ? "selectedRating userProfile"
                            : "starsInProfile userProfile"
                        }
                      />
                    </div>
                    <p className="usersReviewBody userProfile">
                      {review.review}
                    </p>
                  </div>
                </div>

                {review.user.id == user.id && (
                  <div className="reviewButtonsContaine userProfile">
                    <OpenModalButton
                      buttonText="Edit Review"
                      modalComponent={
                        <EditReview
                          targetReview={review}
                          locationInfo={{
                            productId: review.product.id,
                            from: "userProfile",
                          }}
                        />
                      }
                    />
                    <OpenModalButton
                      buttonText="Delete Review"
                      modalComponent={
                        <DeleteReview
                          reviewId={review.id}
                          locationInfo={{
                            productId: review.product.id,
                            from: "userProfile",
                          }}
                        />
                      }
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <>
              {reviews.reverse().map((review) => (
                <div key={review.id} className="profileTabReviewDiv">
                  <div>
                    <div
                      className="reviewedProductImageDiv"
                      style={{
                        backgroundImage: `url(${
                          review.product.preview
                            ? review.product.preview
                            : noPreviewImage
                        })`,
                      }}
                    ></div>

                    <div className="reviewBodyContainer userProfile">
                      <NavLink
                        exact
                        to={
                          review.product.category.shippable
                            ? `/product/${review.product.id}`
                            : `/menu/${review.product.id}`
                        }
                      >
                        <h4 className="reviewedProductName">
                          {review.product.name}
                        </h4>
                      </NavLink>

                      <div className="reviewStarsDiv userProfile">
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 1
                              ? "selectedRating userProfile"
                              : "starsInProfile userProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 2
                              ? "selectedRating userProfile"
                              : "starsInProfile userProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 3
                              ? "selectedRating userProfile"
                              : "starsInProfile userProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 4
                              ? "selectedRating userProfile"
                              : "starsInProfile userProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating == 5
                              ? "selectedRating userProfile"
                              : "starsInProfile userProfile"
                          }
                        />
                      </div>
                      <div className="usersReviewBody userProfile">
                        {review.review}
                      </div>
                    </div>
                  </div>
                  <div className="reviewButtonsContainer userProfile">
                    <OpenModalButton
                      buttonText=" Edit Review "
                      modalComponent={
                        <EditReview
                          targetReview={review}
                          locationInfo={{
                            productId: review.product.id,
                            from: "userProfile",
                          }}
                        />
                      }
                    />
                    <OpenModalButton
                      buttonText=" Delete Review "
                      modalComponent={
                        <DeleteReview
                          reviewId={review.id}
                          locationInfo={{
                            productId: review.product.id,
                            from: "userProfile",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <h1>No Reviews to show...</h1>
      )}
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
