import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
