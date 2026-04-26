const GET_ALL = "employees/GET_ALL";
const GET_ONE = "employees/GET_ONE";

const getAllEmps = (allemps) => ({
  type: GET_ALL,
  payload: allemps,
});

const getOneEmp = (emp) => ({
  type: GET_ONE,
  payload: emp,
});

export const getAllEmployees = () => async (dispatch) => {
  try {
    const res = await fetch("/api/users/");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllEmps(data));
    } else {
      // Handle the error (e.g., log it or dispatch an error action)
      const errorData = await res.text(); // Use .text() because servers often send HTML on 500
      // console.error(`Backend Error (${res.status}):`, errorData);
      // console.error("Server Error:", errorData);
    }
    //
  } catch (err) {
    // console.error("Err? => ", err)
  }
};

export const getAnEmployee = (empId) => async (dispatch) => {
  const res = await fetch(`/api/users/${empId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getOneEmp(data.User));
  } else {
    const errorData = await res.text()
    console.error("Server Error:", errorData)
    return data.errors;
  }
};

export default function reducer(state = {}, action) {
  let new_state;
  switch (action.type) {
    case GET_ALL:
      new_state = action.payload;
      return new_state;
    case GET_ONE:
      new_state = action.payload;
      return new_state;
    default:
      return state;
  }
}
