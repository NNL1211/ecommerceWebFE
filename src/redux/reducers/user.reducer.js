const initialState = {
    currentUser: [],
    loading: false,
    error: "",
    currentPage: 1,
    allUser: [],
    wishlist:[],
  };
  
  const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "GETUSER_REQUEST_START":
      case "EDITUSER_REQUEST_START":
      case "GETALLUSER_REQUEST_START":
      case "GETWISHLIST_REQUEST_START":
      case "PUTWISHLIST_REQUEST_START":
      case "POSTWISHLIST_REQUEST_START":
        state.loading = true;
        break;
      case "GETUSER_REQUEST_FAIL":
      case "EDITUSER_REQUEST_FAIL":
      case "GETALLUSER_REQUEST_FAIL":
      case "GETWISHLIST_REQUEST_FAIL":
      case "PUTWISHLIST_REQUEST_FAIL":
      case "POSTWISHLIST_REQUEST_FAIL":
        state.error = payload;
        state.loading = false;
        break;
      case "GETUSER_REQUEST_SUCCESS":
        state.currentUser = payload;
        state.loading = false;
        break;
      case "EDITUSER_REQUEST_SUCCESS":
        state.currentUser = payload;
        state.loading = false;
        break;
      case "GETALLUSER_REQUEST_SUCCESS":
        state.allUser = payload.data;
        state.currentPage = payload.currentPage;
        state.loading = false;
        break;
      case "GETWISHLIST_REQUEST_SUCCESS":
          state.wishlist = payload.data;
          state.loading = false;
        break;
      case "PUTWISHLIST_REQUEST_SUCCESS":
          state.loading = false;
        break;
      case "POSTWISHLIST_REQUEST_SUCCESS":
          state.wishlist = payload.data;
          state.loading = false;
        break;
      default:
        break;
    }
    return { ...state };
  };
  
  export default userReducer;
  