import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/actions/user.action";
import { cartOrderActions } from "../redux/actions/cartOrder.action";
import { Link, useHistory } from "react-router-dom";
import ProductCardInCheckout from "../components/form/ProductCardInCheckout";
import { routeActions } from "../redux/actions/route.action";

const CartPage = () => {
    const history = useHistory();
    const redirectTo = useSelector((state) => state.route.redirectTo);
    const { cart } = useSelector((state) => ({...state}));
    // const currentUser = useSelector((state) => state.user.currentUser.data);
    const isAuth = useSelector((state) => state.auth.isAuth);
    console.log("product added is here",cart)
    const dispatch = useDispatch();
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
          return currentValue + nextValue.count * nextValue.price;
        }, 0);
      };
    useEffect(()=>{
        if (isAuth) {
            dispatch(userActions.getUser());
          }
    },[])
    useEffect(()=>{
      if (redirectTo) {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
        }
  },[redirectTo])
    const saveOrderToDb = () => {
      // console.log("cart", JSON.stringify(cart, null, 4));
      dispatch(cartOrderActions.createCart(cart));
    };
    const saveCashOrderToDb = () => {
      // console.log("cart", JSON.stringify(cart, null, 4));
      dispatch(cartOrderActions.createCart(cart));
      dispatch({
        type: "COD",
        payload: true,
      });
    };
    return (
    <div className="container-fluid pt-2">
        <div className="row">
          <div className="col-md-8">
            <h4>Cart / {cart.length} Product</h4>
  
            {!cart.length ? (
              <p>
                No products in cart. <Link to="/shop">Continue Shopping.</Link>
              </p>
            ) : (
            <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Size</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
      
            {cart.map((p) => (
              <ProductCardInCheckout key={p._id} p={p} />
            ))}
          </table>
            )}
            
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = ${c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            {isAuth ? (
            <>
            <button
              onClick={saveOrderToDb}
              className="btn btn-sm btn-primary mt-2 p-2"
              disabled={!cart.length}
              >
              Proceed to Checkout
            </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-info mt-2 p-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>  
            
          ) : (<Link to={{
                  pathname: "/login",
                //   state: { from: "cart" },
                }}
              >
            <button className="btn btn-sm btn-primary mt-2 p-2">
                Login to Checkout
            </button>
            </Link>
          )}
          </div>
        </div>
    </div>
    )
}

export default CartPage
