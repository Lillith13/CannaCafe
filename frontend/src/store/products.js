const GET_CAT_PRODUCTS = "session/GET_PRODUCTS";
const ALL_PRODUCTS = "session/ALL_PRODUCTS";
const GET_PRODUCT = "session/GET_PRODUCT";

const getByCategory = (products) => ({
  type: GET_CAT_PRODUCTS,
  payload: products,
});

const getAllProducts = (products) => ({
  type: ALL_PRODUCTS,
  payload: products,
});

const getAProduct = (product) => ({
  type: GET_PRODUCT,
  payload: product,
});

export const getProdsByCat = (catName) => async (dispatch) => {
  const res = await fetch(`/api/categories/${catName}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getByCategory(data));
    return;
  } else {
    return data.errors;
  }
};

export const loadAllProducts = (path) => async (dispatch) => {
  const res = await fetch(`/api/products/${path}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      console.log(data.errors);
      return data.errors;
    }
    dispatch(getAllProducts(data.Products));
    return;
  } else {
    console.log(data);
    return data;
  }
};

export const loadAllAll = () => async (dispatch) => {
  const res = await fetch("/api/products/");
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getAllProducts(data.Products));
  } else {
    console.log(data);
    return data;
  }
};

export const loadProduct = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getAProduct(data));
    return;
  } else {
    console.log("from else in store => ", data);
  }
};

export const createProduct = (formData) => async (dispatch) => {
  // console.log(formData);
  const res = await fetch("/api/products/", {
    method: "POST",
    body: formData,
  });
  // console.log(res);
  const data = await res.json();
  if (!res.ok) {
    if (data.errors) {
      return data.errors;
    } else {
      return data;
    }
  } else {
    return data.id;
  }
};

export const editProduct = (formData) => async (dispatch) => {
  const res = await fetch("/api/products/", {
    method: "PUT",
    body: formData,
  });
  const data = await res.json();
};

export const deleteProduct =
  (productId, type, category) => async (dispatch) => {
    const res = await fetch("/api/products/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: productId,
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.errors) {
        return data.errors;
      } else {
        return data;
      }
    } else {
      if (category) {
        // * load products by category
        dispatch(getProdsByCat(category));
        return null;
      } else {
        // * decide loadALLAll or by type
        switch (type) {
          case "menu":
            dispatch(loadAllProducts(type));
            return null;
          case "product":
            dispatch(loadAllProducts(type));
            return null;
          default:
            dispatch(loadAllAll());
            return null;
        }
      }
    }
  };

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_CAT_PRODUCTS:
      new_state = {};
      for (let product of action.payload.Category_Products) {
        new_state[product.id] = product;
      }
      return new_state;
    case GET_PRODUCT:
      new_state = action.payload;
      return new_state;
    case ALL_PRODUCTS:
      new_state = {};
      for (let product of action.payload) {
        new_state[product.id] = product;
      }
      return new_state;
    default:
      return state;
  }
}
