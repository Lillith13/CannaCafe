import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import whiteCannaLeaf from "../../../assets/whiteCannaLeaf.png";
import cannaLeaf from "../../../assets/blackCannaLeaf.png";
import "./Review.css";

import { useModal } from "../../../context/Modal";
import {
  addReview,
  getALLreviews,
  getProductReviews,
  getUserReviews,
} from "../../../store/reviews";

export default function CreateReview({ itemId, locationInfo }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const [activeStars, setActiveStars] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  //

  const handleSubmit = (e) => {
    e.preventDefault();

    let errs = {};
    if (review.length < 10) {
      errs["review"] = "Review must be 10 characters or longer";
    }
    if (review.length > 2000) {
      errs["review"] = "Review must be 2000 characters or less";
    }
    if (!rating) {
      errs["rating"] = "Rating is required";
    }

    if (Object.values(errs).length) {
      setErrors(errs);
    } else {
      const formData = {
        rev: review,
        rating,
      };
      console.log(itemId);
      const inputData = { itemId, formData };
      dispatch(addReview(inputData)).then((data) => {
        if (!data || data == "undefined") {
          if (user.role.name == "Owner" || user.role.name == "Manager") {
            dispatch(getALLreviews()).then((subData) => {
              if (!subData || subData != "undefined") {
                closeModal();
              } else {
                console.log(subData);
              }
            });
          } else {
            switch (locationInfo.from) {
              case "productDetails":
                dispatch(getProductReviews(itemId)).then((subData) => {
                  if (!subData || subData != "undefined") {
                    closeModal();
                  } else {
                    console.log(subData);
                  }
                });
                return;
              case "userProfile":
                dispatch(getUserReviews()).then((subData) => {
                  if (!subData || subData != "undefined") {
                    closeModal();
                  } else {
                    console.log(subData);
                  }
                });
                return;
            }
          }
          closeModal();
        }
      });
    }
  };

  return (
    <div className="reviewFormContainer">
      <form onSubmit={handleSubmit} className="reviewForm">
        <h1>How was your experience with this product?</h1>
        <textarea
          className="reviewBody"
          id={errors.review ? "outOfRange" : ""}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={errors.review ? "* " + errors.review : ""}
        />
        <div className="charCountDiv">
          <p>You've used </p>
          <div className="charCountSubDiv">
            <p
              className={
                review.length < 10 || review.length > 2000
                  ? "outOfRange"
                  : "good"
              }
            >
              {review.length}
            </p>
            <p>/2000 characters</p>
          </div>
        </div>
        <div
          className="starsContainer"
          onMouseLeave={() => {
            switch (rating) {
              case 1:
                setActiveStars(["star1"]);
                return;
              case 2:
                setActiveStars(["star1", "star2"]);
                return;
              case 3:
                setActiveStars(["star1", "star2", "star3"]);
                return;
              case 4:
                setActiveStars(["star1", "star2", "star3", "star4"]);
                return;
              case 5:
                setActiveStars(["star1", "star2", "star3", "star4", "star5"]);
                return;
              default:
                setActiveStars([]);
                return;
            }
          }}
        >
          <img
            className="stars"
            id={
              activeStars.includes("star1") || rating >= 1 ? "activeStar" : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1"]);
            }}
            onClick={() => setRating(1)}
            src={cannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star2") || rating >= 2 ? "activeStar" : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2"]);
            }}
            onClick={() => setRating(2)}
            src={cannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star3") || rating >= 3 ? "activeStar" : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3"]);
            }}
            onClick={() => setRating(3)}
            src={cannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star4") || rating >= 4 ? "activeStar" : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3", "star4"]);
            }}
            onClick={() => setRating(4)}
            src={cannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star5") || rating == 5 ? "activeStar" : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3", "star4", "star5"]);
            }}
            onClick={() => setRating(5)}
            src={cannaLeaf}
          />
        </div>
        <div className="reviewError">
          {errors.rating ? "* " + errors.rating : ""}
        </div>
        <button type="submit" className="submitReviewButton">
          Submit
        </button>
      </form>
    </div>
  );
}
