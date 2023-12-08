import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Cart.css";

import OpenModalButton from "../OpenModalButton";
import CheckoutCart from "../AllModals/CheckoutCart";

export default function Cart() {
  const user = useSelector((state) => state.session.user);
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let localCart = null;
    if (user) {
      localCart = localStorage.getItem(`${user.id}cart`);
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
      storedCart = localStorage.getItem(`${user.id}cart`);
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
      localStorage.setItem(`${user.id}cart`, JSON.stringify(updatedCart));
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
    setCart([...Object.values(updatedCart)]);
  };

  return isLoaded ? (
    <div className="cartContainer">
      {cart.length > 0 ? (
        <div className="cartContainerDiv">
          {cart.map((item) => (
            <div key={item.id} className="cartItemContainer">
              <div className="itemImageContainer">
                <img src={item.previewImg} />
              </div>
              <div className="cartItemInfoContainer">
                <NavLink exact to={`/product/${item.id}`}>
                  <h2>{item.name}</h2>
                </NavLink>
                <h3>
                  {item.quantity} x ${item.price}
                </h3>
                <h3>Item Total: ${(item.quantity * item.price).toFixed(2)}</h3>
              </div>
              <div className="cartButtonsContainer">
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
            <NavLink exact to="/products">
              <button>Continue Shopping</button>
            </NavLink>
            <OpenModalButton
              buttonText="Checkout"
              modalComponent={<CheckoutCart userId={user ? user.id : null} />}
            />
          </div>
        </div>
      ) : (
        <div className="emptyCartContainer">
          <h1>No items in your cart...</h1>
          <NavLink exact to="/products">
            <button className="emptyCartButton">Find items to Add</button>
          </NavLink>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
