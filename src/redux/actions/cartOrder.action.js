import api from "../../apiService";
import { routeActions } from "./route.action";
import { toast } from "react-toastify";

const createCart = (cart) => async (dispatch) => {
    try {
        console.log(cart)
      dispatch({ type: "CREATECART_REQUEST_START", payload: null });
      const data = await api.post(`/users/carts`,cart);
      dispatch(routeActions.redirect("/user/checkout"));
      // console.log("puish ????")
    //   toast.success(`"${data.data.data.category.name}}" is created`);
      dispatch(getCart())
      dispatch({
        type: "CREATECART_REQUEST_SUCCESS",
        payload: data ,
      });
    } catch (error) {
      dispatch({ type: "CREATECART_REQUEST_FAIL", payload: error.message });
    }
};
const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: "GETCART_REQUEST_START", payload: null });
    const data = await api.get(`/users/carts`);
    // console.log("puish ????")
  //   toast.success(`"${data.data.data.category.name}}" is created`);
    dispatch({
      type: "GETCART_REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "GETCART_REQUEST_FAIL", payload: error.message });
  }
};
const emptyCart = () => async (dispatch) => {
  try {
    dispatch({ type: "DELETECART_REQUEST_START", payload: null });
    const data = await api.delete(`/users/carts`);
    dispatch(getCart())
    // toast.success("Cart is emapty. Contniue shopping.");

    dispatch({
      type: "DELETECART_REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "DELETECART_REQUEST_FAIL", payload: error.message });
  }
};
const saveUserAddress = (address) => async (dispatch) => {
  try {
      console.log(address)
    dispatch({ type: "SAVEUSERADDRESS_REQUEST_START", payload: null });
    const data = await api.post(`/users/address`,address);
    toast.success("Address saved");
    dispatch({
      type: "SAVEUSERADDRESS_REQUEST_SUCCESS",
      payload: data ,
    });
  } catch (error) {
    dispatch({ type: "SAVEUSERADDRESS_REQUEST_FAIL", payload: error.message });
  }
};

const applyCoupon = (coupon) => async (dispatch) => {
  try {
     
    dispatch({ type: "APPLYCOUPON_REQUEST_START", payload: null });
    const data = await api.post(`/users/carts/coupon`,coupon);
    toast.success("Coupon applied");
    dispatch({type:"COUPON_APPLIED_SUCCESS",payload: true})
    dispatch({
      type: "APPLYCOUPON_REQUEST_SUCCESS",
      payload: data ,
    });
  } catch (error) {
    dispatch({ type: "APPLYCOUPON_REQUEST_FAIL", payload: error.message });
    dispatch({type:"COUPON_APPLIED_FAIL",payload: false})
  }
};

const createCashOrder = (order) => async (dispatch) => {
  try {
     
    dispatch({ type: "CREATEORDER_REQUEST_START", payload: null });
    const data = await api.post(`/users/cash-order`,order);
     // empty cart from backend
    dispatch(emptyCart())
    // empty redux cart
    dispatch({type: "ADD_TO_CART",payload: [],});
    // empty redux coupon
    dispatch({type:"COUPON_APPLIED_FAIL",payload: false})
     // empty redux COD
    dispatch({type: "COD",payload: false,});
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    toast.success("Order success");
    // redirect
    dispatch(routeActions.redirect("/user/history"));
    dispatch(getUserOrders());
    dispatch({
      type: "CREATEORDER_REQUEST_SUCCESS",
      payload: data ,
    });
  } catch (error) {
    dispatch({ type: "CREATEORDER_REQUEST_FAIL", payload: error.message });
  }
};

const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "GETUSERORDER_REQUEST_START", payload: null });
    const data = await api.get(`/users/orders`);
    // console.log("puish ????")
  //   toast.success(`"${data.data.data.category.name}}" is created`);
    dispatch({
      type: "GETUSERORDER_REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "GETUSERORDER_REQUEST_FAIL", payload: error.message });
  }
};

const createPaymentIntent = (coupon) => async (dispatch) => {
  try {
    dispatch({ type: "CREATEPAYMENT_REQUEST_START", payload: null });
    const data = await api.post(`/users/create-payment-intent`,coupon);
    // console.log("puish ????")
  //   toast.success(`"${data.data.data.category.name}}" is created`);
    dispatch({
      type: "CREATEPAYMENT_REQUEST_SUCCESS",
      payload:  data ,
    });
  } catch (error) {
    dispatch({ type: "CREATEPAYMENT_REQUEST_FAIL", payload: error.message });
  }
};

const createPaymentOrder = (stripeResponse) => async (dispatch) => {
  try {
     
    dispatch({ type: "CREATEORDER_REQUEST_START", payload: null });
    const data = await api.post(`/users/payment-order`,stripeResponse);
     // empty cart from backend
    dispatch(emptyCart())
    // empty redux cart
    dispatch({type: "ADD_TO_CART",payload: [],});
    // empty redux coupon
    dispatch({type:"COUPON_APPLIED_FAIL",payload: false})
     // empty redux COD
    dispatch({type: "COD",payload: false,});
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    toast.success("Order success");
    // redirect
    // dispatch(routeActions.redirect("/user/history"));
    dispatch(getUserOrders());
    dispatch({
      type: "CREATEORDER_REQUEST_SUCCESS",
      payload: data ,
    });
  } catch (error) {
    dispatch({ type: "CREATEORDER_REQUEST_FAIL", payload: error.message });
  }
};



export const cartOrderActions = {
    createCart,
    getCart,
    emptyCart,
    saveUserAddress,
    applyCoupon,
    createCashOrder,
    getUserOrders,
    createPaymentIntent,
    createPaymentOrder,
};
