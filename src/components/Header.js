import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import { Link } from "react-scroll";
// import {Link} from "react-router-dom"
import Navbar from "./Navbar";
import logoheader from"../images/image1.png"

const Header = () => {
    return (
    <>
      <div className="header-wraper">
      <Container>
        <Navbar/>
      <div className="row">
          <div className="col-lg-6">
            <h1>Give Your Life<br/>A New Style!</h1>
            <p>Success isn’t always about greatness. It’s about consistency. Consistent<br/>hard work gains success. Greatness will come.</p>
            <Link  to="explore" className="btn-main-offer">Explore Now &#8594;</Link>
          </div>
          <div className="col-lg-6">
              <img src={logoheader} />
          </div>
        </div>
      </Container>
      

      </div>
    </>
    )
}

export default Header
