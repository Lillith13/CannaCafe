const GET_ALL = "orders/GET_ALL";

const loadUserOrders = (userOrders) => ({
  type: GET_ALL,
  payload: userOrders,
});

export const getAllOrders = () => async (dispatch) => {
  // ! load user orders
  const res = await fetch("/api/orders/");

  const data = await res.json();
  if (res.ok) {
    dispatch(loadUserOrders(data.Past_Orders));
  } else {
    console.log(data);
  }
};

export const createOrder = () => async (dispatch) => {
  const res = await fetch("/api/orders/", {
    method: ["POST"],
  });
  const data = await res.json();
  //   console.log(data);
  return data.Order;
};

export const addUserOrderItems =
  ({ formData, orderId }) =>
  async (dispatch) => {
    // ! add orders
    // console.log(formData);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // console.log(res);
    // const data = await res.json();
    // console.log(data);
  };

// ! remove orders <- for full order returns

// ! remove individual item(s) from order <- for item returns (edit order)

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL:
      //   console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
