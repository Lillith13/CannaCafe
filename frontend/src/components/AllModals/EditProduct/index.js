import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./EditProduct.css";

import { useModal } from "../../../context/Modal";
import { editProduct, loadProduct } from "../../../store/products";
import { getCategories } from "../../../store/categories";

export default function EditProduct({ type, product }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unitsAvailable, setUnitsAvailable] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  const presetFields = () => {
    setName(product.name);
    setCategory(product.category.name);
    setDescription(product.description);
    setPrice(product.price);
    setUnitsAvailable(product.units_available);
    // setPreviewImage(product.previewImg);
  };

  useEffect(async () => {
    const data = await dispatch(getCategories()).then(() => {
      presetFields();
      setIsLoaded(true);
    });
    if (data) {
      console.log(data);
      setErrors(data);
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("units_available", unitsAvailable);
    if (previewImage) {
      formData.append("preview", previewImage);
    }

    dispatch(editProduct(formData)).then((data) => {
      if (data && data != "undefined" && data.errors) {
        setErrors(data.errors);
      } else {
        Object.keys(products).map((key) => {
          const test = isNaN(key);
          if (!test) {
            history.push(`/${type}/${product.id}`);
          }
        });
        dispatch(loadProduct(product.id));
        closeModal();
      }
    });
  };

  return isLoaded ? (
    <div className="editItemModalContainer">
      <h1 className="editItemTitle">
        Edit {type == "product" ? "Product" : "Menu Item"}
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="editItemForm">
        <div className="nameNcategoryDiv">
          <label className="editItemLabel">
            Name:
            <input
              className="editItemInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={errors.name ? "* " + errors.name : " "}
            />
          </label>
          <div className="categorySelectorContainer">
            <label className="editItemLabel">
              Category:
              <select
                className="editItemSelect"
                id={errors.category && "catError"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option selected default hidden>
                  Select Category...
                </option>
                {Object.values(categories).map((cat) => (
                  <>
                    {type == "product" && (
                      <>
                        {cat.shippable && (
                          <option value={cat.name}>{cat.name}</option>
                        )}
                      </>
                    )}
                    {type == "menu" && (
                      <>
                        {!cat.shippable && (
                          <option value={cat.name}>{cat.name}</option>
                        )}
                      </>
                    )}
                  </>
                ))}
              </select>
            </label>
          </div>
        </div>

        <label className="editItemLabel">
          Description:
          <textarea
            className="editItemInput"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={errors.description ? "* " + errors.description : " "}
          />
        </label>

        {type === "product" ? (
          <div className="priceNunitsAvailDiv">
            <label className="editItemLabel">
              Price:
              <input
                className="editItemInput"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={errors.price ? "* " + errors.price : " "}
              />
            </label>
            <label className="editItemLabel">
              Units Available:
              <input
                className="editItemInput"
                type="number"
                value={unitsAvailable}
                onChange={(e) => setUnitsAvailable(e.target.value)}
                placeholder={
                  errors.unitsAvailable ? "* " + errors.unitsAvailable : " "
                }
              />
            </label>
          </div>
        ) : (
          <div className="priceNimageDiv">
            <label className="editItemLabel">
              Price:
              <input
                className="editItemInput"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={errors.price ? "* " + errors.price : " "}
              />
            </label>
          </div>
        )}

        <label className="editItemLabel">
          Preview Image - leaving blank will keep the current image:
          <img
            className="previewImage"
            src={product.previewImg}
            alt="productPreviewImg"
          />
          <input
            className="editItemInput"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              setPreviewImage(e.target.files[0]);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
