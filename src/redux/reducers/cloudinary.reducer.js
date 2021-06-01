const initialState = {
    images: [],
    error: "",
    loading: false,

  };
  
  const cloudinaryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "UPLOADIMAGES_REQUEST_START":
      case "REMOVEIMAGES_REQUEST_START":
        state.loading = true;
        break;
      case "UPLOADIMAGES_REQUEST_FAIL":
      case "REMOVEIMAGES_REQUEST_FAIL":
        state.error = payload;
        state.loading = false;
        break;
      case "UPLOADIMAGES_REQUEST_SUCCESS":
          state.images = payload.data;
          state.loading = false;
     case "REMOVEIMAGES_REQUEST_SUCCESS":
        state.loading = false;
        break;
      default:
        break;
    }
  
    return { ...state };
  };
  
  export default cloudinaryReducer;
  