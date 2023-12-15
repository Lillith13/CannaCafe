import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProductReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../AllModals/Review";
import EditReview from "../AllModals/EditReview";
import DeleteReview from "../AllModals/ConfirmDelete/ConfirmDeleteReview";

import blackCannaLeaf from "../../assets/blackCannaLeaf.png";
import profileIcon from "../../assets/profile_icon.png";
import "./ProductDetails.css";

export default function ProductReviews({ productId, userId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const [dispatchLoaded, setDispatchLoaded] = useState(false);
  const [fullLoad, setFullLoad] = useState(false);
  const [avgRating, setAvgRating] = useState([]);

  useEffect(() => {
    dispatch(getProductReviews(productId)).then(() => {
      setDispatchLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    let added = 0;
    Object.values(reviews).forEach((review) => {
      added += review.rating;
    });
    added = Number(added);
    const count = Object.keys(reviews).length;
    const sum = (added / count).toFixed(2);
    setAvgRating(sum);
    setFullLoad(true);
  }, [dispatchLoaded]);

  return setFullLoad ? (
    <div className="reviewsOuterMostContainer">
      <h2>Product Reviews</h2>
      <div className="reviewContainerTitleDiv">
        {!isNaN(avgRating) ? (
          <p>
            Avg Rating: {avgRating}
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
            <div>
              <div></div>
              {userId && !Object.keys(reviews).includes(String(userId)) && (
                <div>
                  <OpenModalButton
                    buttonText="Add Review"
                    modalComponent={
                      <CreateReview itemId={productId} from="productDetails" />
                    }
                  />
                </div>
              )}
            </div>
            <div className="prodReviewsContainer">
              {Object.values(reviews).map((review) => (
                <div key={review.id} className="productTabReviewDiv">
                  <div
                    className="userPicNInfo"
                    id={userId != review.user.id ? "usersReview" : ""}
                  >
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
                    className="reviewBodyContainer"
                    id={userId != review.user.id ? "usersReview" : ""}
                  >
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

                  {review.user.id == userId && (
                    <div className="reviewButtonsContainer">
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
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p>No reviews to display</p>
            {userId && (
              <div className="postReviewModalButton">
                <OpenModalButton
                  buttonText="Add Review"
                  modalComponent={<CreateReview itemId={productId} />}
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