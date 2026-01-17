import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
export const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
             <img src={assets.logo} alt="" />
             <p>
               version 1 .0.0 <br>
               </br>
               Food ordering app 
             </p>
            
            </div>
            <div className="footer-content-center">
              <ul>
                  <li>Home</li>
                  <li>Menu</li>
                  <li>Delivery</li>
                  <li>Privacy policy</li>
              </ul>
            </div>
            <div className="footer-content-right">
               <h2> Get in touch</h2>
               <ul>
                   <li>7795056017</li>
                   <li>lmsuma56@gmail.com</li>
               </ul>
            </div>

        </div>
        <hr />
          <p className="footer-copyright"> Copyright 2026 &copy; 2021 Tomato.com. All rights reserved</p>
    </div>
  )
}
