const LOAD_ALL = "pay_state/LOAD_ALL";
const LOAD_SELECT = "pay_state/LOAD_SELECT"

const loadAllTimecards = (payload) => ({
  type: LOAD_ALL,
  payload,
});

export const allEmpTimecards = (userId, setQueryLimit) => async (dispatch) => {
  // * load all timecards for user
  const res = await fetch(`/api/paystub/${userId}/${setQueryLimit}`,
    {method: "GET"});
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  // let test = [...data]
  // console.log(test)
  dispatch(loadAllTimecards(data));
};

export const userClockin = () => async (dispatch) => {
  // ! clockin
  const res = await fetch("/api/paystub/clockin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);
  if (data.errors) return data.errors;
};

export const userClockout = () => async (dispatch) => {
  // ! clockout
  const res = await fetch("/api/paystub/clockout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);
  if (data.errors) return data.errors;
};

export const editTimecard = (empId, action, formData) => async (dispatch) => {
  const res = await fetch(`/api/paystub/${empId}`, {
    //action will either be "PUT"(edit) or "POST"(new)
    method: action,
    body: formData
  });
  const data = await res.json();
  if (data.errors) return data.errors
  dispatch(loadAllTimecards())
}

export const deleteTimecard = (empId, timecardId) => async (dispatch) => {
  const res = await fetch(`/api/paystub/${empId}`, {
    method: "DELETE",
    body: timecardId
  });
  const data = await res.json();
  if (data.errors) return data.errors
  dispatch(loadAllTimecards())
};

export default function reducer(state = {}, action) {
  let new_state = {}

  switch (action.type) {
    case LOAD_ALL:
      // load payStubs
      new_state = [...action.payload]
      return new_state;

    default:
      return state;
  }
}
