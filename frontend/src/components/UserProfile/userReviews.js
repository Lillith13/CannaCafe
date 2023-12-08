import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserReviews() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(async () => {
    // const data = await dispatch();
  }, [dispatch]);

  // ! view your posted Reviews as Member - view reviews posted by Members as Manager & Owner

  return isLoaded ? (
    <>
      <h1>User Reviews Coming soon...</h1>
    </>
  ) : (
    <h2>Loading...</h2>
  );
}
