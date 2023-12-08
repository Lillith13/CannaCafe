import React from "react";
import { useHistory } from "react-router-dom";

export default function OopsyMessage() {
  const history = useHistory();
  return (
    <div className="oopseyMessageContainer">
      <h1>Oops, looks like you stumbled into a place you shouldn't be...</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Go Back
      </button>
    </div>
  );
}
