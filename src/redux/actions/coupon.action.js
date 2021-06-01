import api from "../../apiService";
import { toast } from "react-toastify";

const getCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: "GETALLCOUPON_REQUEST_START", payload: null });
    const data = await api.get(`/coupons`);
    dispatch({
      type: "GETALLCOUPON_REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "GETALLCOUPON_REQUEST_FAIL", payload: error.message });
  }
};


const deleteCoupon = (id) => async (dispatch) => {
    try {
      dispatch({ type: "DELETECOUPON_REQUEST_START", payload: null });
      const data = await api.delete(`/coupons/${id}`);
      dispatch(getCoupons())
    //   console.log("this is toast",data.data.data.deleted.name)
      toast.error(`"${data.data.data.deleted.name}" is deleted`);
      dispatch({
        type: "DELETECOUPON_REQUEST_SUCCESS",
        payload:  data,
      });
    } catch (error) {
      dispatch({ type: "DELETECOUPON_REQUEST_FAIL", payload: error.message });
    }
};



const createCoupon = (coupon) => async (dispatch) => {
    try {
        console.log(coupon)
      dispatch({ type: "CREATECOUPN_REQUEST_START", payload: null });
      const data = await api.post(`/coupons`,coupon);
      dispatch(getCoupons())
      toast.success(`"${data.data.data.coupon.name}" is created`);
      dispatch({
        type: "CREATECOUPON_REQUEST_SUCCESS",
        payload: data ,
      });
    } catch (error) {
      dispatch({ type: "CREATECOUPON_REQUEST_FAIL", payload: error.message });
    }
};
  



export const couponActions = {
    getCoupons,
    deleteCoupon,
    createCoupon,
};
