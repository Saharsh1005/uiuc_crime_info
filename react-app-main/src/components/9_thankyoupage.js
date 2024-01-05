import React from "react";
import "../css/9_thankyoupage.css";
import Footer from "../common/footer";
import thankyou from "./assets/thankyou.png";
import { Link } from 'react-router-dom';
export const ElementThankyouPage = () => {
  return (
    <div>
      <div className="innerdiv">
        <div className="element-thankyou-page">
          <div className="div-2">
            <div>
            <p className="p">Thank you for keeping the community safe by helping the cops by reporting a crime!</p>
            </div>
            <div>
            <img src={thankyou} className="thankyouimage" alt="thank you"/>
            </div>
            <div className='crimelinkdink'>
            <Link to="/reportacrime" className="reportacrimelink">Want to report more crimes? Click here</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ElementThankyouPage;
