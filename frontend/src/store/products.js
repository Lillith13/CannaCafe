const GET_CATEGORIES = "session/GET_CATEGORIES";

const getAllCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

export const getCategories = () => async (dispatch) => {
  const res = await fetch("/api/categories");
  const data = await res.json();
  if (data.errors) {
    return;
  }
  if (res.ok) {
    dispatch(getAllCategories(data.Categories));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const new_state = {};
      for (let category of action.payload) {
        new_state[category.id] = category;
      }
      return new_state;
    default:
      return state;
  }
}
