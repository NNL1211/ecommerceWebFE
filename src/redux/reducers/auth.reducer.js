const initialState = {
    isAuth: localStorage.getItem("accessToken"),
    loading: false,
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "VERIFY_EMAIL_REQUEST":
      case "LOGINGOOGLE_REQUEST_START":
      case "LOGINFB_REQUEST_START":
      case "LOGIN_REQUEST_START":
      case "REGISTER_REQUEST_START":
      case "LOGOUT_REQUEST_START":
        state.loading = true;
        break;
      case "VERIFY_EMAIL_FAILURE":
      case "LOGINGOOGLE_REQUEST_FAIL":
      case "LOGINFB_REQUEST_FAIL":
      case "LOGIN_REQUEST_FAIL":
      case "REGISTER_REQUEST_FAIL":
      case "LOGOUT_REQUEST_FAIL":
        state.loading = false;
        // set the error message
        break;
      case "LOGIN_REQUEST_SUCCESS":
        state.loading = false;
        state.isAuth = payload;
        break;
      case "REGISTER_REQUEST_SUCCESS":
        state.loading = false;
        console.log("success!!!");
        break;
      case "LOGOUT_REQUEST_SUCCESS":
        state.isAuth = "";
        state.loading = false;
        break;
      case "LOGINFB_REQUEST_SUCCESS":
        state.loading = false;
        state.isAuth = payload;
        break;
      case "LOGINGOOGLE_REQUEST_SUCCESS":
        state.loading = false;
        state.isAuth = payload;
        break;
      case "VERIFY_EMAIL_SUCCESS": 
        state.loading = false;
        state.isAuth = payload;
        break;
      default:
        break;
    }
    return { ...state };
  };
  
  export default authReducer;
  