const initialState = {
    cartOrder: [],
    totalDiscount:[],
    order:[],
    loading: false,
    paymentIntent:[],
  };


  const cartOrderReducers = (state = initialState, action)=>{
    const { type, payload } = action;
    switch(type){
        case "CREATECART_REQUEST_START":
        case "GETCART_REQUEST_START":
        case "DELETECART_REQUEST_START":
        case "SAVEUSERADDRESS_REQUEST_START":
        case "APPLYCOUPON_REQUEST_START":
        case "CREATEORDER_REQUEST_START":
        case "GETUSERORDER_REQUEST_START":
        case "CREATEPAYMENT_REQUEST_START":
            state.loading = true;
            break;
        case "CREATECART_REQUEST_FAIL":
        case "GETCART_REQUEST_FAIL":
        case "DELETECART_REQUEST_FAIL":
        case "SAVEUSERADDRESS_REQUEST_FAIL":
        case "APPLYCOUPON_REQUEST_FAIL":
        case "CREATEORDER_REQUEST_FAIL":
        case "GETUSERORDER_REQUEST_FAIL":
        case "CREATEPAYMENT_REQUEST_FAIL":
            state.error = payload;
            state.loading = false;
            break;
        case "CREATECART_REQUEST_SUCCESS":
            state.cartOrder = payload.data;
            state.loading = false;
        break;
        case "GETCART_REQUEST_SUCCESS":
            state.cartOrder = payload.data;
            state.loading = false;
        break;
        case "DELETECART_REQUEST_SUCCESS":
            state.cartOrder = payload.data;
            state.loading = false;
        break;
        case "SAVEUSERADDRESS_REQUEST_SUCCESS":
            state.loading = false;
        break;
        case "APPLYCOUPON_REQUEST_SUCCESS":
            state.totalDiscount=payload.data
            state.loading = false;
        break;
        case "CREATEORDER_REQUEST_SUCCESS":
            state.order=payload.data
            state.loading = false;
        break;
        case "GETUSERORDER_REQUEST_SUCCESS":
            state.order=payload.data
            state.loading = false;
        break;
        case "CREATEPAYMENT_REQUEST_SUCCESS":
            state.paymentIntent=payload.data
            state.loading = false;
        break;

        default:
        break;
    }

    return { ...state };
  }


  export default cartOrderReducers;