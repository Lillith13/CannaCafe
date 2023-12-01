import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getProducts } from "../../store/products";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getProducts()).then(() => setIsLoaded(true));
  }, []);

  return isLoaded ? (
    <div>
      <div>
        <div>
          <h2>Checkout our Products</h2>
        </div>
        <div>Product Images will cycle here...</div>
      </div>
      <div>
        <div>
          <h2>Checkout our Menu</h2>
        </div>
        <div>Menu Item Images will cycle here...</div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
