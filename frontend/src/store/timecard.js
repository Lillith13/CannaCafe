const LOAD_ALL = "timecard/LOAD_ALL";
const LOAD_ONE = "timecard/LOAD_ONE";

const loadAllTimecards = (timecards) => ({
  type: LOAD_ALL,
  payload: timecards,
});

export const allUserTimecards = (userId) => async (dispatch) => {
  // * load all timecards for user
  const res = await fetch(`/api/timecard/${userId}`);
  const data = await res.json();
  console.log(res);
  console.log(data);
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(loadAllTimecards(data.Timecards));
    return null;
  }
  if (data.errors) {
    return data.errors;
  }
  //
};

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
    case LOAD_ALL:
      for (let card of action.payload) {
        new_state[card.id] = card;
      }
      return new_state;
    case LOAD_ONE:
      return new_state;
    default:
      return state;
  }
}
