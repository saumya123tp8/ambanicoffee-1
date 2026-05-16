import { useState } from "react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
// import { ToastContainer, toast } from 'react-toastify';
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  ///form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log(name,email,password,phone)
    try {
      const res = await axios.post(
        `/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API}/api/v1/auth/register`,
      //   { name, email, password, phone, address, answer }
      // );
      if (res.data.success) {
        toast.success("registered successfully", { duration: 1500 });
        ////usenavigate helps to route another page
        navigate("/login");
      } else {
        toast.error(res.data.message, { duration: 2500 });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 2500 });
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Register Page</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name here"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email here"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password here"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control"
              id="exampleInputPhone1"
              placeholder="enter your phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="form-control"
              id="exampleInputAddress1"
              placeholder="enter your address here"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="what is your bestfriend name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
