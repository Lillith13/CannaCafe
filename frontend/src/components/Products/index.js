import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import "./css/Universal.css";
import "./css/toggleSwitch.css";
/* Views */
import "./css/productViews/TileView.css";
import "./css/productViews/ListView.css";
/* Themes */
import "./css/themes/green/light.css";
import "./css/themes/green/dark.css";
import "./css/themes/blue/light.css";
import "./css/themes/blue/dark.css";
import "./css/themes/purple/light.css";
import "./css/themes/purple/dark.css";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";

import {
  getProdsByCat,
  loadAllAll,
  loadAllProducts,
} from "../../store/products";
import { getAllFavorites } from "../../store/favorites";
import { getWishlist } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import CreateProduct from "../AllModals/CreateProduct";
import EditProduct from "../AllModals/EditProduct";
import ConfirmDeleteItem from "../AllModals/ConfirmDelete/confirmDeleteItem";
import ConfirmAdd from "../AllModals/ConfirmAddTo";
import ConfirmRemove from "../AllModals/ConfirmRemove";

export default function Products() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const userFaves = useSelector((state) => state.favorites);
  const userWishes = useSelector((state) => state.wishlist);
  const [type, setType] = useState();
  const [category, setCategory] = useState(null);
  const [view, setView] = useState("tile");
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));
  const [isLoaded, setIsLoaded] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(async () => {
    // * checking pathname to set what should be displayed
    let data;

    let here = location.pathname.slice(1);

    if (here.includes("/")) {
      const cat = here.split("/")[1];
      const menu = ["Food", "Drinks", "Infused-Food", "Infused-Drinks"];

      menu.includes(cat) && isNaN(cat) ? (here = "menu") : (here = "product");

      if (isNaN(cat)) {
        setCategory(cat);
      }
    } else {
      here[here.length - 1] == "s" && here != "allProducts"
        ? (here = `${location.pathname.slice(1, location.pathname.length - 1)}`)
        : (here = `${location.pathname.slice(1, location.pathname.length)}`);
    }

    // * setting states based on above & running dispatches
    setType(here);

    if (params.name) {
      data = await dispatch(getProdsByCat(params.name))
        .then(() => dispatch(getAllFavorites()))
        .then(() => dispatch(getWishlist()))
        .then(() => setIsLoaded(true));
    } else {
      const path = location.pathname.slice(1);
      if (path === "allProducts") {
        data = await dispatch(loadAllAll()).then(() => setIsLoaded(true));
      } else {
        data = await dispatch(loadAllProducts(path)).then(() =>
          setIsLoaded(true)
        );
      }
    }
    // if (data) {
    //   console.log(data.errors);
    // }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // * checking localStorage for view setting to set view ("tile"/"list")
    const localViewSet = localStorage.getItem("viewSetting");

    if (localViewSet) {
      if (Object.values(products).length < 3) {
        setView("list");
      } else {
        setView(localViewSet);
      }
    } else {
      localStorage.setItem("viewSetting", "tile");
      if (Object.values(products).length < 3) {
        setView("list");
      } else {
        setView(localViewSet);
      }
    }
  }, [isLoaded]);

  const toggleView = () => {
    view == "tile" ? setView("list") : setView("tile");
    view == "tile"
      ? localStorage.setItem("viewSetting", "list")
      : localStorage.setItem("viewSetting", "tile");
  };

  return isLoaded ? (
    <div
      className={`pageContainer ${sticky ? "sticky" : null}`}
      id="productView"
    >
      <div className="pageHeader" id={theme}>
        <div className="topOfHeaderItems">
          <div>
            <button
              className={
                sticky
                  ? "sticky goBackButton productsPage"
                  : "goBackButton productsPage"
              }
              id={theme}
              onClick={(e) => {
                e.preventDefault();
                history.goBack();
              }}
            >
              Go Back
            </button>
          </div>
          <div className="viewOptionsDiv">
            {sticky ? (
              <div className="toggleSwitchContainer">
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    className="toggleSwitch-checkbox"
                    name="setView"
                    id="view"
                    onClick={toggleView}
                  />
                  <label
                    className="toggleSwitch-label"
                    id={theme}
                    htmlFor="view"
                  >
                    <span
                      className={
                        view == "tile"
                          ? "tile toggleSwitch-inner"
                          : "list toggleSwitch-inner"
                      }
                      id={theme}
                    />
                    <span
                      className={
                        view == "tile"
                          ? "tile toggleSwitch-switch"
                          : "list toggleSwitch-switch"
                      }
                      id={theme}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <>
                <button
                  className={
                    view == "list"
                      ? "selectedView viewOptionsButton"
                      : "viewOptionsButton"
                  }
                  id={theme}
                  onClick={() => {
                    setView("list");
                    localStorage.setItem("viewSetting", "list");
                  }}
                >
                  List
                </button>
                <button
                  className={
                    view == "tile"
                      ? "selectedView viewOptionsButton"
                      : "viewOptionsButton"
                  }
                  id={theme}
                  onClick={() => {
                    setView("tile");
                    localStorage.setItem("viewSetting", "tile");
                  }}
                  disabled={Object.values(products).length < 3}
                >
                  Tile
                </button>
              </>
            )}
          </div>
        </div>

        {params && params.name ? (
          <h1
            className={
              sticky ? "sticky productsPageTitle" : "productsPageTitle"
            }
            id={theme}
          >
            {params.name}
          </h1>
        ) : (
          <h1
            className={
              sticky ? "sticky productsPageTitle" : "productsPageTitle"
            }
            id={theme}
          >
            {location.pathname.slice(1)[0].toUpperCase() +
              location.pathname.slice(1).substring(1)}
          </h1>
        )}
      </div>

      <div
        className={
          view === "tile" ? "productDisplayAreaTile" : "productDisplayAreaList"
        }
        id={theme}
      >
        {products && (
          <div
            className={
              view === "tile"
                ? `prodsDivTileView ${theme}`
                : `prodsDivListView ${theme}`
            }
            id={
              Object.values(products).length < 3
                ? "prodsDivAlt"
                : "prodsDivNorm"
            }
          >
            {Object.values(products).length > 0 ? (
              <>
                {Object.values(products).map((product) => (
                  <div
                    key={product.id}
                    className={
                      view === "tile"
                        ? `idvProdContainerTile`
                        : `idvProdContainerList`
                    }
                    id={theme}
                    onClick={(e) => {
                      e.preventDefault();
                      if (e.target.tagName != "BUTTON") {
                        product.category.shippable
                          ? history.push(`/product/${product.id}`)
                          : history.push(`/menu/${product.id}`);
                      }
                    }}
                    style={
                      view == "tile"
                        ? {
                            backgroundImage: `url(${
                              product.previewImg
                                ? product.previewImg
                                : imgPlaceholder
                            })`,
                            cursor: "pointer",
                          }
                        : { cursor: "pointer" }
                    }
                  >
                    {view == "tile" ? (
                      <div style={{ height: "150px" }}></div>
                    ) : (
                      <img
                        src={
                          product.previewImg
                            ? product.previewImg
                            : imgPlaceholder
                        }
                      />
                    )}
                    <div
                      className={
                        view == "tile"
                          ? "itemDetailDivInnerTile"
                          : "itemDetailDivInnerList"
                      }
                    >
                      <div
                        className={
                          view === "tile"
                            ? "idvProdNameNPriceContainerTile"
                            : "idvProdNameNPriceContainerList"
                        }
                        id={theme}
                      >
                        <h3>{product.name}</h3>
                        <h3>${product.price}</h3>
                      </div>
                      {/* </NavLink> */}

                      <div
                        className={
                          view === "tile"
                            ? "idvProdButtonContainerTile"
                            : "idvProdButtonContainerList"
                        }
                        id={theme}
                        style={{ gap: "0px" }}
                      >
                        <div
                          className={
                            view === "tile"
                              ? "universalProdButtonsTile"
                              : "universalProdButtonsList"
                          }
                          id={theme}
                          style={{ gap: "0px" }}
                        >
                          <OpenModalButton
                            buttonText={`Add to ${
                              product.category.shippable
                                ? "Shopping Cart"
                                : "Takeaway Bag"
                            }`}
                            modalComponent={
                              <ConfirmAdd
                                where={
                                  product.category.shippable
                                    ? "Shopping Cart"
                                    : "Takeaway Bag"
                                }
                                product={product}
                                user={user}
                              />
                            }
                          />
                          {user && (
                            <>
                              {userFaves && !product.category.shippable && (
                                <>
                                  {(Object.keys(userFaves).includes(
                                    `${product.id}`
                                  ) ||
                                    Object.keys(userFaves).includes(
                                      product.id
                                    )) &&
                                  !product.category.shippable ? (
                                    <div
                                      className={
                                        view == "tile"
                                          ? "productsTileRemoveFrom productsPage"
                                          : "productsListRemoveFrom productsPage"
                                      }
                                      id={theme}
                                    >
                                      <OpenModalButton
                                        buttonText="Remove From Favorites"
                                        modalComponent={
                                          <ConfirmRemove
                                            where="Favorites"
                                            product={product}
                                          />
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={
                                        view == "tile"
                                          ? "productsTileUnivButton productsPage"
                                          : "productsListUnivButton productsPage"
                                      }
                                      id={theme}
                                    >
                                      <OpenModalButton
                                        buttonText="Add to Favorites"
                                        modalComponent={
                                          <ConfirmAdd
                                            where="Favorites"
                                            product={product}
                                          />
                                        }
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                              {userWishes && product.category.shippable && (
                                <>
                                  {(Object.keys(userWishes).includes(
                                    `${product.id}`
                                  ) ||
                                    Object.keys(userWishes).includes(
                                      product.id
                                    )) &&
                                  product.category.shippable ? (
                                    <div
                                      className={
                                        view == "tile"
                                          ? "productsTileRemoveFrom productsPage"
                                          : "productsListRemoveFrom productsPage"
                                      }
                                      id={theme}
                                    >
                                      <OpenModalButton
                                        buttonText="Remove From Wishlist"
                                        modalComponent={
                                          <ConfirmRemove
                                            where="Wishlist"
                                            product={product}
                                          />
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className={
                                        view == "tile"
                                          ? "productsTileUnivButton productsPage"
                                          : "productsListUnivButton productsPage"
                                      }
                                      id={theme}
                                    >
                                      <OpenModalButton
                                        buttonText="Add to Wishlist"
                                        modalComponent={
                                          <ConfirmAdd
                                            where="Wishlist"
                                            product={product}
                                          />
                                        }
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div
                          className={
                            view === "tile"
                              ? "roleProtectedButtonsTile"
                              : "roleProtectedButtonsList"
                          }
                          id={theme}
                        >
                          {user &&
                            (user.role.name == "Owner" ||
                              user.role.name == "Manager") && (
                              <div>
                                <div
                                  className={
                                    view == "tile"
                                      ? "productsTileEdit productsPage"
                                      : "productsListEdit productsPage"
                                  }
                                  id={theme}
                                >
                                  <OpenModalButton
                                    buttonText="Edit Product"
                                    modalComponent={
                                      <EditProduct
                                        type={
                                          product.category.shippable
                                            ? "product"
                                            : "menu"
                                        }
                                        product={product}
                                      />
                                    }
                                  />
                                </div>
                                <div
                                  className={
                                    view == "tile"
                                      ? "productsTileDelete productsPage"
                                      : "productsListDelete productsPage"
                                  }
                                  id={theme}
                                >
                                  <OpenModalButton
                                    buttonText="Delete Product"
                                    modalComponent={
                                      <ConfirmDeleteItem
                                        product={product}
                                        type={type}
                                        category={category}
                                      />
                                    }
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <h1>Currently no products to show...</h1>
                {user &&
                  (user.role.name == "Owner" ||
                    user.role.name == "Manager") && (
                    <>
                      {type == "allProducts" ? (
                        <>
                          <OpenModalButton
                            buttonText="Add to Products"
                            modalComponent={<CreateProduct type="product" />}
                          />
                          <OpenModalButton
                            buttonText="Add to Menu"
                            modalComponent={<CreateProduct type="menu" />}
                          />
                        </>
                      ) : (
                        <>
                          <OpenModalButton
                            buttonText={`Add to ${
                              location.pathname[1].toUpperCase() +
                              location.pathname.slice(2)
                            }`}
                            modalComponent={<CreateProduct type={type} />}
                          />
                        </>
                      )}
                    </>
                  )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
