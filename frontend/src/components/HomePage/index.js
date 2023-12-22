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
    <div className="pageContainer" id="home">
      <NavLink exact to="/allProducts">
        <button
          className={
            user && (user.role.name === "Manager" || user.role.name === "Owner")
              ? "viewAllButton"
              : "hidden"
          }
        >
          View All
        </button>
      </NavLink>

      <div className="itemsContainerDiv">
        <div>
          <h1>Checkout our Products</h1>

          <NavLink exact to="/products">
            <button className={!user ? "hidden" : "viewAllButton"}>
              View All Products
            </button>
          </NavLink>
        </div>

        <div className="categoryContainer">
          {Object.values(categories).map((category) => (
            <>
              {console.log(category)}
              {category.shippable && (
                <NavLink
                  exact
                  to={`/category/${category.name}`}
                  key={category.id}
                  className="idvItem"
                  // style={{backgroundImage={}}}
                >
                  <h2>{category.name}</h2>
                </NavLink>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="itemsContainerDiv"

      >
        <div className="menuItemsTitleContainer">
          <h1>Checkout our Menu</h1>

          <NavLink exact to="/menu">
            <button className={!user ? "hidden" : "viewAllButton"}>
              View Full Menu
            </button>
          </NavLink>
        </div>

        <div className="menuItemsContainer">
          {Object.values(categories).map((category) => (
            <>
              {!category.shippable && (
                <NavLink
                  exact
                  to={`/category/${category.name}`}
                  key={category.id}
                  className="idvItem"
                >
                  <h2>{category.name}</h2>
                </NavLink>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
