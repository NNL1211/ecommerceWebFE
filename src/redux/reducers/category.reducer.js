const initialState = {
    categories: [],
    singleCategory:[],
    error: "",
    loading: false,

  };
  
  const categoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "GETALLCATEGORY_REQUEST_START":
      case "GETCATEGORY_REQUEST_START":
      case "DELETECATEGORY_REQUEST_START":
      case "UPDATECATEGORY_REQUEST_START":
      case "CREATECATEGORY_REQUEST_START":
        state.loading = true;
        break;
      case "GETALLCATEGORY_REQUEST_FAIL":
      case "GETCATEGORY_REQUEST_FAIL":
      case "DELETECATEGORY_REQUEST_FAIL":
      case "UPDATECATEGORY_REQUEST_FAIL":
      case "CREATECATEGORY_REQUEST_FAIL":
        state.error = payload;
        state.loading = false;
        break;
      case "GETALLCATEGORY_REQUEST_SUCCESS":
        state.categories = payload.data;
        state.loading = false;
        break;
      case "GETCATEGORY_REQUEST_SUCCESS":
        state.singleCategory = payload.data;
        state.loading = false;
        break;
      case "DELETECATEGORY_REQUEST_SUCCESS":
        state.loading = false;
        break;
      case "UPDATECATEGORY_REQUEST_SUCCESS":
        state.loading = false;
        break;
      case "CREATECATEGORY_REQUEST_SUCCESS":
        state.loading = false;
        break;
      default:
        break;
    }
  
    return { ...state };
  };
  
  export default categoryReducer;
  