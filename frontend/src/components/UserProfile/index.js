import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import "./UserProfile.css";

import OpenModalButton from "../OpenModalButton";
import Signup from "../AllModals/Signup";
import EditAccount from "../AllModals/EditAcct";
import ConfirmDeleteAcct from "../AllModals/ConfirmDelete/confirmDeleteAcct";

import { userClockin, userClockout } from "../../store/timecard";

import UserOrders from "./userOrders";
import UserComplaints from "./userComplaints";
import UserReviews from "./userReviews";
import UserWishlist from "./userWishlist";
import UserFavorites from "./userFavorites";
import UserEmployees from "./userEmployees";
import CreateProduct from "../AllModals/CreateProduct";

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [complaintsLoaded, setComplaintsLoaded] = useState(false);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!user || user == "undefined") {
      history.push("/");
    }
    if (
      user.role.name == "Owner" ||
      user.role.name == "Manager" ||
      user.role.name == "Employee"
    ) {
      setEmployeesLoaded(true);
    } else {
      setFavoritesLoaded(true);
    }
  }, []);

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
    <div className="userProfileContainer">
      <h1>
        Hello, {user.firstName} {user.lastName}
      </h1>
      <div>
        <div className="profileButtonsContainer">
          <div className="universalProfileButtonsDiv">
            <OpenModalButton
              buttonText="Edit Account"
              modalComponent={<EditAccount />}
            />
            {user && user.role.name === "Member" && (
              <OpenModalButton
                buttonText="Delete Account"
                modalComponent={<ConfirmDeleteAcct userId={user.id} />}
              />
            )}
          </div>
          <div className="barrierProtectedProfileButtonsDiv">
            <div className="employeeAccessibleProfileButtonsDiv">
              {(user.role.name === "Employee" ||
                user.role.name === "Manager" ||
                user.role.name === "Owner") && (
                <>
                  <button onClick={(e) => handleClockIn(e)}>Clock In</button>
                  <button onClick={(e) => handleClockOut(e)}>Clock Out</button>
                  <NavLink exact to={`/paystubs/${user.id}`}>
                    <button>View Paystubs</button>
                  </NavLink>
                </>
              )}
            </div>
            <div className="managementOnlyButtosDiv">
              {(user.role.name === "Manager" || user.role.name === "Owner") && (
                <>
                  <OpenModalButton
                    buttonText="Add to Products"
                    modalComponent={<CreateProduct type="product" />}
                  />
                  <OpenModalButton
                    buttonText="Add to Menu"
                    modalComponent={<CreateProduct type="menu" />}
                  />
                  <OpenModalButton
                    buttonText="New Employee"
                    modalComponent={<Signup currUser={user.id} />}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="profileTabsContainer">
          <h3
            onClick={() => {
              setOrdersLoaded(true);
              setWishlistLoaded(false);
              setFavoritesLoaded(false);
              setEmployeesLoaded(false);
              setReviewsLoaded(false);
              setComplaintsLoaded(false);
            }}
          >
            Your Orders
          </h3>
          {user.role.name == "Member" && (
            <h3
              onClick={() => {
                setOrdersLoaded(false);
                setWishlistLoaded(false);
                setFavoritesLoaded(false);
                setEmployeesLoaded(false);
                setReviewsLoaded(true);
                setComplaintsLoaded(false);
              }}
            >
              Your Reviews
            </h3>
          )}
          {(user.role.name == "Manager" || user.role.name == "Owner") && (
            <h3
              onClick={() => {
                setOrdersLoaded(false);
                setWishlistLoaded(false);
                setFavoritesLoaded(false);
                setEmployeesLoaded(false);
                setReviewsLoaded(true);
                setComplaintsLoaded(false);
              }}
            >
              View Member Reviews
            </h3>
          )}
          {user.role.name == "Member" && (
            <h3
              onClick={() => {
                setOrdersLoaded(false);
                setWishlistLoaded(false);
                setFavoritesLoaded(false);
                setEmployeesLoaded(false);
                setReviewsLoaded(false);
                setComplaintsLoaded(true);
              }}
            >
              Your Complaints
            </h3>
          )}
          {(user.role.name == "Manager" || user.role.name == "Owner") && (
            <h3
              onClick={() => {
                setOrdersLoaded(false);
                setWishlistLoaded(false);
                setFavoritesLoaded(false);
                setEmployeesLoaded(false);
                setReviewsLoaded(false);
                setComplaintsLoaded(true);
              }}
            >
              View Member Complaints
            </h3>
          )}
          <h3
            onClick={() => {
              setOrdersLoaded(false);
              setWishlistLoaded(true);
              setFavoritesLoaded(false);
              setEmployeesLoaded(false);
              setReviewsLoaded(false);
              setComplaintsLoaded(false);
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
              setReviewsLoaded(false);
              setComplaintsLoaded(false);
            }}
          >
            Your Favorites
          </h3>
          {user && user.role.name !== "Member" && (
            <h3
              onClick={() => {
                setOrdersLoaded(false);
                setWishlistLoaded(false);
                setFavoritesLoaded(false);
                setEmployeesLoaded(true);
                setReviewsLoaded(false);
                setComplaintsLoaded(false);
              }}
            >
              Staff List
            </h3>
          )}
        </div>
        <div className="profileTabsDisplaysContainer">
          {ordersLoaded && (
            <div>
              <UserOrders />
            </div>
          )}
          {reviewsLoaded && (
            <div>
              <UserReviews />
            </div>
          )}
          {complaintsLoaded && (
            <div>
              <UserComplaints />
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
    </div>
  );
}
