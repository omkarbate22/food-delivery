import React from "react";

import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt=""></img>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit,
            illum voluptates doloribus ad aperiam totam facere? Perspiciatis
            voluptates iusto molestias.
          </p>
<div className="social-media-icons">
    <img src={assets.facebook_icon}></img>
    <img src={assets.twitter_icon}></img>
    <img src={assets.linkedin_icon}></img>
</div>

        </div>

        <div className="footer-content-center">

            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About US</li>
                <li>Delivery</li>
                <li>Orivacy Policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91-9876543210</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>

      </div>
      <hr/>
      <p className="copyright">copyright 2020-2022 made and developed by Omkar Bate</p>
    </div>
  );
};

export default Footer;
