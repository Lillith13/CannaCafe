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
  // ! If login & current_user persistance breaks in live take the tail / out and redeploy
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

export const signUp = (formData) => async (dispatch) => {
  console.log(formData);

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData }),
  });

  console.log(res);

  const data = await res.json();
  if (res.ok) {
    console.log(data);
    dispatch(setUser(data));
    return null;
  } else if (res.status < 500) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again"];
  }
};

export const deleteUser = () => async (dispatch) => {
  const res = await fetch("/api/users/", {
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

export const editUser = (formData, userId) => async (dispatch) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zipcode,
    username,
    email,
    oldPassword,
    newPassword,
  } = formData;
  const res = await fetch(`/api/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      username,
      email,
      oldPassword,
      newPassword,
    }),
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(setUser(data));
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
