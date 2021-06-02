import React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {cartOrderActions} from "../redux/actions/cartOrder.action"
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router";
import { routeActions } from "../redux/actions/route.action";
import Navbar2 from '../components/Navbar2'
const CheckoutPage = () => {
const history = useHistory()
const redirectTo = useSelector((state) => state.route.redirectTo);
// const isAuth = useSelector((state) => state.auth.isAuth);
const [products, setProducts] = useState([]);
const [total, setTotal] = useState(0);
const [address, setAddress] = useState("");
const [addressSaved, setAddressSaved] = useState(false);
const [coupon, setCoupon] = useState("");
const values = useSelector((state)=>state.cartOrder.cartOrder.data)
const couponApplied = useSelector((state)=>state.cartOrder.totalDiscount.data)
const orderdata = useSelector((state)=>state.cartOrder.order.data)
console.log("this is order data",orderdata)
const {COD } = useSelector((state) => ({ ...state }));
const couponTrueOrFalse = useSelector((state) => state.coupon.couponadded);
console.log("this is discount", couponApplied)
  // discount price
const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
console.log("this is data getcart",values)
console.log("this is data SETproduct",products)
const dispatch = useDispatch();

const handleAddressChange = (e)=>{
    // console.log(e.target.value)
    setAddress(e.target.value)
    
}

const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    dispatch(cartOrderActions.emptyCart())
    dispatch({type:"COUPON_APPLIED_FAIL",payload: false})
  };
const saveAddressToDb = (e) => {
    e.preventDefault();
    dispatch(cartOrderActions.saveUserAddress({address}))
    setAddressSaved(true);
    // e.target.reset()
  };

const handleCouponChange = (e)=>{
  //
  setCoupon(e.target.value)
}

const applyDiscountCoupon = (e)=>{
  e.preventDefault();
  // console.log("send coupon to backend", coupon);
  dispatch(cartOrderActions.applyCoupon({coupon}))
  e.target.reset()
}

const submitCashOrder = () => {
  dispatch(cartOrderActions.createCashOrder({COD,couponTrueOrFalse}))
  // empty cart form redux, local Storage, reset coupon, reset COD, redirect

};
useEffect(()=>{
  if (redirectTo) {
    setTimeout(() => {
      history.push(redirectTo);
    }, 1000);
    dispatch(routeActions.removeRedirectTo());
    }
},[redirectTo])

useEffect(() => {
    dispatch(cartOrderActions.getCart())
  },[]);

useEffect(() => {
        if(values && values.cart){
            setProducts( values.cart.products);
            setTotal(values.cart.cartTotal);
        }else{
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon("")
        }

  },[values]);

useEffect(() => {
    if(couponApplied && couponApplied.totalAfterDiscount){
      setTotalAfterDiscount(couponApplied.totalAfterDiscount);
    }

},[couponApplied]);

// useEffect(() => {
//   if(orderdata && orderdata.newOrder){
//      if (typeof window !== "undefined") localStorage.removeItem("cart");
//   }

// },[orderdata]);

  return (
    <>
    <Navbar2/>
    <div className="container pt-2 user--page">
    <div className="row">
    <div className="col-md-6">
      <h4>Delivery Address</h4>
      <br />
      <form onSubmit={saveAddressToDb}>
        <div className="form-group">
        <input 
        type="text" 
        name="address"  
        className="form-control" 
        placeholder="Apartment,floor"
        required
        onChange={handleAddressChange}/>
        </div>
        <button className="btn btn-primary mt-2" type="submit" >Save</button>
        </form>

      <hr />
      <h4>Got Coupon?</h4>
      <br />
      <form onSubmit={applyDiscountCoupon}>
        <div className="form-group">
        <input 
        type="text" 
        name="coupon"  
        className="form-control" 
        placeholder="Your Coupon"
        required
        onChange={handleCouponChange}/>
        </div>
        <button className="btn btn-primary mt-2" type="submit" >Apply</button>
        </form>
    </div>

    <div className="col-md-6">
      <h4>Order Summary</h4>
      <hr />
      <p>Products {products.length}</p>
      <hr />
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.size}) x {p.count} ={" "}
            {p.product.price * p.count}
          </p>
        </div>
      ))}

      <hr />
      <p>Cart Total: {total}</p>
      {totalAfterDiscount > 0?(
          <div className="bg-info p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </div>
        ):null}
      <div className="row">
        <div className="col-md-6">
        {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={submitCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/user/payment")}
              >
                Place Order
              </button>
            )}
        </div>

        <div className="col-md-6">
          <button
            disabled={!products.length}
            onClick={emptyCart}
            className="btn btn-primary"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
  );
};

export default CheckoutPage;
