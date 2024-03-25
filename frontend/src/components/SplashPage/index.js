import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./css/SplashPage.css";
import "./css/screenSizing.css";
import "./css/themes.css";
import splashLogo from "../../assets/cannaleaf.png";

export default function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const [guest, setGuest] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  useEffect(() => {
    if (!user || user == "undefined") {
      setGuest(true);
    } else {
      setGuest(false);
    }

    setLoaded(true);
  }, []);

  return isLoaded ? (
    <div className="splashPageContainer" id="splashPage">
      {!guest ? (
        <>
          <h1 className="splashGreeting" id={theme}>
            Welcome back, {user.username}!
          </h1>
        </>
      ) : (
        <>
          <h1 className="splashGreeting" id={theme}>
            Welcome to CannaCafe!
          </h1>
        </>
      )}
      <NavLink
        exact
        to="/home"
        style={{ textDecoration: "none" }}
        className="splashLogoContainerDiv"
      >
        <div className={guest ? "splashGuest" : "splashEnter"} id={theme}>
          {!guest ? (
            <p>Your One Stop Shop For All Things Relating To Cannabis</p>
          ) : (
            <p>
              Welcome to CannaCafe, the place where your inner child can finally
              be let loose!
            </p>
          )}
          <h2>Enter</h2>
        </div>
        <img
          src={splashLogo}
          alt="SplashLogo"
          className="splashLogoImage"
          id={theme}
        />
      </NavLink>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
