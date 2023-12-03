const GET_CATEGORIES = "session/GET_CATEGORIES";
const GET_CAT_PRODUCTS = "session/GET_PRODUCTS";
const ALL_PRODUCTS = "session/ALL_PRODUCTS";
const GET_PRODUCT = "session/GET_PRODUCT";

const getAllCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

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

export const getCategories = () => async (dispatch) => {
  const res = await fetch("/api/categories/");
  const data = await res.json();
  if (data.errors) {
    return;
  }
  if (res.ok) {
    dispatch(getAllCategories(data.Categories));
  }
};

export const getProdsByCat = (catName) => async (dispatch) => {
  const res = await fetch(`/api/categories/${catName}`);
  const data = await res.json();
  if (res.ok) {
    if (data.errors) {
      return data.errors;
    }
    dispatch(getByCategory(data.Category_Products));
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

export const editProduct = (productId) => async (dispatch) => {
  // ! write edit product fetch
};

export const deleteProduct = (productId) => async (dispatch) => {
  // ! write delete product fetch
};

export default function reducer(state = {}, action) {
  let new_state = {};
  switch (action.type) {
    case GET_CATEGORIES:
      new_state = {};
      for (let category of action.payload) {
        new_state[category.id] = category;
      }
      return new_state;
    case GET_CAT_PRODUCTS:
      new_state = {};
      for (let product of action.payload) {
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
