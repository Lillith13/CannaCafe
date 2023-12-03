import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadProduct } from "../../store/products";

import imgPlaceholder from "../../assets/noImgAvailable.jpg";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products);
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await dispatch(loadProduct(params.id)).then(() =>
      setIsLoaded(true)
    );
    if (data) {
      console.log("data.errors => ", data.errors);
    }
  }, [dispatch]);

  return isLoaded ? (
    <>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Go Back
        </button>
        {product.previewImg ? (
          <img src={`${product.previewImg}`} />
        ) : (
          <img src={imgPlaceholder} />
        )}
        {/* <div>
          Will load in other images later
          {product.otherImages && (
                <>
                    {product.otherImages.map(image => (
                        <img src={`${image}`} />
                    ))}
                </>
            )}
        </div> */}
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.units_available} Available</p>
        <p>${product.price}</p>
        <button>Add to {product.shippable ? "cart" : "bag"}</button>
        {(user.role.name === "Manager" || user.role.name === "Owner") && (
          <>
            <button>Edit Product</button>
            <button>Delete Product</button>
          </>
        )}
      </div>
      <h3>Reviews</h3>
      <p>Product reviews will load here...</p>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

/*
category
:
{age_restricted: true, id: 5, name: 'Smoke', shippable: true}
description
:
"Demo smoke - the greenest of trees"
id
:
6
name
:
"demoSmoke"
otherImgs
:
Array(0)
length
:
0
[[Prototype]]
:
Array(0)
previewImg
:
null
price
:
"15.00"
units_available
:
150 */
