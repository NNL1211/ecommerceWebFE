import React from "react";
// import {
//     FacebookShareCount,
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   RedditShareButton,
//   RedditIcon,
//   LinkedinShareButton,
//   LinkedinIcon
// } from "react-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faInstagram,faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="d-flex">
              <h6 style={{color:"#191919"}}>Service & Support</h6>
            </div>
            <div className="d-flex">
              <a href="tel:555-555-555">999-999-999</a>
            </div>
            <div className="d-flex">
              <p>$neaker@gmail.com</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-2 col-sm-6">
            <div className="row">
              <div className="col">
                <Link to="home" className="footer-nav">Info</Link>
                <br />
                <Link   to="/" className="footer-nav">Consignment Terms</Link>
                <br />
                <Link   to="/" className="footer-nav">Connect with Us</Link>
              </div>
              <div className="col">
                <Link   to="/" className="footer-nav">Delivery and Returns</Link>
                <br />
                <Link  to="/" className="footer-nav">FAQs</Link>
                <br />
                <Link  to="/" className="footer-nav">Locations</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-6 align-items-center">
            <div className="d-flex justify-content-center">
                <div className="circle">
                <a href="https://www.facebook.com" target="blank">
                <FontAwesomeIcon className="icon" icon={faFacebookF} size="2x" />
                </a>
                </div>
                <div className="circle">
                <a href="https://www.instagram.com" target="blank">
                <FontAwesomeIcon className="icon" icon={faInstagram} size="2x" />
                </a>
                </div>
                <div className="circle">
                <a href="https://www.youtube.com" target="blank">
                <FontAwesomeIcon className="icon" icon={faYoutube} size="2x" />
                </a>
                </div>
                {/* <div className="circle">
                <a href="https://github.com/NNL1211" target="blank">
                <FontAwesomeIcon className="icon" icon={faGithub} size="2x" />
                </a>
                </div> */}
            </div>
            <p className="pt-3 text-center">
              Copyright&copy;
              {new Date().getFullYear()}&nbsp; | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
