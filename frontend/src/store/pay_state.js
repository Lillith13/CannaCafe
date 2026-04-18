const LOAD_ALL = "pay_state/LOAD_ALL";
const LOAD_SELECT = "pay_state/LOAD_SELECT"

const loadAllTimecards = (payload) => ({
  type: LOAD_ALL,
  payload,
});

export const allEmpTimecards = (userId) => async (dispatch) => {
  // * load all timecards for user
  const res = await fetch(`/api/timecard/${userId}`, {method: "GET"});
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
  const res = await fetch("/api/timecard/clockin", {
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
  const res = await fetch("/api/timecard/clockout", {
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
  const res = await fetch(`/api/timecard/${empId}`, {
    //action will either be "PUT"(edit) or "POST"(new)
    method: action,
    body: formData
  });
  const data = await res.json();
  if (data.errors) return data.errors
  dispatch(loadAllTimecards())
}

export const deleteTimecard = (empId, timecardId) => async (dispatch) => {
  const res = await fetch(`/api/timecard/${empId}`, {
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
      for (let stub of action.payload) {
        new_state[stub.id] = stub;
      }
      return new_state;

    default:
      return state;
  }
}
