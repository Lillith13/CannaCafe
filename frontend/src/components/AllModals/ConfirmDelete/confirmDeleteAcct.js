import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { deleteUser } from "../../../store/session";

import "./ConfirmDelete.css";

export default function ConfirmDeleteAcct({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(userId)).then(() => {
      history.push("/");
      closeModal();
    });
  };

  return (
    <div className="confirmDeleteAcctContainer">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete your account?</p>
      <div className="confirmDeleteAcctButtonsContainer">
        <button className="confirmDeleteAcctButton" onClick={handleDelete}>
          Yes (delete account)
        </button>
        <button onClick={closeModal}>No (keep account)</button>
      </div>
    </div>
  );
}
