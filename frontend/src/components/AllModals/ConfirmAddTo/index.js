import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { addToWishlist } from "../../../store/wishlist";
import { addToFaves } from "../../../store/favorites";

export default function ConfirmAdd({ where, product, user }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (where === "Wishlist") {
      dispatch(addToWishlist(product.id));
    }
    if (where === "Favorites") {
      dispatch(addToFaves(product.id));
    }
    if (where === "Shopping Cart") {
      let currCart = null;
      if (user && user != "undefined") {
        currCart = localStorage.getItem(`${user.id}cart`);
      } else {
        currCart = localStorage.getItem("guestCart");
      }
      let updateCart = {};
      if (currCart) {
        const cart = JSON.parse(currCart);

        if (cart[product.id]) {
          cart[product.id].quantity++;
          updateCart = { ...cart };
        } else {
          product.quantity = 1;
          updateCart = { ...cart };
          updateCart[product.id] = product;
        }
      } else {
        product.quantity = 1;
        updateCart[product.id] = product;
      }

      if (user && user != "undefined") {
        localStorage.setItem(`${user.id}cart`, JSON.stringify(updateCart));
      } else {
        localStorage.setItem("guestCart", JSON.stringify(updateCart));
      }
    }
    if (where === "Takeaway Bag") {
      let currTakeaway = null;
      if (user && user != "undefined") {
        currTakeaway = localStorage.getItem(`${user.id}takeaway`);
      } else {
        currTakeaway = localStorage.getItem("guestTakeaway");
      }
      let updateBag = {};
      if (currTakeaway) {
        const bag = JSON.parse(currTakeaway);

        if (bag[product.id]) {
          bag[product.id].quantity++;
          updateBag = { ...bag };
        } else {
          product.quantity = 1;
          updateBag = { ...bag };
          updateBag[product.id] = product;
        }
      } else {
        product.quantity = 1;
        updateBag[product.id] = product;
      }

      if (user && user != "undefined") {
        localStorage.setItem(`${user.id}takeaway`, JSON.stringify(updateBag));
      } else {
        localStorage.setItem("guestTakeaway", JSON.stringify(updateBag));
      }
    }
  }, []);

  return (
    <div>
      <h1>Successfully added to {where}</h1>
      <button onClick={closeModal}>OK! 😊 </button>
    </div>
  );
}

/*
<OpenModalButton
    buttonText=""
    modalComponent={<ConfirmAdd where="" product={} user={user} />} />
*/
