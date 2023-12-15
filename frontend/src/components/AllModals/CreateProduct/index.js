import React, { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";

import { createProduct } from "../../../store/products";
import { getCategories } from "../../../store/categories";

import "./CreateProduct.css";

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
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  useEffect(async () => {
    const data = await dispatch(getCategories()).then(() => setIsLoaded(true));
    if (data) {
      console.log(data);
    }
  }, [dispatch]);

  const submitCreateProductForm = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("preview", previewImage);
    if (type === "menu") {
      formData.append("units_available", 1);
    } else {
      formData.append("units_available", unitsAvailable);
    }

    const data = await dispatch(createProduct(formData));
    if (data) {
      console.log(data);
      setErrors(data.errors);
    } else {
      setErrors({});
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!name) {
      errors["name"] = `${
        type == "menu" ? "Menu Item" : "Product"
      } name is required`;
    }
    if (!category) {
      errors["category"] = "Category is required";
    }
    if (!description) {
      errors["description"] = `${
        type == "menu" ? "Menu Item" : "Product"
      } description is required`;
    }
    if (!price) {
      errors["price"] = `Required`;
    }
    if (type == "product" && !unitsAvailable) {
      errors["unitsAvailable"] = "Required";
    }
    if (!previewImage) {
      errors["previewImage"] = "Preview image is required";
    }
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      submitCreateProductForm();
    }
  };

  return isLoaded ? (
    <div className="createItemModalContainer">
      <h1 className="createItemTitle">
        Create New {type == "product" ? "Product" : "Menu Item"}
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} className="createItemForm">
        <div className="nameNcategoryDiv">
          <label className="createItemLabel">
            Name:
            <input
              className="createItemInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={errors.name ? "* " + errors.name : " "}
            />
          </label>
          <div className="categorySelectorContainer">
            <label className="createItemLabel">
              Category:
              <select
                className="createItemSelect"
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

        <label className="createItemLabel">
          Description:
          <textarea
            className="createItemInput"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={errors.description ? "* " + errors.description : " "}
          />
        </label>

        {type === "product" ? (
          <div className="priceNunitsAvailDiv">
            <label className="createItemLabel">
              Price:
              <input
                className="createItemInput"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={errors.price ? "* " + errors.price : " "}
              />
            </label>
            <label className="createItemLabel">
              Units Available:
              <input
                className="createItemInput"
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
            <label className="createItemLabel">
              Price:
              <input
                className="createItemInput"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={errors.price ? "* " + errors.price : " "}
              />
            </label>
          </div>
        )}
        {/* {type === "product" && ( */}
        <label className="createItemLabel">
          Preview Image:
          <input
            className="createItemInput"
            // id="previewImage"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              setPreviewImage(e.target.files[0]);
            }}
          />
          <span className="errors">
            {errors.previewImage ? "* " + errors.previewImage : " "}
          </span>
        </label>
        {/* )} */}

        <button type="submit" className="createItemButton">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
