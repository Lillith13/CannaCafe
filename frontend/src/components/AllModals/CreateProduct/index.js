import React, { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import { createProduct } from "../../../store/products";
import { getCategories } from "../../../store/categories";

export default function CreateProduct({ type }) {
  const dispatch = useDispatch();
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

  useEffect(async () => {
    const data = await dispatch(getCategories()).then(() => setIsLoaded(true));
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("units_available", unitsAvailable);
    formData.append("preview", previewImage);

    const data = await dispatch(createProduct(formData));
    if (data) {
      console.log(data);
    } else {
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
        <label>
          Description:
          <input
            type="textarea"
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
          Preview Image:
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              setPreviewImage(e.target.files[0]);
            }}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
