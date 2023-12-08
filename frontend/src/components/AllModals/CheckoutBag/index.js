import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import "./CheckoutBag.css";

export default function CheckoutBag({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const [option, setOption] = useState("");
  const [total, setTotal] = useState();

  useEffect(() => {
    let storedBag = null;
    if (userId && userId != "undefined") {
      storedBag = localStorage.getItem(`${userId}takeaway`);
    } else {
      storedBag = localStorage.getItem("guestTakeaway");
    }
    const parsedBag = JSON.parse(storedBag);
    let bagTotal = 0;
    Object.values(parsedBag).map((item) => {
      const price = Number(item.price).toFixed(2);
      const quantity = Number(item.quantity);
      bagTotal += Number(price * quantity);
    });
    setTotal(bagTotal.toFixed(2));
  }, []);

  const placeOrder = () => {
    let updateBag = {};
    if (userId && userId != "undefined") {
      localStorage.setItem(`${userId}takeaway`, JSON.stringify(updateBag));
    } else {
      localStorage.setItem("guestTakeaway", JSON.stringify(updateBag));
    }
    history.push("/home");
    closeModal();
  };

  return (
    <div className="bagCheckoutContainer">
      <h1>Confirm Order</h1>
      <h3>
        {option ? option : "Order"} Total: ${total}
      </h3>
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option selected hidden>
          Choose One...
        </option>
        <option value="Delivery">Delivery</option>
        <option value="PickUp">Pick-Up</option>
      </select>
      <div className="bagCheckoutButtonsContainer">
        <button disabled={!option} onClick={placeOrder}>
          Confirm
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}
