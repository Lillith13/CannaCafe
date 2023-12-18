import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import "./CheckoutBag.css";
import { addUserOrderItems, createOrder } from "../../../store/orders";

export default function CheckoutBag({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const [option, setOption] = useState("");
  const [total, setTotal] = useState();
  const [bag, setBag] = useState({});

  useEffect(() => {
    let storedBag = null;
    if (userId && userId != "undefined") {
      storedBag = localStorage.getItem(`${userId}Takeaway`);
      setBag(JSON.parse(storedBag));
    } else {
      storedBag = localStorage.getItem("guestTakeaway");
      setBag(JSON.parse(storedBag));
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

  const placeOrder = (e) => {
    e.preventDefault();
    let updateBag = {};
    if (userId && userId != "undefined") {
      dispatch(createOrder()).then((orderId) => {
        bag.map((item) => {
          // console.log(item);
          const formData = {
            itemId: item[0],
            quantity: item[1],
          };
          // console.log(formData);
          dispatch(addUserOrderItems({ formData, orderId }))
            .then((data) => {
              if (data && data.errors) {
                console.log(data);
              }
            })
            .then(() => {
              localStorage.setItem(`${userId}Cart`, JSON.stringify(updateBag));
            })
            .then(() => {
              history.push("/profile");
              closeModal();
              return;
            });
        });
      });
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updateBag));
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
