import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUp } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import Login from "../Login";

import "./Signup.css";

export default function Signup({ currUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [profilePic, setProfilePic] = useState("");
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
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipcode", String(zipcode));
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    if (role && role != "undefined") {
      formData.append("role", role);
    }

    let data = { formData };
    if (currUser && currUser != "undefined") {
      data["currUser"] = currUser;
    }

    const returnData = await dispatch(signUp(data));

    if (returnData) {
      console.log(returnData);
      if (returnData.errors) {
        setErrors(returnData.errors);
      } else {
        setErrors({});
        if (!isNaN(returnData)) {
          history.push(`/profile/${returnData}`);
        }
        closeModal();
      }
    } else {
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!firstName) {
      errors["firstName"] = "First name is required";
    }
    if (firstName.length < 2) {
      errors["firstName"] = "First name too short";
    }
    if (!lastName) {
      errors["lastName"] = "Last name is required";
    }
    if (lastName.length < 2) {
      errors["lastName"] = "Last name too short";
    }
    if (!birthday) {
      errors["birthday"] = "Birthday is required";
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
      errors["confirmPassword"] = "Must confirm password";
    }
    if (password !== confirmPassword) {
      errors["confirmPassword"] = "Passwords must match";
    }
    if (isNaN(Number(zipcode)) || zipcode.length !== 5) {
      errors["zipcode"] = "Invalid zipcode";
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
        <div className="signUpNameDiv">
          <label className="signUpLabel">
            First Name
            <input
              className="signUpInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={errors.firstName ? "* " + errors.firstName : " "}
            />
          </label>
          <label className="signUpLabel">
            Last Name
            <input
              className="signUpInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={errors.lastName ? "* " + errors.lastName : " "}
            />
          </label>
        </div>

        <label className="signUpLabel" id="address">
          Address
          <input
            className="signUpInput"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={errors.address ? "* " + errors.address : " "}
          />
        </label>

        <div className="cityNstateDiv">
          <label className="signUpLabel">
            City
            <input
              className="signUpInput"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={errors.city ? "* " + errors.city : " "}
            />
          </label>
          <label className="signUpLabel">
            State
            <input
              className="signUpInput"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={errors.state ? "* " + errors.state : " "}
            />
          </label>
        </div>

        <div className="zipNbirthdayDiv">
          <label className="signUpLabel">
            Zipcode
            <input
              className="signUpInput"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder={errors.zipcode ? "* " + errors.zipcode : " "}
            />
          </label>
          <div className="birthdayDiv">
            <label className="signUpLabel">
              Birthday
              <input
                className="signUpInput"
                id={errors.birthday ? "errors" : ""}
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="emailNusernameDiv">
          <label className="signUpLabel">
            Email
            <input
              className="signUpInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={errors.email ? "* " + errors.email : " "}
            />
          </label>
          <label className="signUpLabel">
            Username
            <input
              className="signUpInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={errors.username ? "* " + errors.username : " "}
            />
          </label>
        </div>

        <div className="passwordDiv">
          <label className="signUpLabel">
            Password
            <input
              className="signUpInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={errors.password ? "* " + errors.password : " "}
            />
          </label>
          <label className="signUpLabel">
            Confirm Password
            <input
              className="signUpInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={
                errors.confirmPassword ? "* " + errors.confirmPassword : " "
              }
            />
          </label>
        </div>

        {user && (
          <div className="phoneNroleDiv">
            <label className="signUpLabel">
              Phone Number
              <input
                className="signUpInput"
                type="tel"
                value={phone}
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setPhone(e.target.value)}
                placeholder={errors.phone ? "* " + errors.phone : " "}
              />
            </label>
            <div className="roleSelectDiv">
              <label className="signUpSelectLabel">
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
                {errors.role && <p className="signupErrors">* {errors.role}</p>}
              </label>
            </div>
          </div>
        )}
        <button className="signUpButton" type="submit">
          {user ? "Create Employee Account" : "Sign Up"}
        </button>
        {!user && (
          <OpenModalButton
            modalClasses={["signUpRedirect"]}
            modalComponent={<Login />}
            buttonText="Have an account? Log In Here"
          />
        )}
      </form>
    </div>
  );
}
