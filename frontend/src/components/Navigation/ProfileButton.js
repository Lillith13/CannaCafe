import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import OpenModalButton from "../OpenModalButton";
import Login from "../AllModals/Login";
import Signup from "../AllModals/Signup";
import { logout } from "../../store/session";
import { userClockin, userClockout } from "../../store/timecard";

import "./Navigation.css";
import "./themes.css";

import profileIcon from "../../assets/profile_icon.png";
import CreateProduct from "../AllModals/CreateProduct";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("GL");
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    const clientTheme = localStorage.getItem("clientTheme");

    if (clientTheme) {
      setTheme(clientTheme);
    } else {
      localStorage.setItem("clientTheme", "GL");
    }
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const handleClockIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(userClockin());
    if (data) {
      const msg = "Cannot clock in with an already open timecard";
      alert(msg);
    }
    if (!data) {
      const msg = "You've sucessfully clocked in!";
      alert(msg);
    }
  };
  const handleClockOut = async (e) => {
    e.preventDefault();
    const data = await dispatch(userClockout());
    if (data) {
      const msg = "You haven't clocked in yet";
      alert(msg);
    }
    if (!data) {
      const msg = "You've sucessfully clocked out!";
      alert(msg);
    }
  };

  return (
    <>
      <div onClick={openMenu} className="nav-btn">
        <img
          className={
            user && user.profile_pic ? "userProfilePic" : "profileLogo"
          }
          src={user && user.profile_pic ? user.profile_pic : profileIcon}
          alt="profileLogo"
        />
      </div>
      <ul
        className={`${ulClassName} profile-dropdown ${theme}`}
        ref={ulRef}
        id={
          user
            ? user.role.name === "Member"
              ? "memberMenuDropDown"
              : "staffMenuDropDown"
            : "noCurrUserDropDown"
        }
      >
        {user ? (
          <div
            className={user.role.name === "Member" ? "currUser" : "staffUser"}
          >
            <div
              className={
                user.role.name === "Member"
                  ? "currUserDetails"
                  : "currStaffDetails"
              }
            >
              <li>Welcome back, {user.username}</li>

              <div id="themeSelectDiv">
                <select
                  onChange={(e) => {
                    localStorage.setItem("clientTheme", e.target.value);
                    history.go(0);
                  }}
                >
                  <option disabled>Theme...</option>
                  <option value="GL" selected={theme == "GL"}>
                    green light
                  </option>
                  <option value="GD" selected={theme == "GD"}>
                    green dark
                  </option>
                  <option value="PL" selected={theme == "PL"}>
                    purple light
                  </option>
                  <option value="PD" selected={theme == "PD"}>
                    purple dark
                  </option>
                  <option value="BL" selected={theme == "BL"}>
                    blue light
                  </option>
                  <option value="BD" selected={theme == "BD"}>
                    blue dark
                  </option>
                </select>
              </div>

              <li>{user.email}</li>
            </div>

            <div
              className={
                user.role.name === "Member"
                  ? "currUserButtons"
                  : "currStaffButtons"
              }
              id={
                user && user.role.name === "Member" ? "memberMenu" : "staffMenu"
              }
            >
              <li>
                <NavLink to="/profile">
                  <button className="dropdown-btn">View Profile</button>
                </NavLink>
              </li>
              {(user.role.name === "Employee" ||
                user.role.name === "Manager" ||
                user.role.name === "Owner") && (
                <div id="clockButtons">
                  <li>
                    <button onClick={(e) => handleClockIn(e)}>Clock In</button>
                  </li>
                  <li>
                    <button onClick={(e) => handleClockOut(e)}>
                      Clock Out
                    </button>
                  </li>
                  <li>
                    <NavLink exact to={`/paystubs/${user.id}`}>
                      <button>View Paystubs</button>
                    </NavLink>
                  </li>
                </div>
              )}
              {(user.role.name === "Manager" || user.role.name === "Owner") && (
                <div id="managementOnlyButtons">
                  <li>
                    <OpenModalButton
                      buttonText="Add to Products"
                      modalComponent={<CreateProduct type="product" />}
                    />
                  </li>
                  <li>
                    <OpenModalButton
                      buttonText="Add to Menu"
                      modalComponent={<CreateProduct type="menu" />}
                    />
                  </li>
                  <li>
                    <OpenModalButton
                      buttonText="New Employee"
                      onItemClick={closeMenu}
                      modalComponent={<Signup />}
                    />
                  </li>
                </div>
              )}
              <li>
                <button onClick={handleLogout} className="dropdown-btn">
                  Log Out
                </button>
              </li>
            </div>
          </div>
        ) : (
          <div id="noCurrUser">
            <select>
              <option>Theme...</option>
            </select>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<Login />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<Signup />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
