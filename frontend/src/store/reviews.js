const GET_ALL = "reviews/GET_ALL";

const loadReviews = (reviews) => ({
  type: GET_ALL,
  payload: reviews,
});

export const getALLreviews = () => async (dispatch) => {
  const res = await fetch(`/api/reviews/`);

  const data = await res.json();
  if (res.ok) {
    dispatch(loadReviews(data.Reviews));
    return null;
  } else {
    console.log(data);
  }
};

export const getUserReviews = () => async (dispatch) => {
  const res = await fetch("/api/users/reviews");

  const data = await res.json();
  if (res.ok) {
    dispatch(loadReviews(data.Reviews));
    return null;
  } else {
    console.log(data);
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  console.log(res);

  const data = await res.json();
  if (res.ok) {
    console.log(data);
    dispatch(loadReviews(data.Reviews));
    return null;
  } else {
    console.log(data);
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

    console.log(res);

    if (res.ok) {
      return null;
    } else {
      const data = await res.json();
      console.log(data);
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
    } else {
      const data = await res.json();
      console.log(data);
    }
  };

export const deleteReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return null;
  } else {
    const data = await res.json();
    console.log(data);
  }
};
// ! delete review

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_ALL:
      console.log(action.payload);
      if (action.payload == null) {
        new_state = {};
      } else {
        action.payload.forEach((review) => {
          new_state[review.user.id] = review;
        });
      }
      return new_state;
    default:
      return state;
  }
}
