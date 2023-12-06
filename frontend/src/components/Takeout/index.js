import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";

export default function Takeout() {
  const user = useSelector((state) => state.session.user);
  const [bag, setBag] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localBag = localStorage.getItem(`${user.id}takeaway`);
    const parsedBag = JSON.parse(localBag);
    if (parsedBag) {
      setBag([...Object.values(parsedBag)]);
    }
    setIsLoaded(true);
  }, []);

  const changeQuant = (e, type, itemId) => {
    e.preventDefault();
    const storedTakeout = localStorage.getItem(`${user.id}takeaway`);
    const currBag = JSON.parse(storedTakeout);
    let updatedBag = {};
    if (type === "inc") {
      currBag[itemId].quantity++;
      updatedBag = { ...currBag };
    }
    if (type === "dec") {
      currBag[itemId].quantity--;
      updatedBag = { ...currBag };
    }
    if (type === "remove") {
      delete currBag[itemId];
      updatedBag = { ...currBag };
    }
    localStorage.setItem(`${user.id}takeaway`, JSON.stringify(updatedBag));
    setBag([...Object.values(updatedBag)]);
  };

  const handleCheckout = () => {
    // ! for adding cart items to orders table
  };

  return isLoaded ? (
    <>
      <h1>Coming soon...</h1>
      <p>
        to be implemented later: Increase & Decrease Quantity and Full Removal
        of item
      </p>
      {bag.length > 0 ? (
        <>
          {bag.map((item) => (
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
          <button onClick={handleCheckout}>Checkout</button>
          <NavLink exact to="/menu">
            <button>Add More</button>
          </NavLink>
        </>
      ) : (
        <>
          <h3>No items in your bag...</h3>
          <NavLink exact to="/menu">
            <button>Find items to Add</button>
          </NavLink>
        </>
      )}
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
