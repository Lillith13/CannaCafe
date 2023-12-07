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
      const currCart = localStorage.getItem(`${user.id}cart`);
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

      localStorage.setItem(`${user.id}cart`, JSON.stringify(updateCart));
    }
    if (where === "Takeaway Bag") {
      const currTakeaway = localStorage.getItem(`${user.id}takeaway`);
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
      localStorage.setItem(`${user.id}takeaway`, JSON.stringify(updateBag));
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
