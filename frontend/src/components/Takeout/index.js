import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Takeout.css";

import OpenModalButton from "../OpenModalButton";
import CheckoutBag from "../AllModals/CheckoutBag";

export default function Takeout() {
  const user = useSelector((state) => state.session.user);
  const [bag, setBag] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let localBag = null;
    if (user) {
      localBag = localStorage.getItem(`${user.id}Takeaway`);
    } else {
      localBag = localStorage.getItem("guestTakeaway");
    }
    const parsedBag = JSON.parse(localBag);
    if (parsedBag) {
      setBag([...Object.values(parsedBag)]);
    }
    setIsLoaded(true);
  }, []);

  const changeQuant = (e, type, itemId) => {
    e.preventDefault();
    let storedTakeout = null;
    if (user) {
      storedTakeout = localStorage.getItem(`${user.id}Takeaway`);
    } else {
      storedTakeout = localStorage.getItem("guestTakeaway");
    }
    const currBag = JSON.parse(storedTakeout);
    let updatedBag = {};
    if (type === "inc") {
      currBag[itemId].quantity++;
      updatedBag = { ...currBag };
    }
    if (type === "dec") {
      currBag[itemId].quantity--;
      if (!currBag[itemId].quantity) {
        delete currBag[itemId];
        updatedBag = { ...currBag };
      } else {
        updatedBag = { ...currBag };
      }
    }
    if (type === "remove") {
      delete currBag[itemId];
      updatedBag = { ...currBag };
    }
    if (user) {
      localStorage.setItem(`${user.id}Takeaway`, JSON.stringify(updatedBag));
    } else {
      localStorage.setItem("guestTakeaway", JSON.stringify(updatedBag));
    }
    setBag([...Object.values(updatedBag)]);
  };

  return isLoaded ? (
    <div className="takeoutContainer">
      {bag.length > 0 ? (
        <div className="takeoutContainerDiv">
          {bag.map((item) => (
            <div key={item.id} className="takeoutItemContainer">
              <div className="itemImageContainer">
                <img src={item.previewImg} />
                {console.log(item)}
              </div>
              <div className="takeoutItemInfoContainer">
                <NavLink exact to={`/menu/${item.id}`}>
                  <h2>{item.name}</h2>
                </NavLink>
                <h4>
                  {item.quantity} x ${item.price}
                </h4>
                <h4>Item Total: ${(item.quantity * item.price).toFixed(2)}</h4>
              </div>
              <div className="takeoutButtonsContainer">
                <div className="quantChangeContainer">
                  <label>Change Quantity:</label>
                  <div className="quantChangeButtonsContainer">
                    <button
                      className="incButton"
                      onClick={(e) => changeQuant(e, "inc", item.id)}
                    >
                      {" "}
                      +{" "}
                    </button>
                    <button
                      className="decButton"
                      id={item.quantity <= 1 && "removeButton"}
                      onClick={(e) => changeQuant(e, "dec", item.id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                  </div>
                </div>
                <div className="removeButtonContainer">
                  <button
                    className="removeButton"
                    onClick={(e) => changeQuant(e, "remove", item.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="checkoutNcontinueShoppingButtonsContainer">
            <NavLink exact to="/menu">
              <button>Add More to Bag</button>
            </NavLink>
            <OpenModalButton
              buttonText="Checkout"
              modalComponent={<CheckoutBag userId={user ? user.id : null} />}
            />
          </div>
        </div>
      ) : (
        <div className="emptyBagContainer">
          <h1>No items in your bag...</h1>
          <NavLink exact to="/menu">
            <button className="emptyBagButton">Find items to Add</button>
          </NavLink>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
