import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import Login from "../AllModals/Login";
import Signup from "../AllModals/Signup";

import "./Navigation.css";
import profileIcon from "../../assets/profile_icon.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  return (
    <>
      <div
        onClick={openMenu}
        style={{ fontSize: 35, cursor: "pointer" }}
        className="nav-btn"
      >
        <img
          src={profileIcon}
          alt="takeoutLogo"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <ul className={`${ulClassName} profile-dropdown`} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink to={`/profile/${user.id}`}>
                <button className="dropdown-btn">View Profile</button>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-btn">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
