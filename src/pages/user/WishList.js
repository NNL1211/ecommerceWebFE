import React, { useState, useEffect } from "react";
import UserSideBar from "../../components/UserSideBar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import {userActions} from '../../redux/actions/user.action';
import Navbar2 from "../../components/Navbar2";
const WishList = () => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const wishListdata = useSelector((state)=> state.user.wishlist.data)
  console.log(wishListdata)
  const handleRemove = (productId) =>{
  dispatch(userActions.removeWishlist(productId))
  };

  useEffect(() => {
    dispatch(userActions.getWishList())
  }, []);

  useEffect(() => {
    if(wishListdata && wishListdata.allWishList){
      setWishlist(wishListdata.allWishList.wishlist);
    }
  }, [wishListdata]);
    return (
          <>
          <Navbar2/>
          <div className="container-fluid user--page">
          <div className="row">
            <div className="col-md-2">
              <UserSideBar />
            </div>
            <div className="col">
              <h4>Wishlist</h4>
    
              {wishlist.map((p) => (
                <div key={p._id} className="alert alert-secondary">
                  <Link to={`/product/${p._id}`}>{p.title}</Link>
                  <span
                    onClick={() => handleRemove(p._id)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
    )
}

export default WishList
