import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./EditProduct.css";

import { useModal } from "../../../context/Modal";
import { editProduct } from "../../../store/products";
import { getCategories } from "../../../store/categories";

export default function EditProduct({ type, product }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const categories = useSelector((state) => state.categories);
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

  const handleSubmit = async (e) => {
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

    const data = await dispatch(editProduct(formData));
    if (data) {
      console.log(data);
      setErrors(data.errors);
    } else {
      if (type == "product") {
        history.push("/products");
      } else {
        history.push("/menu");
      }
      closeModal();
    }
  };

  return isLoaded ? (
    <div>
      <h1>Create New {type == "product" ? "Product" : "Menu Item"}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            defaultValue={product.category.name}
            onChange={(e) => setCategory(e.target.value)}
          >
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
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Units Available:
          <input
            type="number"
            value={unitsAvailable}
            onChange={(e) => setUnitsAvailable(e.target.value)}
            required
          />
        </label>
        <label>
          Preview Image - leaving blank will keep the current image:
          <img src={product.previewImg} alt="productPreviewImg" />
          <input
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
