import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminSideBar from "../../../components/AdminSideBar";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {couponActions} from '../../../redux/actions/coupon.action'
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import Navbar2 from "../../../components/Navbar2";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const loading = useSelector((state)=> state.coupon.loading)
//   console.log(loading)
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const values = useSelector((state)=>state.coupon.coupons.data)
  console.log("this is data coupon",values)


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table(name, expiry, discount);
    dispatch(couponActions.createCoupon({ name, expiry, discount }))
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
        dispatch(couponActions.deleteCoupon(couponId))
    }
  };
  useEffect(() => {
    dispatch(couponActions.getCoupons())
  }, []);
  useEffect(() => {
    if(values && values.allcoupons){
        setCoupons(values.allcoupons)
    }
  }, [values]);

  return (
    <>
    <Navbar2/>
    <div className="container-fluid admin--page">
    <div className="row">
      <div className="col-md-3 pt-2">
        <AdminSideBar />
      </div>
      <div className="col-md-9 pt-2">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
          ) : (
          <h4>Coupon</h4>
        )}

        <div >
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Discount %</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Expiry</label>
            <br />
            <DatePicker
              className="form-control"
              selected={new Date()}
              value={expiry}
              onChange={(date) => setExpiry(date)}
              required
            />
          </div>

          <button className="btn btn-outline-primary">Save</button>
        </form>

        <br />

        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Expiry</th>
              <th scope="col">Discount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{new Date(c.expiry).toLocaleDateString()}</td>
                <td>{c.discount}%</td>
                <td>
                  <DeleteOutlined
                    onClick={() => handleRemove(c._id)}
                    className="text-danger pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>

    </div>
  </div>
  </>
  );
};

export default CreateCoupon;
