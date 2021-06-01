import api from "../../apiService";
import { toast } from "react-toastify";
const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: "GETALLCATEGORY_REQUEST_START", payload: null });
    const data = await api.get(`/category`);
    dispatch({
      type: "GETALLCATEGORY_REQUEST_SUCCESS",
      payload: { data: data },
    });
  } catch (error) {
    dispatch({ type: "GETALLCATEGORY_REQUEST_FAIL", payload: error.message });
  }
};

const getSingleCategory = (slug) => async (dispatch) => {
    try {
      dispatch({ type: "GETCATEGORY_REQUEST_START", payload: null });
      const data = await api.get(`/category/${slug}`);
      dispatch(getCategory())
      dispatch({
        type: "GETCATEGORY_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "GETCATEGORY_REQUEST_FAIL", payload: error.message });
    }
  };

const deleteCategory = (slug) => async (dispatch) => {
    try {
      dispatch({ type: "DELETECATEGORY_REQUEST_START", payload: null });
      const data = await api.delete(`/category/${slug}`);
      dispatch(getCategory())
      console.log("this is toast",data.data.data.deleted.name)
      toast.error(`"${data.data.data.deleted.name}" is deleted`);
      dispatch({
        type: "DELETECATEGORY_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "DELETECATEGORY_REQUEST_FAIL", payload: error.message });
    }
};

const updateCategory = (slug,name) => async (dispatch) => {
    try {
      dispatch({ type: "UPDATECATEGORY_REQUEST_START", payload: null });
      const data = await api.put(`/category/${slug}`,name);
      dispatch(getCategory())
      // console.log("this is toast",data)
      toast.success(`"${data.data.data.updated.name}}" is updated`);
      dispatch({
        type: "UPDATECATEGORY_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "UPDATECATEGORY_REQUEST_FAIL", payload: error.message });
    }
};

const createCategory = (name) => async (dispatch) => {
    try {
        console.log(name)
      dispatch({ type: "CREATECATEGORY_REQUEST_START", payload: null });
      const data = await api.post(`/category`,name);
      dispatch(getCategory())
      toast.success(`"${data.data.data.category.name}}" is created`);
      dispatch({
        type: "CREATECATEGORY_REQUEST_SUCCESS",
        payload: { data: data },
      });
    } catch (error) {
      dispatch({ type: "CREATECATEGORY_REQUEST_FAIL", payload: error.message });
    }
};
  



export const categoryActions = {
    getCategory,
    getSingleCategory,
    deleteCategory,
    updateCategory,
    createCategory,
};
