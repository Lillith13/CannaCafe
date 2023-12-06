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
  const res = await fetch("/api/users/");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getAllEmps(data));
  }
  if (data.errors) {
    return data.errors;
  }
};

export const getAnEmployee = (empId) => async (dispatch) => {
  const res = await fetch(`/api/users/${empId}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getOneEmp(data.User));
  } else {
    return data;
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
