import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart,faUser } from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../logo.png";
import noImg from "../img/no-image.png";
import { userActions } from "../redux/actions/user.action";
import { authActions } from "../redux/actions/auth.action";
import { Badge } from "antd";
import 'antd/dist/antd.css';

const Navbar2 = () => {
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser.data);
    const { cart } = useSelector((state) => ({...state}));
    console.log("this current user",currentUser)
    const isAuth = useSelector((state) => state.auth.isAuth);
    const handleLogout = () => {
        localStorage.clear();
        dispatch(authActions.logoutUser());
      };
      useEffect(() => {
        if (isAuth) {
          dispatch(userActions.getUser());
        }
      }, [dispatch]);
    
    useEffect(() => {
      window.onscroll = () => {
        if (window.scrollY > window.innerHeight - 90) {
          setStatus("nav--scroll ");
        } else {
          setStatus("");
        }
      };
    }, [status]);
    return (
    <>

        <nav className={`navbar navbar-expand-lg navbar-ligh fixed-top navcolor2 ${status?"navbar--scroll":""} `}>
        <div className=" container">
            <div className="navbar-brand navstyleleft" >
                <Link   to="/" ><img className="logo" src={logo} alt="logo..." /></Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} style={{ color: "#191919" }} />
            </button>
          <div className=" navstyleright collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav mr-auto ${ status ? "nav--scroll " : ""}`}>
                <li className="nav-item active">
                <Link  to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                <Link  to="/products" className="nav-link" >Products</Link>
                </li>
                 <li className="nav-item active">
                <Link  to="about" className="nav-link" >About</Link>
                </li>
                <li className="nav-item active">
                <Link  to="contact" className="nav-link" >Contact </Link>
                 </li>
            </ul>
            <ul className={`navbar-nav ml-auto ${ status ? "nav--scroll " : ""}`}>
            <li className="nav-item active ">
            <Link to="/cart" className={` nav-link badge--position ${status?"shoppingcart--scroll":"shoppingcart"}`}>
                 
                 <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                 <span className="badge badge-warning">{cart.length}</span>
            </Link>
            </li>
            <li className="header__right">
              
                {isAuth && currentUser && currentUser.data.role==="user" ?(<div className="list">
                <div className="current-user">
                {/* <p className="username">{currentUser && currentUser.data.name}</p> */}
                    {currentUser && currentUser.data.avatarUrl ? (
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url('${currentUser.data.avatarUrl}')`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar"
                  style={{ backgroundImage: `url('${noImg}')` }}
                ></div>
              )}
              <div className="dropdown">
                <Link to="/user/history" className="nav-link">
                  History
                </Link>
                <Link to="/user/wishlist" className="nav-link">
                  WishList
                </Link>
                <Link to="/" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              </div>
            </div>
            </div>):isAuth && currentUser && currentUser.data.role==="admin" ?(<div className="list">
                <div className="current-user">
                {/* <p className="username">{currentUser && currentUser.data.name}</p> */}
                    {currentUser && currentUser.data.avatarUrl ? (
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url('${currentUser.data.avatarUrl}')`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar"
                  style={{ backgroundImage: `url('${noImg}')` }}
                ></div>
              )}
              <div className="dropdown">
                <Link to="/admin/products" className="nav-link">
                  Products
                </Link>
                <Link to="/admin/dashboard" className="nav-link">
                  DashBoard
                </Link>
                <Link to="/" onClick={handleLogout} className="nav-link">
                  Logout
                </Link>
              </div>
            </div>
            </div>):(
                <Link to="/login" className={` nav-link ${status?"shoppingcart--scroll":"shoppingcart"}`} >
                <FontAwesomeIcon icon={faUser} size="2x" />
                </Link>
                )}
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
    )
}

export default Navbar2
