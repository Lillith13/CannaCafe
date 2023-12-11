import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { deleteProduct } from "../../../store/products";

import "./ConfirmDelete.css";

export default function ConfirmDeleteItem({ product }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)).then(() => {
      history.push("/home");
      closeModal();
    });
  };

  return (
    <div className="confirmDeleteItemContainer">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete {product.name}?</p>
      <div className="confirmDeleteItemButtonsContainer">
        <button
          className="confirmDeleteItemButton"
          onClick={() => handleDelete(product.id)}
        >
          Yes (delete product)
        </button>
        <button onClick={closeModal}>No (keep product)</button>
      </div>
    </div>
  );
}
