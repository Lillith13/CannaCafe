import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./HomePage.css";
import { authenticate } from "../../store/session";
import { getCategories } from "../../store/products";

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch()
      .then((authenticate) => dispatch(getCategories()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? (
    <div>
      <div>
        <div>
          <h2>Checkout our Products</h2>
        </div>
        <div>Product Images will cycle here...</div>
        {Object.values(categories).map((category) => (
          <NavLink exact to={`/products/${category.name}`} key={category.id}>
            {category.shippable && <h3>{category.name}</h3>}
          </NavLink>
        ))}
      </div>
      <div>
        <div>
          <h2>Checkout our Menu</h2>
        </div>
        <div>Menu Item Images will cycle here...</div>
        {Object.values(categories).map((category) => (
          <NavLink exact to={`/products/${category.name}`} key={category.id}>
            {!category.shippable && <h3>{category.name}</h3>}
          </NavLink>
        ))}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
