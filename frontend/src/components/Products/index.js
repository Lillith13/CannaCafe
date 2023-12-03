import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProdsByCat,
  loadAllAll,
  loadAllProducts,
} from "../../store/products";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";

export default function Products() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const products = useSelector((state) => state.products);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    let data;
    if (params.name) {
      data = await dispatch(getProdsByCat(params.name)).then(() =>
        setIsLoaded(true)
      );
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
    if (data) {
      console.log(data.errors);
    }
  }, [dispatch]);

  return isLoaded ? (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Go Back
      </button>
      {params.name && <h1>{params.name}</h1>}
      {Object.values(products).map((product) => (
        <div key={product.id}>
          <NavLink
            exact
            to={
              product.category.shippable
                ? `/product/${product.id}`
                : `/menu/${product.id}`
            }
          >
            {product.previewImg ? (
              <img src={`${product.previewImg}`} />
            ) : (
              <img src={imgPlaceholder} />
            )}
            <h3>{product.name}</h3>
            <p>{product.price} --- maybe add purchase options later</p>
          </NavLink>
          <button>Add to {product.category.shippable ? "Cart" : "Bag"}</button>
          {(user.role.name == "Owner" || user.role.name == "Manager") && (
            <>
              <button>Edit Product</button>
              <button>Delete Product</button>
            </>
          )}
        </div>
      ))}
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
