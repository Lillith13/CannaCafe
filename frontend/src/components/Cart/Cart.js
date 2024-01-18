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
import CheckoutCart from "../AllModals/CheckoutCart";

export default function Cart() {
  const user = useSelector((state) => state.session.user);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    let localCart = null;
    if (user) {
      localCart = localStorage.getItem(`${user.id}Cart`);
    } else {
      localCart = localStorage.getItem("guestCart");
    }
    const parsedCart = JSON.parse(localCart);
    if (localCart) {
      setCart([...Object.values(parsedCart)]);
    }
    setIsLoaded(true);
  }, []);

  const changeQuant = (e, type, itemId) => {
    e.preventDefault();
    let storedCart = null;
    if (user) {
      storedCart = localStorage.getItem(`${user.id}Cart`);
    } else {
      storedCart = localStorage.getItem("guestCart");
    }
    const currCart = JSON.parse(storedCart);
    let updatedCart = {};
    if (type === "inc") {
      currCart[itemId].quantity++;
      updatedCart = { ...currCart };
    }
    if (type === "dec") {
      currCart[itemId].quantity--;
      if (!currCart[itemId].quantity) {
        delete currCart[itemId];
        updatedCart = { ...currCart };
      } else {
        updatedCart = { ...currCart };
      }
    }
    if (type === "remove") {
      delete currCart[itemId];
      updatedCart = { ...currCart };
    }
    if (user) {
      localStorage.setItem(`${user.id}Cart`, JSON.stringify(updatedCart));
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
    setCart([...Object.values(updatedCart)]);
  };

  return isLoaded ? (
    <div>
      <div className="pageContainer" id="cart">
        {cart.length > 0 ? (
          <div className="cartContainerDiv">
            {cart.map((item) => (
              <div key={item.id} className="cartItemContainer" id={theme}>
                <div className="itemImageContainer" id={theme}>
                  <img src={item.previewImg} />
                </div>
                <div id="cartItemDetails">
                  <div className="cartItemInfoContainer" id={theme}>
                    <NavLink exact to={`/product/${item.id}`}>
                      <h2>{item.name}</h2>
                    </NavLink>
                    <div id="cartItemPrice">
                      <h4>
                        {item.quantity} x ${item.price}
                      </h4>
                      <h4>
                        Item Total: ${(item.quantity * item.price).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                  <div className="cartButtonsContainer" id={theme}>
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
          <div className="emptyCartContainer" id={theme}>
            <h1>No items in your cart...</h1>
            <NavLink exact to="/products">
              <button className="emptyCartButton" id={theme}>
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
              <button>Add More to Cart</button>
            </NavLink>
            <OpenModalButton
              buttonText="Checkout"
              modalComponent={<CheckoutCart userId={user ? user.id : null} />}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
