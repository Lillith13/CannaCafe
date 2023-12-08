import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../../context/Modal";
import { delFromWishlist } from "../../../store/wishlist";
import { delFromFaves } from "../../../store/favorites";

import "./ConfirmRemove.css";

export default function ConfirmRemove({ where, product }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (where === "Wishlist") {
      dispatch(delFromWishlist(product.id));
    }
    if (where === "Favorites") {
      dispatch(delFromFaves(product.id));
    }
  }, []);

  return (
    <div className="confirmRemoveMessageContainer">
      <h1>Successfully removed from {where}!</h1>
      <button onClick={closeModal}>OK! 😊 </button>
    </div>
  );
}

/*
<OpenModalButton
    buttonText=""
    modalComponent={<ConfirmRemove where="" product={} />} />
*/
