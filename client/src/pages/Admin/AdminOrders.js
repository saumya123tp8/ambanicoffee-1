
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import '../../styles/dashbrd.css'
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Slider from "react-slick";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setSlidesToShow(1);
      } else if (windowWidth >= 768 && windowWidth < 992) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  ///////////////made by tony independently
  const handleConfirm = async (cid) => {
    try {
      let answer;
      answer=window.prompt('Order is delivered or not')
      if(!answer)return;
      const { data } = await axios.delete(
        `/api/v1/product/confirm-order/${cid}`
      );
      if (data.success) {
        toast.success("product deleted successfully");
        getOrders()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashbrd">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                      <td>
                        <button
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                          onClick={() => handleConfirm(o?._id)}
                        ></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row m-1 p-1 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div> */}
                <div className="row container">
                    <Slider {...settings}>
                      {/* let i=0; */}
                      {o?.products?.map((p, i) => (
                        <div className="row m-1 p-1 card flex-row" key={p._id}>
                          <h6>{i+1}</h6>
                          <div className="col-md-20">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"110px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{p.name.substring(0,20)}</p>
                            {/* <p>{p.description.substring(0, 10)}</p> */}
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
