import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { deleteProduct } from "../../../store/products";

export default function ConfirmDeleteItem({ product }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async (productId) => {
    const data = await dispatch(deleteProduct(productId));
    if (data) {
      console.log(data);
    } else {
      history.push("/home");
    }
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete {product.name}?</p>
      <div>
        <button onClick={() => handleDelete(product.id)}>
          Yes (delete product)
        </button>
        <button onClick={closeModal}>No (keep product)</button>
      </div>
    </div>
  );
}
