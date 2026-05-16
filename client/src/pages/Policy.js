import React from "react";
import Layout from "./../components/Layout/Layout";
import '../styles/dashbrd.css'
const Policy = () => {
  return (
    <Layout>
      <div className="row contactus dashbrd">
        <div className="col-md-6 ">
          <img
            src="/images/policy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 about-container">
          <h5>1. We may collect the following types of personal information when you visit our website, use our mobile app, or interact with us in-store</h5>
          <p>-Contact information (such as name, email address, phone number)</p>
          <h5>2. We use the collected personal information for the following purposes:</h5>
          <p>-To process orders and payments</p>
          <p>-To personalize your experience and provide tailored services</p>
          <p>-To improve our products, services, and customer experience</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;