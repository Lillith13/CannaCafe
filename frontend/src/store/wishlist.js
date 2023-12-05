const GET_ALL = "wishlist/GET_ALL";

const loadWishlist = (wishlist) => ({
  type: GET_ALL,
  payload: wishlist,
});

export const getWishlist = () => async (dispatch) => {
  // ! get all products in wishlist
  const res = await fetch("/api/wishlist/");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    dispatch(loadWishlist(data.Wishlist));
    return null;
  } else {
    console.log(data);
    return data;
  }
};

export const addToWishlist = (productId) => async (dispatch) => {
  // ! add item to wishlist
  const res = await fetch(`/api/wishlist/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    console.log(data);
    dispatch(getWishlist());
    return null;
  } else {
    console.log(data);
    return data;
  }
};

export const delFromWishlist = (productId) => async (dispatch) => {
  // ! remove item from wishlist
  const res = await fetch(`/api/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    console.log(data);
    dispatch(getWishlist());
    return null;
  } else {
    console.log(data);
    return data;
  }
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_ALL:
      for (let item of action.payload) {
        new_state[item.id] = item;
      }
      return new_state;
    default:
      return state;
  }
}
