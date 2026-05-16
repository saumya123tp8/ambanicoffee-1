import React from "react";
import Layout from "./../components/Layout/Layout";
import '../styles/dashbrd.css'
const About = () => {
  return (
    <Layout title={'about us-ecommerce app'}>
      <div className="row contactus dashbrd">
        <div className="col-md-5 bgc">
          <img
            src="/images/abt.jpeg"
            alt="contactus"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div className="col-md-6 about-container">
        <h2>Welcome to Our Cafe</h2>
          <p>
            At our cafe, we strive to create a warm and inviting atmosphere for
            coffee lovers. Whether you're seeking a cozy spot to relax with a
            cup of freshly brewed coffee or looking for a place to catch up
            with friends, our cafe provides the perfect ambiance.
          </p>
          <p>
            We take pride in sourcing the finest coffee beans from around the
            world. Our skilled baristas craft each cup of coffee with precision
            and care, ensuring a rich and flavorful experience for every
            customer. We also offer a variety of tea, pastries, and snacks to
            complement your beverage of choice.
          </p>
          <p>
            Our commitment to quality extends beyond our products. We believe
            in fostering a sense of community, which is why we host various
            events and gatherings. From live music performances to art
            exhibitions, there's always something exciting happening at our
            cafe.
          </p>
          <p>
            Come visit us today and indulge in the delightful world of coffee.
            We look forward to serving you and creating memorable experiences
            at our cafe.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;