
// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faInstagram,
//   faTwitter,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";
// import "../../styles/footer.css";
// // import { Link } from 'react-router-dom';
// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="container">
//         <div className="mini">
//           <div className="icon-F">
//             <a href="https://www.facebook.com/saumya.keservani.7" className="social-link-f">

//             <span>
//               <FontAwesomeIcon icon={faFacebookF} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-I">
//           <a href="https://www.instagram.com/saumyakeservani/" className="social-link-i">
//             <span>
//               <FontAwesomeIcon icon={faInstagram} />
//             </span>
//             </a>
//           </div>
//         </div>
//         <h4 className="text-center copyrt">
//           All rights are reserved &copy; jms-commerce
//         </h4>
//         <div className="mini">
//           <div className="icon-T">
//             <a href="https://twitter.com/KeservaniS16527" className="social-link-t">

//             <span>
//               <FontAwesomeIcon icon={faTwitter} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-Y">
//             <a href="https://www.youtube.com/channel/UCHWbzfO5hbwKs1KttjYmtTA" className="social-link-y">

//             <span>
//               <FontAwesomeIcon icon={faYoutube} />
//             </span>
//             </a>
//           </div>
//         </div>
//       </div>
//       <p className="text-center mt-3">
//         <Link to="/about" className="lnk">About</Link>|<Link to="/contact" className="lnk">contact</Link>|
//         <Link to="/policy" className="lnk">privacy policy</Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faInstagram,
//   faTwitter,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";
// import "../../styles/footer.css";
// // import { Link } from 'react-router-dom';
// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="container">
//         <div className=" mini">
//           <div className="icon-F">
//             <a href="https://www.facebook.com/saumya.keservani.7" className="social-link-f">

//             <span>
//               <FontAwesomeIcon icon={faFacebookF} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-I">
//           <a href="https://www.instagram.com/saumyakeservani/" className="social-link-i">
//             <span>
//               <FontAwesomeIcon icon={faInstagram} />
//             </span>
//             </a>
//           </div>
//         </div>
//         {/* <div className="col-md-8"> */}

//         <h4 className="text-center copyrt">
//           All rights are reserved &copy; jms-commerce
//         </h4>
//         {/* </div> */}
//         <div className="mini">
//           <div className="icon-T">
//             <a href="https://twitter.com/KeservaniS16527" className="social-link-t">

//             <span>
//               <FontAwesomeIcon icon={faTwitter} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-Y">
//             <a href="https://www.youtube.com/channel/UCHWbzfO5hbwKs1KttjYmtTA" className="social-link-y">

//             <span>
//               <FontAwesomeIcon icon={faYoutube} />
//             </span>
//             </a>
//           </div>
//         </div>
//       </div>
//       <p className="text-center mt-3">
//         <Link to="/about" className="lnk">About</Link>|<Link to="/contact" className="lnk">contact</Link>|
//         <Link to="/policy" className="lnk">privacy policy</Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  
  
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="brand-logo">JMS Commerce</h3>
            <p className="brand-description">
              Your trusted partner for quality products and exceptional service.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/saumya.keservani.7" className="social-link facebook" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.instagram.com/saumyakeservani/" className="social-link instagram" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com/KeservaniS16527" className="social-link twitter" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.youtube.com/channel/UCHWbzfO5hbwKs1KttjYmtTA" className="social-link youtube" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>


          {/* Contact Info */}
          <div className="footer-section">
            {/* <h5>Contact Info</h5> */}
            <div className="contact-info">
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <span>hello@jmscommerce.com</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                <span>123 Commerce St, Business City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="footer-bottom">
          <div className="bottom-links">
            <Link to="/about" className="bottom-link">About</Link>
            <Link to="/contact" className="bottom-link">Contact</Link>
            <Link to="/policy" className="bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="bottom-link">Terms of Service</Link>
            <Link to="/shipping" className="bottom-link">Shipping Info</Link>
          </div>
           <div className="copyright">
            <p>&copy; 2024 JMS Commerce. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
