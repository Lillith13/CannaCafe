const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  // * If login & current_user persistance breaks in live take the tail / out and redeploy
  const res = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
};

export const login = (creds, password) => async (dispatch) => {
  const res = await fetch("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creds,
      password,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setUser(data));
    return null;
  } else if (res.status < 500) {
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const res = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (data) => async (dispatch) => {
  const { formData, currUser } = data;

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData }),
  });

  const userData = await res.json();
  if (res.ok) {
    if (!currUser || currUser == "undefined") {
      dispatch(setUser(userData));
    }
    return null;
  } else if (res.status < 500) {
    if (userData.errors) {
      console.log(userData.errors);
      return userData.errors;
    }
  } else {
    return ["An error occurred. Please try again"];
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(removeUser());
  }
  if (data.errors) {
    return data.errors;
  }
};

export const editUser = (inputData) => async (dispatch) => {
  const { formData, employeeId, userId } = inputData;
  console.log(inputData);
  const res = await fetch(`/api/users/${employeeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    if (employeeId == userId) {
      console.log(data);
      dispatch(setUser(data));
      return null;
    }
  } else {
    console.log(data);
    return data;
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
