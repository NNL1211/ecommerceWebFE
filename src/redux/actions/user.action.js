import api from "../../apiService";
import { routeActions } from "./route.action";
import { toast } from "react-toastify";
const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "GETUSER_REQUEST_START", payload: null });
    const data = await api.get("/users/me");
    dispatch({ type: "GETUSER_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "GETUSER_REQUEST_FAIL", payload: error.message });
  }
};

const editUser = ({ name, avatarUrl }) => async (dispatch) => {
  try {
    dispatch({ type: "EDITUSER_REQUEST_START", payload: null });
    const data = await api.put("/users", { name, avatarUrl });
    dispatch({ type: "EDITUSER_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "EDITUSER_REQUEST_FAIL", payload: error.message });
  }
};

const getAllUser = (currentPage) => async (dispatch) => {
  try {
    dispatch({ type: "GETALLUSER_REQUEST_START", payload: null });
    const data = await api.get(`/users?page=${currentPage}&limit=10`);
    dispatch({
      type: "GETALLUSER_REQUEST_SUCCESS",
      payload: { data: data, currentPage: currentPage },
    });
  } catch (error) {
    dispatch({ type: "GETALLUSER_REQUEST_FAIL", payload: error.message });
  }
};
const getWishList = () => async (dispatch) => {
  try {
    dispatch({ type: "GETWISHLIST_REQUEST_START", payload: null });
    const data = await api.get("/users/wishlist");
    dispatch({ type: "GETWISHLIST_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "GETWISHLIST_REQUEST_FAIL", payload: error.message });
  }
};

const removeWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PUTWISHLIST_REQUEST_START", payload: null });
    const data = await api.put(`/users/wishlist/${productId}`);
    dispatch(getWishList())
    dispatch({ type: "PUTWISHLIST_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "PUTWISHLIST_REQUEST_FAIL", payload: error.message });
  }
};

const addToWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "POSTWISHLIST_REQUEST_START", payload: null });
    const data = await api.post(`/users/wishlist/`,productId);
    dispatch(getWishList())
    dispatch(routeActions.redirect("/user/wishlist"));
    toast.success("Added to wishlist");
    dispatch({ type: "POSTWISHLIST_REQUEST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.message)
    dispatch({ type: "POSTWISHLIST_REQUEST_FAIL", payload: error.message });
  }
};
export const userActions = { 
  getUser,
  editUser, 
  getAllUser,
  getWishList,
  removeWishlist,
  addToWishlist };
