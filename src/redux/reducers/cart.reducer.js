let initialState = [];


// load cart items from local storage
if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      initialState = JSON.parse(localStorage.getItem("cart"));
    } else {
      initialState = [];
    }
  }
  const cartReducers = (state = initialState, action)=>{
    const { type, payload } = action;
    switch(type){
        case "ADD_TO_CART":
            state = payload;
        break;
        default:
        break;
    }

    return state;
  }


  export default cartReducers;