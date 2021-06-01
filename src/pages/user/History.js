import React,{useEffect,useState} from "react";
import UserSideBar from "../../components/UserSideBar";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {cartOrderActions} from "../../redux/actions/cartOrder.action"
// import { useHistory } from "react-router";
// import { routeActions } from "../../redux/actions/route.action";
import ShowPaymentInfo from "../../components/form/ShowPaymentInfo";
import Navbar2 from "../../components/Navbar2";
const History = () => {
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([]);
    const ordersdata = useSelector((state)=> state.cartOrder.order.data)
    console.log(ordersdata)
    useEffect(() => {
      dispatch(cartOrderActions.getUserOrders())
    }, []);
    useEffect(() => {
      if(ordersdata && ordersdata.userOrders){
        setOrders(ordersdata.userOrders)
      }
    }, [ordersdata]);
    
//-------Show--------------->

    const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          {/* <div className="col">{showDownloadLink(order)}</div> */}
        </div>
      </div>
    ));

    const showOrderInTable = (order) => (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Size</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
  
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.size}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
          <>
          <Navbar2/>
          <div className="container-fluid user--page">
          <div className="row">
            <div className="col-md-2 pt-2">
              <UserSideBar />
            </div>
            <div className="col-md-10  pt-2 text-center ">
              <h4>
                {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
              </h4>
              {showEachOrders()}
            </div>
          </div>
        </div>
        </>
    )
}

export default History
