import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { editUser } from "../../../store/session";
import { getTargetUser } from "../../../store/targetUser";

export default function EditAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const params = useParams();
  const targetUser = useSelector((state) => state.targetUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
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
    if (userInfo.full_address.address.includes("#")) {
      const add1 = userInfo.full_address.address.split("#")[0];
      const add2 = userInfo.full_address.address.split("#")[1];
      setAddress1(add1);
      setAddress2(add2);
    } else {
      setAddress1(userInfo.full_address.address);
    }
    setCity(userInfo.full_address.city);
    setState(userInfo.full_address.state);
    setZipcode(userInfo.full_address.zip);
    setEmail(userInfo.email);
    console.log(userInfo.phone);
    setPhone(userInfo.phone);
  };

  useEffect(async () => {
    if (params.length > 0) {
      const targetUserId = params.id;
      console.log(targetUserId);
      const data = dispatch(getTargetUser(targetUserId)).then(() => {
        presetFields(targetUser);
        setIsLoaded(true);
      });
      if (data) {
        setErrors(data);
      }
    } else {
      presetFields(user);
      setIsLoaded(true);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newPassword === confirmNewPassword &&
      !isNaN(Number(zipcode)) &&
      zipcode.length === 5
    ) {
      const address = address1 + address2;
      const formData = {
        firstName,
        lastName,
        address,
        city,
        state,
        zipcode,
        email,
        phone,
        oldPassword,
        newPassword,
      };
      if (phone) {
        formData["phone"] = phone;
      }
      if (role && role != "undefined") {
        formData["role"] = role;
      }
      const inputData = {
        formData,
      };
      if (targetUser) {
        inputData["targetserId"] = targetUser.id;
        inputData["userId"] = user.id;
      } else {
        inputData["targetserId"] = user.id;
        inputData["userId"] = user.id;
      }
      const data = await dispatch(editUser(inputData));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      // ! change this array to an object
      setErrors([
        "Confirm New Password field must be the same as the New Password field",
      ]);
    }
  };

  return isLoaded ? (
    <div className="editAcctModal">
      <h1>Edit Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            className="editAcctInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <p className="errors">* {errors.firstName}</p>}
        </label>
        <label>
          Last Name
          <input
            className="editAcctInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p className="errors">* {errors.lastName}</p>}
        </label>
        <label>
          Address
          <input
            className="editAcctInput"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
          {errors.address && <p className="errors">* {errors.address}</p>}
        </label>
        <label>
          Address
          <input
            className="editAcctInput"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            className="editAcctInput"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && <p className="errors">* {errors.city}</p>}
        </label>
        <label>
          State
          <input
            className="editAcctInput"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && <p className="errors">* {errors.state}</p>}
        </label>
        <label>
          Zipcode
          <input
            className="editAcctInput"
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          {errors.zipcode && <p className="errors">* {errors.zipcode}</p>}
        </label>
        <label>
          Email
          <input
            className="editAcctInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="errors">* {errors.email}</p>}
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            value={phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Current Password
          <input
            className="editAcctInput"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required={newPassword}
          />
        </label>
        <label>
          New Password
          <input
            className="editAcctInput"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!oldPassword}
          />
        </label>
        <label>
          Confirm New Password
          <input
            className="editAcctInput"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            disabled={!newPassword}
            required={newPassword}
          />
        </label>
        {user &&
          targetUser.id &&
          (user.role.name === "Manager" || user.role.name === "Owner") &&
          user.id != targetUser.id && (
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
            </label>
          )}
        <button
          className="editAccountButton"
          type="submit"
          disabled={newPassword && !oldPassword && !confirmNewPassword}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}
