import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../AllModals/Review";
import EditReview from "../AllModals/EditReview";
import DeleteReview from "../AllModals/ConfirmDelete/ConfirmDeleteReview";

import blackCannaLeaf from "../../assets/blackCannaLeaf.png";
import profileIcon from "../../assets/profile_icon.png";

import "./css/ProductDetails.css";

export default function ProductReviews({ productId, user }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const [dispatchLoaded, setDispatchLoaded] = useState(false);
  const [fullLoad, setFullLoad] = useState(false);
  const [avgRating, setAvgRating] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  useEffect(() => {
    dispatch(getProductReviews(productId)).then(() => {
      setDispatchLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    let added = 0;
    Object.values(reviews).forEach((review) => {
      // console.log(review);
      added += review.rating;
    });
    added = Number(added);
    const count = Object.keys(reviews).length;
    const sum = (added / count).toFixed(2);
    // console.log(sum);
    setAvgRating(sum);
    setFullLoad(true);
  }, [dispatchLoaded]);

  return fullLoad ? (
    <div className="reviewsOuterMostContainer" id={theme}>
      <h2>Product Reviews</h2>
      <div className="reviewContainerTitleDiv">
        {!isNaN(avgRating) ? (
          <p>
            {Object.values(reviews).length > 0 && "Avg Rating: " + avgRating}
            {" * "}
            {Object.values(reviews).length}{" "}
            {Object.values(reviews).length == 1 ? "Review" : "Reviews"}
          </p>
        ) : (
          <p>
            {Object.values(reviews).length}{" "}
            {Object.values(reviews).length == 1 ? "Review" : "Reviews"}
          </p>
        )}
      </div>

      <div className="productReviewsContainerDiv">
        {Object.values(reviews).length > 0 ? (
          //
          <div className="productReviewContainerDiv">
            <div className="postReviewModalButton">
              {user &&
                !Object.keys(reviews).includes(String(user.id)) &&
                !Object.keys(reviews).includes(user.id) && (
                  <div className={user.role.name === "Member" ? "" : "hidden"}>
                    <OpenModalButton
                      buttonText="Add Review"
                      modalComponent={
                        <CreateReview
                          itemId={productId}
                          from="productDetails"
                        />
                      }
                    />
                  </div>
                )}
            </div>
            <div className="prodReviewsContainer">
              {Object.values(reviews).map((review) => (
                <div key={review.id} className="productTabReviewDiv" id={theme}>
                  <div className="userPicNInfo productDetails" id={theme}>
                    <img
                      src={
                        review.user.profile_image
                          ? review.user.profile_image
                          : profileIcon
                      }
                      className="userProfilePicture productDetails"
                      id={theme}
                    />
                    <h3>{review.user.username}</h3>
                    <h4>
                      {new Date(review.updated_at).toISOString().split("T")[0]}
                    </h4>
                  </div>

                  <div
                    className={
                      review.user.profile_image
                        ? "reviewBodyContainer currUserReview"
                        : "reviewBodyContainer otherReview"
                    }
                  >
                    <div className="reviewStarsDiv">
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 1
                            ? "selectedRating productDetails"
                            : "starsInProfile productDetails"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 2
                            ? "selectedRating productDetails"
                            : "starsInProfile productDetails"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 3
                            ? "selectedRating productDetails"
                            : "starsInProfile productDetails"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating >= 4
                            ? "selectedRating productDetails"
                            : "starsInProfile productDetails"
                        }
                      />
                      <img
                        src={blackCannaLeaf}
                        className={
                          review.rating == 5
                            ? "selectedRating productDetails"
                            : "starsInProfile productDetails"
                        }
                      />
                    </div>
                    <p className="usersReviewBody productDetails" id={theme}>
                      {review.review}
                    </p>
                  </div>

                  <div
                    className={
                      review.user.id == user?.id
                        ? "reviewButtonsContainer  productDetails"
                        : "hidden"
                    }
                    id={theme}
                  >
                    <OpenModalButton
                      buttonText="Edit Review"
                      modalComponent={
                        <EditReview
                          targetReview={review}
                          locationInfo={{
                            productId: productId,
                            from: "productDetails",
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
                            productId: productId,
                            from: "productDetails",
                          }}
                        />
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p>No reviews to display</p>
            {user.id &&
              user.role.name != "Owner" &&
              user.role.name != "Manager" &&
              user.role.name != "Employee" && (
                <div
                  className="postReviewModalButton productDetails"
                  id={theme}
                >
                  <OpenModalButton
                    buttonText="Add Review"
                    modalComponent={
                      <CreateReview
                        itemId={productId}
                        locationInfo={{ from: "productDetails" }}
                      />
                    }
                  />
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>
      <h3>Reviews</h3>
      <p>Loading...</p>
    </div>
  );
}
