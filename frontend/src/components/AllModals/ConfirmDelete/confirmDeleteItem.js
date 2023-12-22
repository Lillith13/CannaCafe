import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { deleteProduct } from "../../../store/products";

import "./ConfirmDelete.css";

export default function ConfirmDeleteItem({ product, type, category = null }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location.pathname.slice(1).split("/")[1]);

  const handleDelete = () => {
    dispatch(deleteProduct(product.id, type, category)).then((data) => {
      if (data) {
        // ! error handling
      } else {
        // * thunk reloads
        if (category) {
          history.push(`/category/${category}`);
        } else {
          history.push(`/${type == "menu" ? "menu" : "products"}`);
        }
        closeModal();
      }
    });
  };

  return (
    <div className="confirmDeleteItemContainer">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete {product.name}?</p>
      <div className="confirmDeleteItemButtonsContainer">
        <button
          className="confirmDeleteItemButton"
          onClick={() => handleDelete()}
        >
          Yes (delete product)
        </button>
        <button onClick={closeModal}>No (keep product)</button>
      </div>
    </div>
  );
}
