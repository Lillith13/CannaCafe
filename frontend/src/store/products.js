const GET_PRODUCTS = "session/GET_PRODUCTS";

const getAllProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products,
});

export const getProducts = (user) => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  if (data.errors) {
    console.log(data.errors);
  }
  if (res.ok) {
    console.log(data);
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return state;
    default:
      return state;
  }
}
