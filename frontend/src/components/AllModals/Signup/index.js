import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import Login from "../Login";
import "./Signup.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      if (
        password === confirmPassword &&
        !isNaN(Number(zipcode)) &&
        zipcode.length === 5
      ) {
        const address = address1 + address2;
        const formData = {
          firstName,
          lastName,
          birthday,
          address,
          city,
          state,
          zipcode,
          username,
          email,
          password,
        };
        const data = await dispatch(signUp(formData));
        if (data) {
          setErrors(data);
        } else {
          closeModal();
        }
      } else {
        setErrors([
          "Confirm Password field must be the same as the Password field",
        ]);
      }
    } else {
      // ! add in else for when New Employee routes here
    }
  };

  return (
    <div className="signUpModal">
      <h1 className="signUpTitle">{user ? "New Employee" : "Signup"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            className="signUpInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && (
            <p className="signUpErrors">* {errors.firstName}</p>
          )}
        </label>
        <label>
          Last Name
          <input
            className="signUpInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && (
            <p className="signUpErrors">* {errors.lastName}</p>
          )}
        </label>
        <label>
          Birthday
          <input
            className="signUpInput"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          {errors.birthday && (
            <p className="signUpErrors">* {errors.birthday}</p>
          )}
        </label>
        <label>
          Address
          <input
            className="signUpInput"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
          {errors.address && <p className="signUpErrors">* {errors.address}</p>}
        </label>
        <label>
          Address
          <input
            className="signUpInput"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            className="signUpInput"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && <p className="signUpErrors">* {errors.city}</p>}
        </label>
        <label>
          State
          <input
            className="signUpInput"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && <p className="signUpErrors">* {errors.state}</p>}
        </label>
        <label>
          Zipcode
          <input
            className="signUpInput"
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          {errors.zipcode && <p className="signUpErrors">* {errors.zipcode}</p>}
        </label>
        <label>
          Email
          <input
            className="signUpInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="signUpErrors">* {errors.email}</p>}
        </label>
        <label>
          Username
          <input
            className="signUpInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p className="signUpErrors">* {errors.username}</p>
          )}
        </label>
        <label>
          Password
          <input
            className="signUpInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            className="signUpInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="signUpButton"
          type="submit"
          disabled={password.length < 6 || password != confirmPassword}
        >
          Sign Up
        </button>
      </form>

      <span>
        Have an account?{" "}
        <OpenModalButton
          modalClasses={["signUpRedirect"]}
          modalComponent={<Login />}
          buttonText="Log In Here"
        />
      </span>
    </div>
  );
}

export default SignupFormModal;
