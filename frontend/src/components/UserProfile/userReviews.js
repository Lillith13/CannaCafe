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

import "./css/UserProfile.css";

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
                  <div className="userPicNInfo">
                    <img
                      src={
                        review.user.profile_image
                          ? review.user.profile_image
                          : profileIcon
                      }
                      className="userProfilePicture"
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
                    className="reviewBodyContainer"
                    id={review.user.id != user.id ? "dontOwn" : ""}
                  >
                    <NavLink exact to={`/products/`}>
                      {console.log(review)}
                      <h4 className="reviewedProductName">
                        {review.product.name}
                      </h4>
                    </NavLink>

                    <div className="reviewStarsDiv">
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 1
                            ? "selectedRating"
                            : "starsInProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 2
                            ? "selectedRating"
                            : "starsInProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 3
                            ? "selectedRating"
                            : "starsInProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 4
                            ? "selectedRating"
                            : "starsInProfile"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating == 5
                            ? "selectedRating"
                            : "starsInProfile"
                        }
                      />
                    </div>
                    <p className="usersReviewBody">{review.review}</p>
                  </div>
                </div>

                {review.user.id == user.id && (
                  <div className="reviewButtonsContainer">
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

                    <div className="reviewBodyContainer">
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

                      <div className="reviewStarsDiv">
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 1
                              ? "selectedRating"
                              : "starsInProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 2
                              ? "selectedRating"
                              : "starsInProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 3
                              ? "selectedRating"
                              : "starsInProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating >= 4
                              ? "selectedRating"
                              : "starsInProfile"
                          }
                        />
                        <img
                          src={blackCannaLeaf}
                          className={
                            review.rating == 5
                              ? "selectedRating"
                              : "starsInProfile"
                          }
                        />
                      </div>
                      <div className="usersReviewBody">{review.review}</div>
                    </div>
                  </div>
                  <div className="reviewButtonsContainer">
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
