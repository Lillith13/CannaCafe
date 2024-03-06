import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { addUserOrderItems, createOrder } from "../../../store/orders";
import "./CheckoutBag.css";

export default function CheckoutBag({ userId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [option, setOption] = useState("");
  const [total, setTotal] = useState();
  const [bag, setBag] = useState([]);

  useEffect(() => {
    let storedBag = null;
    if (userId && userId != "undefined") {
      storedBag = localStorage.getItem(`${userId}Takeaway`);
      // console.log(storedBag)
    } else {
      storedBag = localStorage.getItem("guestTakeaway");
    }
    const parsedBag = JSON.parse(storedBag);
    // console.log(parsedBag);

    const cartVals = [];
    const parsedBagArr = Object.values(parsedBag);
    // console.log(parsedBagArr);
    parsedBagArr.map((item) => {
      // console.log(item);
      cartVals.push([item.id, item.quantity]);
    });
    setBag(cartVals);

    let bagTotal = 0;
    parsedBagArr.map((item) => {
      // console.log(item);
      const price = Number(item.price).toFixed(2);
      const quantity = Number(item.quantity);
      bagTotal += Number(price * quantity);
      // console.log(bagTotal);
    });
    setTotal(bagTotal.toFixed(2));
  }, []);

  const placeOrder = (e) => {
    e.preventDefault();
    if (userId && userId != "undefined") {
      dispatch(createOrder(total)).then((orderId) => {
        let formData = {};
        bag.map((item) => {
          formData = {
            itemId: item[0],
            quantity: item[1],
          };
          console.log("formData sent => ", formData);

          dispatch(addUserOrderItems({ formData, orderId }))
            .then((data) => {
              if (data && data.errors) {
                console.log(data);
              }
            })
            .then(() => {
              localStorage.setItem(`${userId}Takeaway`, JSON.stringify({}));
            })
            .then(() => {
              history.push("/profile");
              closeModal();
              return;
            });
        });
      });
    } else {
      localStorage.setItem("guestTakeaway", JSON.stringify({}));
    }
    userId ? history.push("/profile") : history.push("/home");
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
