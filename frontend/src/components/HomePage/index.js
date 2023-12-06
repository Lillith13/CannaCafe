import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./HomePage.css";
import { getCategories } from "../../store/categories";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCategories()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? (
    <div>
      <div>
        {user ? (
          <>
            {(user.role.name === "Manager" || user.role.name === "Owner") && (
              <NavLink exact to="/allProducts">
                <h3>View All</h3>
              </NavLink>
            )}
          </>
        ) : null}
        <div>
          <h2>Checkout our Products</h2>
        </div>
        <NavLink exact to="/products">
          <h3>View All</h3>
        </NavLink>
        <div>Product Images will cycle here...</div>
        {Object.values(categories).map((category) => (
          <NavLink exact to={`/category/${category.name}`} key={category.id}>
            {category.shippable && <h3>{category.name}</h3>}
          </NavLink>
        ))}
      </div>
      <div>
        <div>
          <h2>Checkout our Menu</h2>
        </div>
        <NavLink exact to="/menu">
          <h3>View All</h3>
        </NavLink>
        <div>Menu Item Images will cycle here...</div>
        {Object.values(categories).map((category) => (
          <NavLink exact to={`/category/${category.name}`} key={category.id}>
            {!category.shippable && <h3>{category.name}</h3>}
          </NavLink>
        ))}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
