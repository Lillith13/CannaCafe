import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import Signup from "../AllModals/Signup";
import EditAccount from "../AllModals/EditAcct";
import { userClockin, userClockout } from "../../store/timecard";
import UserOrders from "./userOrders";
import UserWishlist from "./userWishlist";
import UserFavorites from "./userFavorites";
import UserEmployees from "./userEmployees";

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, []);

  const handleClockIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(userClockin());
    // console.log(data);
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
    // console.log(data);
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
      <h1>User Profile - Coming soon...</h1>
      <div>
        <OpenModalButton
          buttonText="Edit Account"
          modalComponent={<EditAccount />}
        />
        {user && user.role.name === "Member" && <button>Delete Account</button>}
        {user &&
          (user.role.name === "Employee" ||
            user.role.name === "Manager" ||
            user.role.name === "Owner") && (
            <>
              <button onClick={(e) => handleClockIn(e)}>Clock In</button>
              <button onClick={(e) => handleClockOut(e)}>Clock Out</button>
              <NavLink exact to="/paystubs">
                {/* Might turn this into a bottom tab instead of a NavLink/button */}
                <button>View Paystubs</button>
              </NavLink>
            </>
          )}
        {user &&
          (user.role.name === "Manager" || user.role.name === "Owner") && (
            <>
              <button>Add to Products</button>
              <button>Add to Menu</button>
              <OpenModalButton
                buttonText="New Employee"
                modalComponent={<Signup />}
              />
            </>
          )}
        <div>
          <h3
            onClick={() => {
              setOrdersLoaded(true);
              setWishlistLoaded(false);
              setFavoritesLoaded(false);
              setEmployeesLoaded(false);
            }}
          >
            Your Orders
          </h3>
          <h3
            onClick={() => {
              setOrdersLoaded(false);
              setWishlistLoaded(true);
              setFavoritesLoaded(false);
              setEmployeesLoaded(false);
            }}
          >
            Your Wishlist
          </h3>
          <h3
            onClick={() => {
              setOrdersLoaded(false);
              setWishlistLoaded(false);
              setFavoritesLoaded(true);
              setEmployeesLoaded(false);
            }}
          >
            Your Favorites
          </h3>
          {user &&
            (user.role.name === "Manager" || user.role.name === "Owner") && (
              <h3
                onClick={() => {
                  setOrdersLoaded(false);
                  setWishlistLoaded(false);
                  setFavoritesLoaded(false);
                  setEmployeesLoaded(true);
                }}
              >
                Your Employees
              </h3>
            )}
        </div>
        <div>based on what's clicked above is what will display here...</div>
        <div>
          {ordersLoaded && (
            <div>
              <UserOrders />
            </div>
          )}
          {wishlistLoaded && (
            <div>
              <UserWishlist />
            </div>
          )}
          {favoritesLoaded && (
            <div>
              <UserFavorites />
            </div>
          )}
          {employeesLoaded && (
            <div>
              <UserEmployees />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
