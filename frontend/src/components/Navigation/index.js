import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./css/Navigation.css";
import "./css/screenSizing.css";
import "./css/themes.css";

import ProfileButton from "./ProfileButton";

import cannaLogo from "../../assets/cannaleaf.png";
import takeawayIcon from "../../assets/take_away_icon.png";
import cartIcon from "../../assets/shopping_cart_logo.png";

export default function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  return (
    <nav className={theme} id="navContainer">
      <div className="logoIconContainer">
        <NavLink exact to="/home" className="logoNavLink">
          <img className="logoIcon" src={cannaLogo} alt="CannaLogo" />
          <h1 className="siteName" id={theme}>
            CannaCafe
          </h1>
        </NavLink>
      </div>
      <div className="navlinkContainer">
        <NavLink exact to="/takeout">
          <img className="navlinkIcon" src={takeawayIcon} alt="takeoutLogo" />
        </NavLink>
        <NavLink exact to="/cart">
          <img className="navlinkIcon" src={cartIcon} alt="takeoutLogo" />
        </NavLink>
        {isLoaded && <ProfileButton user={user} />}
      </div>
    </nav>
  );
}
