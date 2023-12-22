import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { editUser } from "../../../store/session";
import { getAnEmployee } from "../../../store/employees";

import "./EditAcct.css";

export default function EditAccount({ empId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const params = useParams();
  const emp = useSelector((state) => state.employees);
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const presetFields = (userInfo) => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    // if (userInfo.full_address.address.includes("#")) {
    //   const add1 = userInfo.full_address.address.split("#")[0];
    //   const add2 = userInfo.full_address.address.split("#")[1];
    //   setAddress1(add1);
    //   setAddress2(add2);
    // } else {
    setAddress(userInfo.full_address.address);
    // }
    setCity(userInfo.full_address.city);
    setState(userInfo.full_address.state);
    setZipcode(userInfo.full_address.zip);
    // setEmail(userInfo.email);
    setPhone(userInfo.phone);
    if (userInfo.role.name) {
      setRole(userInfo.role.name);
    }
  };

  useEffect(async () => {
    if (empId && empId != "undefined") {
      const data = dispatch(getAnEmployee(empId)).then(() => {
        presetFields(emp);
        setIsLoaded(true);
      });
      if (data) {
        console.log(data);
        setErrors(data);
      }
    } else {
      presetFields(user);
      setIsLoaded(true);
    }
  }, [dispatch]);

  console.log(oldPassword);
  console.log(newPassword);
  const submitValidSignup = async () => {
    const formData = new FormData();
    formData.append("profile_pic", profilePic);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zipcode", String(zipcode));
    formData.append("phone", phone);
    formData.append("oldpassword", oldPassword);
    formData.append("newpassword", newPassword);
    console.log(formData);

    if (phone) {
      formData.append("phone", phone);
    }
    if (role && role != "undefined") {
      formData.append("role", role);
    }

    const inputData = {
      formData,
    };

    console.log(formData);

    if (empId && empId != "undefined") {
      console.log(emp);
      inputData["employeeId"] = empId;
      inputData["userId"] = user.id;
    } else {
      inputData["employeeId"] = user.id;
      inputData["userId"] = user.id;
    }

    console.log(inputData);

    const data = await dispatch(editUser(inputData));
    if (data) {
      console.log(data);
      setErrors(data.errors);
    } else {
      if (empId) {
        dispatch(getAnEmployee(empId));
      }
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (newPassword) {
      if (!oldPassword) {
        errors["oldPassword"] = "Required";
      }
      if (newPassword.length < 8) {
        errors["newPassword"] = "Must be 8 or more characters";
      }
      if (newPassword != confirmNewPassword) {
        errors["confirmPassword"] = "Required";
      }
    }
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
    if (empId) {
      if (!phone) {
        errors["phone"] = "Phone number is required";
      }
      if (!role) {
        errors["role"] = "Role is required";
      }
    }
    setErrors(errors);
    if (Object.values(errors).length === 0) {
      submitValidSignup();
    }
  };

  return isLoaded ? (
    <div className="editAcctModal">
      <h1>Edit Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="editAcctNameDiv">
          <label className="editAcctLabel">
            First Name
            <input
              className="editAcctInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={errors.firstName ? "* " + errors.firstName : " "}
            />
          </label>
          <label className="editAcctLabel">
            Last Name
            <input
              className="editAcctInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={errors.lastName ? "* " + errors.lastName : " "}
            />
          </label>
        </div>

        <div className="addressNcityDiv">
          <label className="editAcctLabel">
            Address
            <input
              className="editAcctInput"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={errors.address ? "* " + errors.address : " "}
            />
          </label>
          <label className="editAcctLabel">
            City
            <input
              className="editAcctInput"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={errors.city ? "* " + errors.city : " "}
            />
          </label>
        </div>

        <div className="stateNzipDiv">
          <label className="editAcctLabel">
            State
            <input
              className="editAcctInput"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={errors.state ? "* " + errors.state : " "}
            />
          </label>
          <label className="editAcctLabel">
            Zipcode
            <input
              className="editAcctInput"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder={errors.zipcode ? "* " + errors.zipcode : " "}
            />
          </label>
        </div>

        {empId &&
        (user.role.name === "Manager" || user.role.name === "Owner") &&
        user.id != emp.id ? (
          <div className="phoneNroleDiv">
            <label className="editAcctLabel">
              Phone Number
              <input
                className="editAcctInput"
                type="tel"
                value={phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setPhone(e.target.value)}
                placeholder={errors.phone ? "* " + errors.phone : " "}
              />
            </label>
            {empId &&
              (user.role.name === "Manager" || user.role.name === "Owner") &&
              user.id != emp.id && (
                <div className="roleSelectDiv">
                  <label className="editAcctLabel">
                    Employee Role
                    <select
                      className="editAcctRoleSelect"
                      id={errors.role && "roleError"}
                      value={role}
                      defaultValue={role ? role : null}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option selected default hidden>
                        Select Role...
                      </option>
                      <option value="Member">Member</option>
                      <option value="Employee">Employee</option>
                      {user.role.name === "Owner" && (
                        <>
                          <option value="Manager">Manager</option>
                          <option value="Owner">Owner</option>
                        </>
                      )}
                    </select>
                  </label>
                </div>
              )}
          </div>
        ) : (
          <div className="phoneNconfirmPassDiv">
            <label className="editAcctLabel">
              Phone Number
              <input
                className="editAcctInput"
                type="tel"
                value={phone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setPhone(e.target.value)}
                placeholder={errors.phone ? "* " + errors.phone : " "}
              />
            </label>
            <label className="editAcctLabel">
              Current Password
              <input
                className="editAcctInput"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={errors.oldPassword && "* " + errors.oldPassword}
              />
            </label>
          </div>
        )}
        {empId &&
          (user.role.name === "Manager" || user.role.name === "Owner") &&
          user.id != emp.id && (
            <label className="editAcctLabel">
              Current Password
              <input
                className="editAcctInput"
                id="password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={errors.oldPassword && "* " + errors.oldPassword}
              />
            </label>
          )}

        <div className="newNconfirmPassDiv">
          <label className="editAcctLabel">
            New Password
            <input
              className="editAcctInput"
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={errors.newPassword && "* " + errors.newPassword}
            />
          </label>
          <label className="editAcctLabel">
            Confirm New Password
            <input
              className="editAcctInput"
              id="password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder={
                errors.confirmPassword && "* " + errors.confirmPassword
              }
            />
          </label>
        </div>

        <label>
          Profile Picture
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          {user.profile_image && (
            <label>
              Your current profile picture: <img src={user.profile_image} />
            </label>
          )}
        </label>

        <button
          className="editAccountButton"
          type="submit"
          // disabled={newPassword && !oldPassword && !confirmNewPassword}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
