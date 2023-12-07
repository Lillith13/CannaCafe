import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";

export default function CheckoutCart({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const [total, setTotal] = useState();

  useEffect(() => {
    const storedCart = localStorage.getItem(`${userId}cart`);
    const parsedCart = JSON.parse(storedCart);
    let cartTotal = 0;
    Object.values(parsedCart).map((item) => {
      const price = Number(item.price).toFixed(2);
      const quantity = Number(item.quantity);
      cartTotal += Number(price * quantity);
    });
    setTotal(cartTotal.toFixed(2));
  }, []);

  const placeOrder = () => {
    let updateCart = {};
    localStorage.setItem(`${userId}cart`, JSON.stringify(updateCart));
    history.push("/home");
    closeModal();
  };

  return (
    <div>
      <h1>Confirm Order</h1>
      <h3>Order Total: ${total}</h3>
      <button onClick={placeOrder}>Confirm</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}
