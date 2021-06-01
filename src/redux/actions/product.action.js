import api from "../../apiService";
import { toast } from "react-toastify";

const getAllProducts = (currentPage) => async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_REQUEST_START" });
      const data = await api.get(`/products?page=${currentPage}&limit=9`);
      dispatch({
        type: "PRODUCT_REQUEST_SUCCESS",
        payload: { data: data, currentPage: currentPage },
      });
    } catch (error) {
      dispatch({ type: "PRODUCT_REQUEST_FAIL", payload: error.message });
    }
  };
const createProduct = (name) => async (dispatch) => {
    try {
        console.log(name)
      dispatch({ type: "CREATEPRODUCT_REQUEST_START", payload: null });
      const data = await api.post(`/products`,name);
      dispatch(getAllProducts())
      toast.success(`${data.data.data.product.title} is created`);
      dispatch({
        type: "CREATEPRODUCT_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "CREATEPRODUCT_REQUEST_FAIL", payload: error.message });
    }
};
const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETEPRODUCT_REQUEST_START", payload: null });
    const data = await api.delete(`/products/${id}`);
    dispatch(getAllProducts())
    toast.error(`${data.data.data.deleted.title} is deleted`);
    dispatch({ type: "DELETEPRODUCT_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETEPRODUCT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};
const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLEPRODUCT_REQUEST_START" });
    const data = await api.get(`/products/${id}`);
    dispatch({ type: "SINGLEPRODUCT__REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SINGLEPRODUCT__REQUEST_FAIL", payload: error.message });
  }
};

const updateProduct = (values,id) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATEPRODUCT_REQUEST_START", payload: null });
    const data = await api.put(`/products/${id}`,values);
    dispatch(getAllProducts())
    dispatch(getSingleProduct(id))
    toast.success(`${data.data.data.product.title} is updated`);
    dispatch({ type: "UPDATEPRODUCT_REQUEST_SUCCESS", payload: null });
  } catch (error) {
    dispatch({ type: "UPDATEPRODUCT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};

const fetchProductsByFilter = (arg,currentPage) => async (dispatch) => {
  try {
    dispatch({ type: "FILTERPRODUCT_REQUEST_START", payload: null });
    const data = await api.post(`/products/search/filters?page=${currentPage}&limit=9`,arg);
    dispatch({ 
      type: "FILTERPRODUCT_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage }, });
  } catch (error) {
    dispatch({ type: "FILTERPRODUCT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};


const getRelated = (id) => async (dispatch) => {
  try {
    dispatch({ type: "RELATEDPRODUCT_REQUEST_START", payload: null });
    const data = await api.get(`/products/related/${id}`);
    // dispatch(getAllProducts())
    // dispatch(getSingleProduct(id))
    // toast.success(`${data.data.data.product.title} is updated`);
    dispatch({ type: "RELATEDPRODUCT_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "RELATEDPRODUCT_REQUEST_FAIL", payload: null });
    console.log(error.message);
  }
};


  export const ProductActions ={
    getAllProducts,
    createProduct,
    deleteProduct,
    getSingleProduct,
    updateProduct,
    fetchProductsByFilter,
    getRelated,
  }