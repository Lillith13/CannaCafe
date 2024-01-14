import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./SplashPage.css";
import splashLogo from "../../assets/cannaleaf.png";

export default function SplashPage() {
  const user = useSelector((state) => state.session.user);
  const [guest, setGuest] = useState();
  const [isLoaded, setLoaded] = useState(false);

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
          <h1 className="splashGreeting">Welcome back, {user.username}!</h1>
        </>
      ) : (
        <>
          <h1 className="splashGreeting">Welcome to CannaCafe!</h1>
        </>
      )}
      {/* <div> */}
      <NavLink
        exact
        to="/home"
        style={{ textDecoration: "none" }}
        className="splashLogoContainerDiv"
      >
        <div className="splashEnter" id={guest ? "guest" : "user"}>
          {!guest ? (
            <p>Your One Stop Shop For All Things Relating To Cannabis</p>
          ) : (
            <p id="guestSplashMsg">
              Welcome to CannaCafe, the place where your inner child can finally
              be let loose! This platform is a lively online shop designed for
              fellow lovers and connoisseurs of the amazing and weirdly
              controversial herb with calming and healing properties. If you're
              passionate about the potent and smelly healing herb and an opposer
              to the government imposed hate directed at the kind and lovely
              sweetheart that is Cannabis, CannaCafe is the place for you.
            </p>
          )}
          <h2>Enter</h2>
        </div>
        {/* <div> */}
        <img src={splashLogo} alt="SplashLogo" className="splashLogoImage" />
        {/* </div> */}
      </NavLink>
      {/* </div> */}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
