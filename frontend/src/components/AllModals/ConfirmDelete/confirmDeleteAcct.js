import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../../context/Modal";
import { deleteUser } from "../../../store/session";

export default function ConfirmDeleteAcct({ userId }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const data = await dispatch(deleteUser(userId));
    if (data) {
      console.log(data);
    } else {
      history.push("/");
      closeModal();
    }
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete your account?</p>
      <div>
        <button onClick={handleDelete}>Yes (delete account)</button>
        <button onClick={closeModal}>No (keep account)</button>
      </div>
    </div>
  );
}
