const GET_USER = "targetUser/GET_USER";

const setTarget = (user) => ({
  type: GET_USER,
  payload: user,
});

// * For loading usernames on reviews for owner and manager views without disruption employees state
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

export default function reducer(state = {}, action) {
  let new_state;
  switch (action.payload) {
    case GET_USER:
      console.log(action.payload);
      new_state = action.payload;
      return new_state;
    default:
      return state;
  }
}
