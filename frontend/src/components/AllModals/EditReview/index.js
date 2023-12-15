import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import whiteCannaLeaf from "../../../assets/whiteCannaLeaf.png";
import blackCannaLeaf from "../../../assets/blackCannaLeaf.png";
import "./EditReview.css";

import { useModal } from "../../../context/Modal";
import {
  editReview,
  getALLreviews,
  getProductReviews,
  getUserReviews,
} from "../../../store/reviews";

export default function EditReview({ targetReview, locationInfo }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const [activeStars, setActiveStars] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [rev, setReview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { review, rating } = targetReview;
    setReview(review);
    setNewRating(rating);
  }, []);
  //

  const handleSubmit = (e) => {
    e.preventDefault();

    let errs = {};
    if (rev.length < 10) {
      errs["review"] = "Review must be 10 characters or longer";
    }
    if (rev.length > 2000) {
      errs["review"] = "Review must be 2000 characters or less";
    }
    if (!newRating) {
      errs["rating"] = "Rating is required";
    }

    if (Object.values(errs).length) {
      setErrors(errs);
    } else {
      const formData = {
        rev,
        rating: newRating,
      };
      // console.log(targetReview.id);
      const inputData = { reviewId: targetReview.id, formData };
      dispatch(editReview(inputData)).then((data) => {
        if (!data || data == "undefined") {
          switch (locationInfo.from) {
            case "productDetails":
              dispatch(getProductReviews(locationInfo.productId)).then(() =>
                closeModal()
              );
              return;
            case "userProfile":
              if (user.role.name == "Owner" || user.role.name == "Manager") {
                dispatch(getALLreviews()).then(() => closeModal());
              } else {
                dispatch(getUserReviews()).then(() => closeModal());
              }
              return;
            default:
              return;
          }
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
          value={rev}
          onChange={(e) => setReview(e.target.value)}
          placeholder={errors.review ? "* " + errors.review : ""}
        />
        <div className="charCountDiv">
          <p>You've used </p>
          <div className="charCountSubDiv">
            <p
              className={
                rev.length < 10 || rev.length > 2000 ? "outOfRange" : "good"
              }
            >
              {rev.length}
            </p>
            <p>/2000 characters</p>
          </div>
        </div>
        <div
          className="starsContainer"
          onMouseLeave={() => {
            switch (newRating) {
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
              activeStars.includes("star1") || newRating >= 1
                ? "activeStar"
                : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1"]);
            }}
            onClick={() => setNewRating(1)}
            src={blackCannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star2") || newRating >= 2
                ? "activeStar"
                : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2"]);
            }}
            onClick={() => setNewRating(2)}
            src={blackCannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star3") || newRating >= 3
                ? "activeStar"
                : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3"]);
            }}
            onClick={() => setNewRating(3)}
            src={blackCannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star4") || newRating >= 4
                ? "activeStar"
                : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3", "star4"]);
            }}
            onClick={() => setNewRating(4)}
            src={blackCannaLeaf}
          />
          <img
            className="stars"
            id={
              activeStars.includes("star5") || newRating == 5
                ? "activeStar"
                : ""
            }
            onMouseEnter={() => {
              setActiveStars(["star1", "star2", "star3", "star4", "star5"]);
            }}
            onClick={() => setNewRating(5)}
            src={blackCannaLeaf}
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
