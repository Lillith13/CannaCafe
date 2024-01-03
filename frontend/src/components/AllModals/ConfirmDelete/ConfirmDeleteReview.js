import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import {
  deleteReview,
  getProductReviews,
  getUserReviews,
} from "../../../store/reviews";

export default function DeleteReview({ reviewId, locationInfo }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  //
  const handleDelete = () => {
    dispatch(deleteReview(reviewId)).then((data) => {
      if (!data || data == "undefined") {
        switch (locationInfo.from) {
          case "productDetails":
            dispatch(getProductReviews(locationInfo.productId)).then(() =>
              closeModal()
            );
            return;
          case "userProfile":
            dispatch(getUserReviews()).then(() => closeModal());
            return;
          default:
            return;
        }
      }
    });
  };

  return (
    <div className="confirmDeleteReviewContainer">
      <h1>Are you sure you would like to delete your review?</h1>
      <div className="confirmDeleteReviewButtonsContainer">
        <button className="confirmDeleteReviewButton" onClick={handleDelete}>
          Yes (delete review)
        </button>
        <button onClick={closeModal}>No (keep review)</button>
      </div>
    </div>
  );
}
