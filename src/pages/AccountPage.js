import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Container } from 'react-bootstrap';
import { authActions } from "../redux/actions/auth.action";
import { routeActions } from "../redux/actions/route.action";
import{Link} from "react-router-dom"
import {auth} from "../firebase"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import logoheader from"../images/image2.png"
const AccountPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const redirectTo = useSelector((state) => state.route.redirectTo);
    const [status, setStatus] = useState(false);
    const [formSignIn, setFormSignIn] = useState({ email: "", password: "" });
    const [formSignUp, setFormSignUp] = useState({
      name: "",
      email: "",
      password: "",
    });
    const handleLogin = () => {
        setStatus(true);
      };
    
    const handleRegister = () => {
        setStatus(false);
      };
      const handleSignInChange = (e) => {
        setFormSignIn({ ...formSignIn, [e.target.name]: e.target.value });
      };
    
      const handleSignUpChange = (e) => {
        setFormSignUp({ ...formSignUp, [e.target.name]: e.target.value });
      };

      const handleSignInSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formSignIn;
        dispatch(authActions.loginUser({ email, password }));
        e.target.reset();
      };
    
      const handleSignUpSubmit =  async(e) => {
        e.preventDefault();
        // console.log("env",process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }
        const { name, email, password } = formSignUp;
        dispatch(authActions.registerUser({ name, email, password }));
        if(name&&email&&password&&password){
            await auth.sendSignInLinkToEmail(email,config)
            toast.success(`Email is sent to ${email}, click the link to complete your registration`)
            // save user email in local storage
            window.localStorage.setItem(`emailForRegistration`,email)
        }
        // clear 
        e.target.reset();
      };
      useEffect(() => {
        if (redirectTo) {
          history.push(redirectTo);
        //   history.go(0)
          setStatus(true);
          dispatch(routeActions.removeRedirectTo());
        }
      }, [dispatch, history, redirectTo]);  
    
    return (
        <>
    <div className="header-wraper account-page ">
    <Container>
      <Navbar/>
    <div className="row">
        <div className="col-lg-6">
            <img src={logoheader}/>
        </div>
        <div className="col-lg-6">
        <div className="form-container">
                 <div className="form-btn">
                     <span onClick={handleLogin}>Login</span>
                     <span onClick={handleRegister}>Register</span>
                     <hr id="indicator" className={`${status ? "indicator--login" : "indicator--register"}`} />
                 </div>
                 
               <form id="LoginForm" className={`${status ? "login--form" : "register--form"}`}  onSubmit={handleSignInSubmit}>
                   <input type="email" name="email" placeholder="Email" onChange={handleSignInChange}/>
                   <input type="password" name="password" placeholder="Password" onChange={handleSignInChange}/>
                   <button type="submit" className="btn-account">Login</button>
                   <Link to="/forgot/password" >Forgot password</Link>
               </form>

               <form id="RegForm" className={`${status ? "login--form" : "register--form"}`}  onSubmit={handleSignUpSubmit}>
                   <input type="text" name="name" placeholder="Name" onChange={handleSignUpChange}/>
                   <input type="email" name="email" placeholder="Email" onChange={handleSignUpChange}/>
                   <input type="password" name="password" placeholder="Password" onChange={handleSignUpChange}/>
                   <button type="submit" className="btn-account">Register</button>
               </form>
        </div>
      
    </div>
    </div>
    </Container>
    </div>
    </>
    )
}

export default AccountPage
