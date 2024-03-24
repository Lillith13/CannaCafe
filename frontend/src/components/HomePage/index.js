import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./css/HomePage.css";
import "./css/screenSizing.css";
import "./css/themes.css";

import { getCategories } from "../../store/categories";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);
  const [isLoaded, setIsLoaded] = useState(false);
  const [descriptions, setDescriptions] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  useEffect(() => {
    setDescriptions({
      Menu: "Welcome to Canna Cafe, where flavor meets innovation. Our Herbal Harmony Selections allow you to curate your coffee or snack experience. Elevate your brew with our Herbal Infusions or enjoy the familiar warmth of our classic offerings. Discover a new level of taste at your favorite cafe.",
      Smoke:
        "Elevate your smoking experience with our Herbal Elevation product. Immerse yourself in the natural essence of pure herbs, carefully curated for a distinctive and invigorating experience. Ignite the senses, embrace the moment, and discover a new dimension to your smoke ritual.",
      Merch:
        "Take a piece of the Canna Cafe experience with you wherever you go. Our exclusive merchandise collection embodies the essence of our cafe – from stylish logo tees to cozy branded mugs. Elevate your style and make a statement with our signature merch.",
      Paraphenalia:
        "Elevate your experience with sleek pipes, artisanal rolling papers, and premium lighters. Immerse yourself in a world of sophistication and elevate your smoking ritual to new heights.",
    });
    dispatch(getCategories()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded ? (
    <div className="pageContainer" id="home">
      <NavLink exact to="/allProducts">
        <button
          className={
            user && (user.role.name === "Manager" || user.role.name === "Owner")
              ? "viewAllItemsButton"
              : "hidden"
          }
          id={theme}
        >
          View All
        </button>
      </NavLink>
      <div className="menuItemsContainerDiv" id={theme}>
        <div className="menuItemsTitleContainer" id={theme}>
          <h1>Checkout our Menu</h1>

          <p>{descriptions.Menu}</p>

          <NavLink exact to="/menu">
            <button
              className={!user ? "hidden" : "viewAllMenuButton"}
              id={theme}
            >
              View Full Menu
            </button>
          </NavLink>
        </div>

        <div className="menuItemsContainer" id={theme}>
          {Object.values(categories).map((category) => (
            <>
              {!category.shippable && (
                <NavLink
                  exact
                  to={`/category/${category.name}`}
                  key={category.id}
                  className="idvMenuItem"
                  id={category.name}
                >
                  <h2 id="cardInfo">
                    {category.name == "Drink" ||
                    category.name == "Infused-Drink"
                      ? category.name + "s"
                      : category.name}
                  </h2>
                </NavLink>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="productsContainerDiv" id={theme}>
        <div className="productsTitleContainer">
          <h1>Checkout our Products</h1>
          <NavLink exact to="/products">
            <button
              className={!user ? "hidden" : "viewAllProductsButton"}
              id={theme}
            >
              View All Products
            </button>
          </NavLink>
        </div>

        <div className="productLinksContainer" id={theme}>
          {Object.values(categories).map((category) => (
            <>
              {category.shippable && (
                <NavLink
                  exact
                  to={`/category/${category.name}`}
                  key={category.id}
                  className="idvProduct"
                  id={category.name}
                >
                  <h2 id="cardInfo">{category.name}</h2>
                  <p id="cardInfo">{descriptions[category.name]}</p>
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
