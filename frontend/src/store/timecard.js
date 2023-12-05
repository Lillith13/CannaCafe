const CLOCK_IN = "timecard/CLOCK_IN";
const CLOCK_OUT = "timecard/CLOCK_OUT";
const LOAD_ALL = "timecard/LOAD_ALL";
const LOAD_ONE = "timecard/LOAD_ONE";

// ! load all timecards for user <- will be used for all CRUD actions

// ! load specific timecard for user

export const userClockin = () => async (dispatch) => {
  // ! clockin
  const res = await fetch("/api/timecard/clockin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    return null;
  } else {
    if (data.errors) {
      return data.errors;
    } else {
      return data;
    }
  }
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
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    return null;
  } else {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    } else {
      return data;
    }
  }
};

export const editTimecard =
  ({ newClockData, timecardId }) =>
  async (dispatch) => {
    // ! edit timecard
    // const res = fetch("/api/");
  };

export const deleteTimecard = (timecardId) => async (dispatch) => {
  // ! delete timecard
  // const res = fetch("/api/");
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case CLOCK_IN:
      return new_state;
    case CLOCK_OUT:
      return new_state;
    case LOAD_ALL:
      return new_state;
    case LOAD_ONE:
      return new_state;
    default:
      return state;
  }
}
