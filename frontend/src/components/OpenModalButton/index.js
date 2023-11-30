import React from "react";
import { useModal } from "../../context/Modal";
import "./index.css";

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  modalClasses,
}) {
  const { setModalContent, setOnModalClose } = useModal();
  let classes;
  if (modalClasses) {
    classes =
      modalClasses.length > 1 ? modalClasses.join(" ") : modalClasses[0];
  }

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className={classes} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
