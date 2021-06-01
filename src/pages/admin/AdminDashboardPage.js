import React, {useState, useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { useDispatch, useSelector } from "react-redux";
import {adminActions} from "../../redux/actions/admin.action"
// import AdminProductCard from "../../components/form/AdminProductCard";
import Orders from "../../components/form/Orders";
import Navbar2 from '../../components/Navbar2'
const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const ordersdata = useSelector((state)=>state.admin.order.data)
  console.log(ordersdata)
const handleStatusChange = (orderId, orderStatus) => {
    dispatch(adminActions.ordersStatus({orderId,orderStatus}))

  };

  useEffect(() => {
    dispatch(adminActions.getAllOrders())
  }, []);

  useEffect(() => {
    if(ordersdata && ordersdata.allOrders){
      setOrders( ordersdata.allOrders)
    }
  }, [ordersdata]);
    return (
      <>
      <Navbar2/>
      <div className="container-fluid admin--page ">
      <div className="row">
        <div className="col-md-2 pt-2">
          <AdminSideBar />
        </div>

        <div className="col-md-10 pt-2">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
    </>
    )
}

export default AdminDashboardPage
