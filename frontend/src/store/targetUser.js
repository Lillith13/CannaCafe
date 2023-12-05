const GET_USER = "targetUser/GET_USER";
const ALL_EMPS = "targerUser/ALL_EMPS";

const setTarget = (user) => ({
  type: GET_USER,
  payload: user,
});

const setAllEmps = (users) => ({
  type: ALL_EMPS,
  payload: users,
});

export const getTargetUser = (targetUserId) => async (dispatch) => {
  const res = await fetch(`/api/users/${targetUserId}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    console.log(data.User);
    dispatch(setTarget(data.User));
    return null;
  } else {
    console.log(data);
    return data;
  }
};

// ! add remove employee thunk that sets the employees role back to Member <- connects to a "Remove Employee" button

export const getAllEmployees = () => async (dispatch) => {
  const res = await fetch("/api/users");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    console.log(data);
    dispatch(setAllEmps(data));
  } else {
    console.log(data);
    return data;
  }
};

export default function reducer(state = {}, action) {
  let new_state;
  switch (action.payload) {
    case GET_USER:
      console.log(action.payload);
      new_state = action.payload;
      return new_state;
    case ALL_EMPS:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
