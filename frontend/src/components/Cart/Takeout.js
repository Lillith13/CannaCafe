import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./css/univ.css";
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

import upArrow from "../../assets/arrow-up.png";
import downArrow from "../../assets/arrow-down.png";

import OpenModalButton from "../OpenModalButton";
import CheckoutBag from "../AllModals/CheckoutBag";

export default function Takeout() {
  const user = useSelector((state) => state.session.user);
  const [bag, setBag] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

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
    <div>
      <div className="pageContainer" id="takeout">
        {bag.length > 0 ? (
          <div className="takeoutContainerDiv">
            {bag.map((item) => (
              <div key={item.id} className="takeoutItemContainer" id={theme}>
                <div className="itemImageContainer" id={theme}>
                  <img src={item.previewImg} />
                </div>

                <div id="takeoutItemDetails">
                  {" "}
                  <div className="takeoutItemInfoContainer" id={theme}>
                    <NavLink exact to={`/menu/${item.id}`}>
                      <h2>{item.name}</h2>
                    </NavLink>
                    <div id="takeoutItemPrice">
                      <h4>
                        {item.quantity} x ${item.price}
                      </h4>
                      <h4>
                        Item Total: ${(item.quantity * item.price).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                  <div className="takeoutButtonsContainer" id={theme}>
                    <div className="quantChangeContainer" id={theme}>
                      <label>Change Quantity:</label>
                      <div className="quantChangeButtonsContainer" id={theme}>
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
                    <div className="removeButtonContainer" id={theme}>
                      <button
                        className="removeButton"
                        onClick={(e) => changeQuant(e, "remove", item.id)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="emptyBagContainer" id={theme}>
            <h1>No items in your bag...</h1>
            <NavLink exact to="/menu">
              <button className="emptyBagButton" id={theme}>
                Find items to Add
              </button>
            </NavLink>
          </div>
        )}
        <div
          className="optsToggleContainer takeout"
          id={showCheckout && "showing"}
        >
          <div
            className="optsToggleImgDiv takeout"
            onClick={() => setShowCheckout(!showCheckout)}
          >
            <img
              src={!showCheckout ? upArrow : downArrow}
              className="optsToggleImage takeout"
              id={theme}
            />
          </div>
          <div
            className={!showCheckout ? "spacerShow takeout" : "spacer takeout"}
            id={theme}
          ></div>
          <div className="checkoutNcontinueShopButtons" id={theme}>
            <NavLink exact to="/menu">
              <button>Add More to Bag</button>
            </NavLink>
            <OpenModalButton
              buttonText="Checkout"
              modalComponent={<CheckoutBag userId={user ? user.id : null} />}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
