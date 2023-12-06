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
    } else {
      closeModal();
      history.push("/profile");
    }
  };

  return (
    <div className="logInModal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            className="loginInput"
            type="text"
            value={creds}
            onChange={(e) => setCreds(e.target.value)}
            required
          />
          {errors.creds && <p className="loginErrors">* {errors.creds}</p>}
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
          {errors.password && (
            <p className="loginErrors">* {errors.password}</p>
          )}
        </label>
        <label>
          Or choose a demo user...
          <select
            onChange={(e) => {
              setCreds(e.target.value);
              setPassword("password");
            }}
          >
            <option selected default hidden>
              Select one...
            </option>
            <option value="ownerDemo">ownerDemo</option>
            <option value="managerDemo1">managerDemo1</option>
            <option value="managerDemo2">managerDemo2</option>
            <option value="employeeDemo1">employeeDemo1</option>
            <option value="employeeDemo2">employeeDemo2</option>
            <option value="employeeDemo3">employeeDemo3</option>
            <option value="memberDemo1">memberDemo1</option>
            <option value="memberDemo2">memberDemo2</option>
            <option value="memberDemo3">memberDemo3</option>
            <option value="memberDemo4">memberDemo4</option>
            <option value="memberDemo5">memberDemo5</option>
          </select>
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
