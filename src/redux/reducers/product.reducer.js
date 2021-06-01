const initialState = {
    products: [],
    filterProducts: [],
    relatedProducts: [],
    singleProduct:[],
    loading: false,
    currentPage: 1,
  };


  const productReducers = (state = initialState, action)=>{
    const { type, payload } = action;
    switch(type){
        case "PRODUCT_REQUEST_START":
        case "SINGLEPRODUCT_REQUEST_START":
        case "CREATEPRODUCT_REQUEST_START":
        case "DELETEPRODUCT_REQUEST_START":
        case "UPDATEPRODUCT_REQUEST_START":
        case "FILTERPRODUCT_REQUEST_START":
        case "RELATEDPRODUCT_REQUEST_START":
            state.loading = true;
            break;
        case "PRODUCT_REQUEST_FAIL":
        case "SINGLEPRODUCT__REQUEST_FAIL":
        case "CREATEPRODUCT_REQUEST_FAIL":
        case "DELETEPRODUCT_REQUEST_FAIL":
        case "UPDATEPRODUCT_REQUEST_FAIL":
        case "FILTERPRODUCT_REQUEST_FAIL":
        case "RELATEDPRODUCT_REQUEST_FAIL":
            state.error = payload;
            state.loading = false;
            break;
        case "PRODUCT_REQUEST_SUCCESS":
            state.products = payload.data;
            state.currentPage = payload.currentPage;
            state.loading = false;
        break;
        case "FILTERPRODUCT_REQUEST_SUCCESS":
            state.filterProducts = payload.data;
            state.currentPage = payload.currentPage;
            state.loading = false;
        break;
        case "RELATEDPRODUCT_REQUEST_SUCCESS":
            state.relatedProducts = payload.data;
            state.loading = false;
        break;
        case "SINGLEPRODUCT__REQUEST_SUCCESS":
            state.singleProduct = payload.data;
            // state.currentPage = payload.currentPage;
            state.loading = false;
        break;
        case "CREATEPRODUCT_REQUEST_SUCCESS":
            state.singleProduct = payload.data;
            // state.currentPage = payload.currentPage;
            state.loading = false;
        break;
        case "DELETEPRODUCT_REQUEST_SUCCESS":
            state.loading = false;
        break;
        case "UPDATEPRODUCT_REQUEST_SUCCESS":
            state.loading = false;
        break;
        default:
        break;
    }

    return { ...state };
  }


  export default productReducers;