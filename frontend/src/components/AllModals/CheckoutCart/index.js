import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import "./CheckoutCart.css";
import { useDispatch } from "react-redux";
import { addUserOrderItems, createOrder } from "../../../store/orders";

export default function CheckoutCart({ userId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [total, setTotal] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let storedCart = null;
    if (userId && userId != "undefined") {
      storedCart = localStorage.getItem(`${userId}Cart`);
    } else {
      storedCart = localStorage.getItem("guestCart");
    }
    const parsedCart = JSON.parse(storedCart);
    // console.log(parsedCart);

    const cartVals = [];
    Object.values(parsedCart).map((item) => {
      console.log(item);
      cartVals.push([item.id, item.quantity]);
    });
    setCart(cartVals);
    // setCart([...Object.values(parsedCart)]);

    let cartTotal = 0;
    Object.values(parsedCart).map((item) => {
      const price = Number(item.price).toFixed(2);
      const quantity = Number(item.quantity);
      cartTotal += Number(price * quantity);
    });
    setTotal(cartTotal.toFixed(2));
  }, []);

  const placeOrder = (e) => {
    e.preventDefault();
    let updateCart = {};
    if (userId && userId != "undefined") {
      dispatch(createOrder()).then((orderId) => {
        cart.map((item) => {
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
              console.log(userId);
              console.log(localStorage.getItem(`${userId}Cart`));
              localStorage.setItem(`${userId}Cart`, JSON.stringify(updateCart));
            })
            .then(() => {
              history.push("/home");
              closeModal();
              return;
            });
        });
      });
    } else {
      localStorage.setItem("guestCart", JSON.stringify(updateCart));
    }
    history.push("/home");
    closeModal();
  };

  return (
    <div className="cartCheckoutContainer">
      <form onSubmit={placeOrder}>
        <h1>Confirm Order</h1>
        <h3>Order Total: ${total}</h3>
        <div className="cartCheckoutButtonsContainer">
          <button type="submit">Confirm</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
