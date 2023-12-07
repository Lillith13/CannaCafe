import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";

export default function CheckoutBag({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const [option, setOption] = useState("");
  const [total, setTotal] = useState();

  useEffect(() => {
    const storedBag = localStorage.getItem(`${userId}takeaway`);
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
    localStorage.setItem(`${userId}takeaway`, JSON.stringify(updateBag));
    history.push("/home");
    closeModal();
  };

  return (
    <div>
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
      <button disabled={!option} onClick={placeOrder}>
        Confirm
      </button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}
