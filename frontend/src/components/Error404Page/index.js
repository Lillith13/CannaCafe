import React from "react";
import { useHistory } from "react-router-dom";

import "./errorFourOHFour.css";

export default function ErrorFourOHFour() {
  const history = useHistory();
  return (
    <div className="errorFourOHFour">
      <h1>Error 404: This page doesn't exist</h1>
      <h2>
        Not sure how you got here but this route leads to nothing my friend...
      </h2>
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
