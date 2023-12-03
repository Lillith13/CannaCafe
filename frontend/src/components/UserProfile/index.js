import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function UserProfile() {
  const user = useSelector((state) => state.session.user);
  return (
    <>
      <h1>User Profile - Coming soon...</h1>
      <div>
        <button>Edit Account</button>
        {user.role.name === "Member" && <button>Delete Account</button>}
        {(user.role.name === "Employee" ||
          user.role.name === "Manager" ||
          user.role.name === "Owner") && (
          <>
            <button>Clock In</button>
            <button>Clock Out</button>
            <NavLink exact to="/paystubs">
              <button>View Paystubs</button>
            </NavLink>
          </>
        )}
        {(user.role.name === "Manager" || user.role.name === "Owner") && (
          <>
            <button>Add to Products</button>
            <button>Add to Menu</button>
            <button>New Employee</button>
          </>
        )}
        <div>
          <h3>Your orders - will be clickable</h3>
          <h3>Your wishlist - will be clickable</h3>
          <h3>Your favorites - will be clickable</h3>
          {(user.role.name === "Manager" || user.role.name === "Owner") && (
            <h3>Your Employees - will be clickable</h3>
          )}
        </div>
        <div>based on what's clicked above is what will display here...</div>
      </div>
    </>
  );
}
