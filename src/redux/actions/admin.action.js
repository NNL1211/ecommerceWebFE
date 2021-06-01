import api from "../../apiService";
import { routeActions } from "./route.action";
import { toast } from "react-toastify";


const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "GETORDER_REQUEST_START", payload: null });
    const data = await api.get(`/admin/orders`);
    // console.log("puish ????")
  //   toast.success(`"${data.data.data.category.name}}" is created`);
    dispatch({
      type: "GETORDER__REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "GETORDER__REQUEST_FAIL", payload: error.message });
  }
};

const ordersStatus = (status) => async (dispatch) => {
    try {
      dispatch({ type: "ORDERSTATUS_REQUEST_START", payload: null });
      const data = await api.put(`/admin/orders-status`,status);
      // console.log("puish ????")
    //   toast.success(`"${data.data.data.category.name}}" is created`);
    dispatch(getAllOrders());
    toast.success("Status updated");
      dispatch({
        type: "ORDERSTATUS_REQUEST_SUCCESS",
        payload:  data ,
      });
    } catch (error) {
      dispatch({ type: "ORDERSTATUS_REQUEST_FAIL", payload: error.message });
    }
  };

  



export const adminActions = {
    getAllOrders,
    ordersStatus,
};
