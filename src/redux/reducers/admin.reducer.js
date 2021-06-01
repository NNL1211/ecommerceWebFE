const initialState = {
    order:[],
    loading: false,
  };


  const adminReducers = (state = initialState, action)=>{
    const { type, payload } = action;
    switch(type){
        case "GETORDER_REQUEST_START":
        case "ORDERSTATUS_REQUEST_START":
            state.loading = true;
            break;
        case "GETORDER__REQUEST_FAIL":
        case "ORDERSTATUS_REQUEST_FAIL":
            state.error = payload;
            state.loading = false;
            break;
        case "GETORDER__REQUEST_SUCCESS":
            state.order = payload.data;
            state.loading = false;
        break;
        case "ORDERSTATUS_REQUEST_SUCCESS":
            state.order = payload.data;
            state.loading = false;
        break;

        default:
        break;
    }

    return { ...state };
  }


  export default adminReducers;