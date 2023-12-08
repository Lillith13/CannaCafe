import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./SplashPage.css";
import splashLogo from "../../assets/cannaleaf.png";

export default function SplashPage() {
  const user = useSelector((state) => state.session.user);
  return (
    <div className="splashPageContainer" id="splashPage">
      {user ? (
        <h1 className="splashGreeting">Welcome back, {user.username}!</h1>
      ) : (
        <h1 className="splashGreeting">Welcome to CannaCafe!</h1>
      )}
      {/* <div> */}
      <NavLink
        exact
        to="/home"
        style={{ textDecoration: "none" }}
        className="splashLogoContainerDiv"
      >
        <div className="splashEnterContainer">
          <h2>Enter</h2>
        </div>
        <div>
          <img
            src={splashLogo}
            alt="SplashLogo"
            className="splashLogoContainer"
          />
        </div>
      </NavLink>
      {/* </div> */}
    </div>
  );
}
