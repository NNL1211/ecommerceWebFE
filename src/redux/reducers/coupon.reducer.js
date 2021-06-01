const initialState = {
    coupons: [],
    loading: false,
    couponadded: false,

  };


  const couponReducers = (state = initialState, action)=>{
    const { type, payload } = action;
    switch(type){
        case "GETALLCOUPON_REQUEST_START":
        case "DELETECOUPON_REQUEST_START":
        case "CREATECOUPN_REQUEST_START":
            state.loading = true;
            break;
        case "GETALLCOUPON_REQUEST_FAIL":
        case "DELETECOUPON_REQUEST_FAIL":
        case "CREATECOUPON_REQUEST_FAIL":
            state.error = payload;
            state.loading = false;
            break;
        case "GETALLCOUPON_REQUEST_SUCCESS":
            state.coupons = payload.data;
            state.loading = false;
        break;
        case "CREATECOUPON_REQUEST_SUCCESS":
            state.coupons = payload.data;
            state.loading = false;
        break;
        case "DELETECOUPON_REQUEST_SUCCESS":
            state.coupons = payload.data;
            state.loading = false;
        break;
        case "COUPON_APPLIED_SUCCESS":
            state.couponadded= true;
        break;
        case "COUPON_APPLIED_FAIL":
            state.couponadded= false;
        default:
        break;
    }

    return { ...state };
  }


  export default couponReducers;