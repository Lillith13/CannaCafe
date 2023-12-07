import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import cannaLogo from "../../assets/cannaleaf.png";
import takeawayIcon from "../../assets/take_away_icon.png";
import cartIcon from "../../assets/shopping_cart_logo.png";

export default function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  return (
    <nav style={{ display: "flex", gap: "100px" }}>
      <div>
        <NavLink exact to="/home">
          <img
            src={cannaLogo}
            alt="CannaLogo"
            style={{ width: "50px", height: "50px" }}
          />
          CannaCafe
        </NavLink>
      </div>
      {/* Implement Search Bar later */}
      {/* <input type="text" placeholder="Search..." onChange={}/> */}
      <div>
        <NavLink exact to="/takeout">
          <img
            src={takeawayIcon}
            alt="takeoutLogo"
            style={{ width: "50px", height: "50px" }}
          />
        </NavLink>
        <NavLink exact to="/cart">
          <img
            src={cartIcon}
            alt="takeoutLogo"
            style={{ width: "50px", height: "50px" }}
          />
        </NavLink>
        {isLoaded && <ProfileButton user={user} />}
      </div>
    </nav>
  );
}
