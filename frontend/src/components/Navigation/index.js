import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";
import cannaLogo from "../../assets/cannaleaf.png";
import takeawayIcon from "../../assets/take_away_icon.png";
import cartIcon from "../../assets/shopping_cart_logo.png";
import profileIcon from "../../assets/profile_icon.png";

export default function Navigation() {
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
      {/* Create Search form for Search Bar */}
      <input type="text" placeholder="Search..." />
      <div>
        <NavLink exct to="/takeout">
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
        <NavLink exact to="/profile">
          <img
            src={profileIcon}
            alt="takeoutLogo"
            style={{ width: "50px", height: "50px" }}
          />
        </NavLink>
      </div>
    </nav>
  );
}
