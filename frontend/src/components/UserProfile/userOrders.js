import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    // const data = await dispatch();
  }, [dispatch]);

  return isLoaded ? (
    <>
      <h1>User Orders Coming soon...</h1>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
