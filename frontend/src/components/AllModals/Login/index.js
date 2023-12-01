import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import OpenModalButton from "../../OpenModalButton";
import Signup from "../../AllModals/Signup";
import { useModal } from "../../../context/Modal";
import { login } from "../../../store/session";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [creds, setCreds] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(creds, password));
    if (data) {
      setErrors(data);
      console.log(data);
    } else {
      closeModal();
      history.push("/home");
    }
  };

  return (
    <div className="logInModal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username/Email
          <input
            className="loginInput"
            type="text"
            value={creds}
            onChange={(e) => setCreds(e.target.value)}
            required
          />
          {/* set errors to display here */}
        </label>
        <label>
          Password
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* set errors to display here */}
        </label>

        <button
          className="loginButton"
          type="submit"
          disabled={creds.length === 0 || password.length === 0}
        >
          Log In
        </button>
      </form>

      <OpenModalButton
        modalClasses={["logInRedirect"]}
        modalComponent={<Signup />}
        buttonText="... or Sign Up Here"
      />
    </div>
  );
}

export default Login;
