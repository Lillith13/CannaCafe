const GET_ALL = "favorites/GET_ALL";

const getAllFaves = (faves) => ({
  type: GET_ALL,
  payload: faves,
});

export const getAllFavorites = () => async (dispatch) => {
  // * get all favorites
  const res = await fetch("/api/favorites/");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    dispatch(getAllFaves(data.Favorites));
    return null;
  } else {
    console.log(data);
    return data;
  }
};

export const addToFaves = (itemId) => async (dispatch) => {
  // * add item to favorites
  const res = await fetch(`/api/favorites/${itemId}`, {
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
    dispatch(getAllFavorites());
    return null;
  } else {
    console.log(data);
    return data;
  }
};

export const delFromFaves = (itemId) => async (dispatch) => {
  // * remove item from favorites
  const res = await fetch(`/api/favorites/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    console.log(data);
    dispatch(getAllFavorites());
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
