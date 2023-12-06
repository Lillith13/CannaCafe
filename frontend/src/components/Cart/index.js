import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const user = useSelector((state) => state.session.user);
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localCart = localStorage.getItem(`${user.id}cart`);
    const parsedCart = JSON.parse(localCart);
    if (localCart) {
      setCart([...Object.values(parsedCart)]);
    }
    setIsLoaded(true);
  }, []);

  const changeQuant = (e, type, itemId) => {
    e.preventDefault();
    const storedCart = localStorage.getItem(`${user.id}cart`);
    const currCart = JSON.parse(storedCart);
    let updatedCart = {};
    if (type === "inc") {
      currCart[itemId].quantity++;
      updatedCart = { ...currCart };
    }
    if (type === "dec") {
      currCart[itemId].quantity--;
      if (currCart[itemId].quantity == 0) {
        delete currCart[itemId];
      } else {
        updatedCart = { ...currCart };
      }
    }
    if (type === "remove") {
      delete currCart[itemId];
      updatedCart = { ...currCart };
    }
    localStorage.setItem(`${user.id}cart`, JSON.stringify(updatedCart));
    setCart([...Object.values(updatedCart)]);
  };

  return isLoaded ? (
    <>
      <h1>Coming soon...</h1>
      <p>
        to be implemented later: Increase & Decrease Quantity and Full Removal
        of item
      </p>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>
                {item.quantity} x ${item.price}
              </p>
              <p>Item Total: ${(item.quantity * item.price).toFixed(2)}</p>
              <label>
                Change Quantity:
                <button onClick={(e) => changeQuant(e, "inc", item.id)}>
                  {" "}
                  +{" "}
                </button>
                <button onClick={(e) => changeQuant(e, "dec", item.id)}>
                  {" "}
                  -{" "}
                </button>
                <button onClick={(e) => changeQuant(e, "remove", item.id)}>
                  Remove from Cart
                </button>
              </label>
            </div>
          ))}
          <button>Checkout</button>
          <NavLink exact to="/products">
            <button>Continue Shopping</button>
          </NavLink>
        </>
      ) : (
        <>
          <h3>No items in your cart...</h3>
          <NavLink exact to="/products">
            <button>Find items to Add</button>
          </NavLink>
        </>
      )}
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
