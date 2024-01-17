import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./css/tabs/complaints.css";
import "./css/tabs/univ.css";
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

export default function UserComplaints() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(async () => {
    // const data = await dispatch();
  }, [dispatch]);

  // ! display your posted for Members - posted complaints by Members as Manager & Owner

  return isLoaded ? (
    <>
      <h1>User Complaints Coming soon...</h1>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
