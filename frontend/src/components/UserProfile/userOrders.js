import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(async () => {
    // const data = await dispatch();
  }, [dispatch]);

  // ! Orders to be seperated by bag or cart orders - only cart orders can be returned

  return isLoaded ? (
    <>
      <h1>User Orders Coming soon...</h1>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
