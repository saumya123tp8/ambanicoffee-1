// import React from 'react'
// import Layout from '../components/Layout/Layout'

// const Contact = () => {
//   return (
//     <Layout><h1>Contact</h1></Layout>
//   )
// }

// export default Contact
import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import '../styles/dashbrd.css'
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus dashbrd">
        <div className="col-md-6 ">
          <img
            src='/images/contactus.jpeg'
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime in between 8am to 10pm
          
          </p>
          <p className="mt-3">
            <BiMailSend /> : jmsintern9621@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-9621359631
          </p>
          <p className="mt-3">
            <BiSupport /> : . . . . . . . . . . . . . . . . (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;