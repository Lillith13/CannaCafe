import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";
import "./themes.css";
import "./screenSizing.css";

import ReactGA from "react-ga";
require("dotenv").config();
const TRACKING_ID = "G-68HRJCLMW0";
ReactGA.initialize(TRACKING_ID);

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

// * set default theme if no theme saved to client
const themeCheck = localStorage.getItem("clientTheme");
if (!themeCheck) {
  localStorage.setItem("clientTheme", "GL");
}

function Root() {
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const rootElement = document.querySelector("body");
    rootElement.className = theme;
  }, []);

  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
