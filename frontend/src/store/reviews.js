const GET_ALL = "reviews/GET_ALL";

const loadReviews = (reviews) => ({
  type: GET_ALL,
  payload: reviews,
});

export const getALLreviews = () => async (dispatch) => {
  const res = await fetch(`/api/reviews/`);

  const data = await res.json();
  if (res.ok) {
    console.log(data.Reviews);
    dispatch(loadReviews(data.Reviews));
    return null;
  }
};

export const getUserReviews = () => async (dispatch) => {
  const res = await fetch("/api/users/reviews");

  const data = await res.json();
  if (res.ok) {
    console.log(data.Reviews);
    // const normalized = {};
    // data.Reviews.forEach((review) => {
    //   normalized[review.id] = review;
    // });
    dispatch(loadReviews(data.Reviews));
    return null;
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`);

  const data = await res.json();
  if (res.ok) {
    console.log(data.Reviews);

    const normalized = {};
    data.Reviews.forEach((review) => {
      normalized[review.id] = review;
    });
    dispatch(loadReviews(normalized));

    return null;
  }
};

export const addReview =
  ({ formData, itemId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/products/${itemId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      return null;
    }
  };

export const editReview =
  ({ reviewId, formData }) =>
  async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      return null;
    }
  };

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return null;
  }
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_ALL:
      console.log(action.payload);
      new_state = action.payload;
      return new_state;
    default:
      return state;
  }
}
