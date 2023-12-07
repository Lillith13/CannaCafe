import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import Login from "../Login";
import "./Signup.css";

export default function Signup({ currUser }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  // const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const submitValidSignup = async () => {
    // const address = address1 + "#" + address2;
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
    if (phone) {
      formData["phone"] = phone;
    }
    if (role && role != "undefined") {
      formData["role"] = role;
    }

    let data = { formData };
    if (currUser && currUser != "undefined") {
      data["currUser"] = currUser;
    }

    console.log(data);

    const returnData = await dispatch(signUp(data));

    if (returnData) {
      console.log(returnData);
      if (returnData) {
        setErrors(returnData.errors);
      } else {
        setErrors(returnData);
      }
    } else {
      setErrors({});
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!firstName) {
      errors["firstName"] = "First name is required";
    }
    if (firstName.length < 2) {
      errors["firstName"] = "First name must be more than 2 characters";
    }
    if (!lastName) {
      errors["lastName"] = "Last name is required";
    }
    if (lastName.length < 2) {
      errors["lastName"] = "Last name must be more than 2 characters";
    }
    if (!birthday) {
      errors["birthday"] = "Birthday is required - Accounts are age restricted";
    }
    if (!address) {
      errors["address"] = "Address is required";
    }
    if (!city) {
      errors["city"] = "City is required";
    }
    if (!state) {
      errors["state"] = "State is required";
    }
    if (!zipcode) {
      errors["zipcode"] = "Zipcode is required";
    }
    if (!username) {
      errors["username"] = "Username is required";
    }
    if (!email) {
      errors["email"] = "Email is required";
    }
    if (currUser) {
      if (!phone) {
        errors["phone"] = "Phone number is required";
      }
      if (!role) {
        errors["role"] = "Role is required";
      }
    }
    if (!password) {
      errors["password"] = "Password is required";
    }
    if (!confirmPassword) {
      errors["confirmPassword"] = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      errors["confirmPassword"] = "Password and Confirm Password must match";
    }
    if (isNaN(Number(zipcode)) || zipcode.length !== 5) {
      errors["zipcode"] = "Zipcode must be all numbers and 5 digits long";
    }
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      submitValidSignup();
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
          />
          {errors.firstName && <p className="errors">* {errors.firstName}</p>}
        </label>
        <label>
          Last Name
          <input
            className="signUpInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="errors">* {errors.lastName}</p>}
        </label>
        <label>
          Birthday
          <input
            className="signUpInput"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          {errors.birthday && <p className="errors">* {errors.birthday}</p>}
        </label>
        <label>
          Address
          <input
            className="signUpInput"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <p className="errors">* {errors.address}</p>}
        </label>
        {/* <label>
          Address
          <input
            className="signUpInput"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label> */}
        <label>
          City
          <input
            className="signUpInput"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="errors">* {errors.city}</p>}
        </label>
        <label>
          State
          <input
            className="signUpInput"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p className="errors">* {errors.state}</p>}
        </label>
        <label>
          Zipcode
          <input
            className="signUpInput"
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          {errors.zipcode && <p className="errors">* {errors.zipcode}</p>}
        </label>
        <label>
          Email
          <input
            className="signUpInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="errors">* {errors.email}</p>}
        </label>
        {user && (
          <label>
            Phone Number
            <input
              type="tel"
              value={phone}
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="errors">* {errors.phone}</p>}
          </label>
        )}
        <label>
          Username
          <input
            className="signUpInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="errors">* {errors.username}</p>}
        </label>
        <label>
          Password
          <input
            className="signUpInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="errors">* {errors.password}</p>}
        </label>
        <label>
          Confirm Password
          <input
            className="signUpInput"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="errors">* {errors.confirmPassword}</p>
          )}
        </label>
        {user && (
          <label>
            Employee Role
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option selected default hidden>
                Select Role...
              </option>
              <option value="Employee">Employee</option>
              {user.role.name === "Owner" && (
                <>
                  <option value="Manager">Manager</option>
                  <option value="Owner">Owner</option>
                </>
              )}
            </select>
            {errors.role && <p className="errors">* {errors.role}</p>}
          </label>
        )}
        <button className="signUpButton" type="submit">
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
