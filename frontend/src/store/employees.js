const GET_ALL = "employees/GET_ALL";

const getAllEmps = (allemps) => ({
  type: GET_ALL,
  payload: allemps,
});

export const getAllEmployees = () => async (dispatch) => {
  const res = await fetch("/api/users/");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    console.log("employee data sent from thunk => ", data);
    dispatch(getAllEmps(data));
  }
  if (data.errors) {
    return data.errors;
  }
};

export default function reducer(state = {}, action) {
  let new_state;
  switch (action.type) {
    case GET_ALL:
      new_state = action.payload;
      return new_state;
    default:
      return state;
  }
}
