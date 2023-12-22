const GET_ALL = "orders/GET_ALL";

const loadUserOrders = (userOrders) => ({
  type: GET_ALL,
  payload: userOrders,
});

export const getAllOrders = () => async (dispatch) => {
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
  return data.Order;
};

export const addUserOrderItems =
  ({ formData, orderId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

export const returnWholeOrder = (orderId) => async (dispatch) => {
  const res = await fetch(`api/orders/${orderId}`, {
    method: "DELETE",
  });
  console.log(res);
  if (res.ok) {
    return null;
  } else {
    const data = await res.json();
    return data.errors;
  }
};

export const returnItem = (orderId, itemId) => async (dispatch) => {
  const res = await fetch(`api/orders/${orderId}/${itemId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    return null;
  } else {
    const data = await res.json();
    return data.errors;
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL:
      //   console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
