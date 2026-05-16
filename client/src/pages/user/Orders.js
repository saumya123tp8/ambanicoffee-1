import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Slider from "react-slick";
import "../../styles/orderstyle.css";
import OrderTracker from "./OrderTracker";
const Orders = ({
                orders,
                ratingOrder, 
                setRatingOrder, 
                onReport,
                onCheckOrderDetail,
}) => {
  // const [orders, setOrders] = useState([]); 
  const [previousOrders, setPreviousOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
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
      // const { data } = await axios.get("/api/v1/auth/orders");
      // setOrders(data);
      const data = orders;
      console.log("Orders " + data);
      const completedStatuses = new Set(["cancel", "delivered"]);

      const prevOrders = data.filter((order) =>
        completedStatuses.has(order.status.toLowerCase()),
      );

      const actOrders = data.filter(
        (order) => !completedStatuses.has(order.status.toLowerCase()),
      );
      console.log("prev order");
      console.log(prevOrders);
      console.log("act order");
      console.log(actOrders);
      setPreviousOrders(prevOrders);
      setActiveOrders(actOrders);
      // setPreviousOrders(data);
      // setActiveOrders(data);
    } catch (error) {
      console.log(error);
    }
  };


  const StarRating = ({ onClose }) => {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
      return <div className="rating-success">✓ Thanks for your feedback!</div>;
    }

    return (
      <div className="star-rating-wrap">
        <div className="star-row">
          {[1, 2, 3, 4, 5].map((s) => (
            <span
              key={s}
              className="star"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(s)}
              style={{
                transform:
                  (hovered || selected) >= s ? "scale(1.2)" : "scale(1)",
                filter:
                  (hovered || selected) >= s
                    ? "none"
                    : "grayscale(1) opacity(0.4)",
              }}
            >
              ⭐
            </span>
          ))}
        </div>
        <textarea
          className="rating-textarea"
          placeholder="Tell us more (optional)..."
          rows={2}
        />
        <div className="rating-btns">
          <button
            className="rating-submit"
            onClick={() => selected > 0 && setSubmitted(true)}
          >
            Submit
          </button>
          <button className="rating-skip" onClick={onClose}>
            Skip
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (auth?.token){
      getOrders();
      console.log("Orders "+ orders);
    } 
  }, [auth?.token]);
  return (
    // <Layout title={"Your Orders"}>
    //   <div className="container-flui p-3 m-3 dashbrd">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <UserMenu />
    //       </div>
    //       <div className="col-md-9">
    //         <h1 className="text-center">All Orders</h1>
    //         {orders?.map((o, i) => {
    //           return (
    //             <div className="border shadow">
    //               <table className="table">
    //                 <thead>
    //                   <tr>
    //                     <th scope="col">#</th>
    //                     <th scope="col">Status</th>
    //                     <th scope="col">Buyer</th>
    //                     <th scope="col"> date</th>
    //                     <th scope="col">Payment</th>
    //                     <th scope="col">Quantity</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   <tr>
    //                     <td>{i + 1}</td>
    //                     <td>{o?.status}</td>
    //                     <td>{o?.buyer?.name}</td>
    //                     <td>{moment(o?.createAt).fromNow()}</td>
    //                     <td>{o?.payment.success ? "Success" : "Failed"}</td>
    //                     <td>{o?.products?.length}</td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //               <div className="row container">
    //                 <Slider {...settings}>
    //                   {o?.products?.map((p, i) => (
    //                     <div className="row m-1 p-1 card flex-row" key={p._id}>
    //                       <h6>{i+1}</h6>
    //                       <div className="col-md-20">
    //                         <img
    //                           src={`/api/v1/product/product-photo/${p._id}`}
    //                           className="card-img-top"
    //                           alt={p.name}
    //                           width="100px"
    //                           height={"110px"}
    //                         />
    //                       </div>
    //                       <div className="col-md-8">
    //                         <p>{p.name.substring(0, 7)}</p>
    //                         <p>{p.description.substring(0, 6)}</p>
    //                         <p>Price : {p.price}</p>
    //                       </div>
    //                     </div>
    //                   ))}
    //                 </Slider>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    <div>
      <div className="section-title">Your Orders</div>
      <div className="section-sub">
        Track active orders and review past ones.
      </div>

      <div className="section-label">Active</div>
      {activeOrders.map((order) => (
        <div className="card card-mb" key={order.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#f0ece4" }}>
                {order?.provider||"JMS-COMMERCE2"}
              </div>
              <div style={{ color: "#7a776f", fontSize: 13 }}>
                Order : {order._id?.toString().slice(-8).toUpperCase()} 
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#f0ece4",
                }}
              >
                ₹{order.totalAmount}
              </div>
              <span className="badge badge-teal">ETA {order.eta}</span>
            </div>
          </div>
          <OrderTracker productStatus={order.status} size="sm" />
          <div className="d-flex w-100 justify-content-between">
          <button
            className="btn btn-ghost w-50 p-2 m-2"
            style={{ fontSize: 12 }}
            onClick={() => onReport(order._id)}
            >
            ⚑ Report Issue
          </button>
           <button
            className="btn btn-ghost w-50 p-2 m-2"
            style={{ fontSize: 12 }}
            onClick={() => onCheckOrderDetail(order)}
            >
            view details
          </button>
          </div>
        </div>
      ))}

      <div className="section-label" style={{ marginBottom: 12 }}>
        Previous
      </div>
      <div className="card">
        {previousOrders.map((order) => (
          <div key={order.id} className="order-row">
            <div style={{ flex: 1 }}>
              <div className="order-restaurant">{order.restaurant}</div>
              {/* <div className="order-items">{order.items.join(', ')}</div> */}
              <div className="order-date">{order.date}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div className="order-total">₹{order.total}</div>
              <div className="order-id">{order.id}</div>
            </div>
            <div className="order-actions">
              {!order.rated && ratingOrder !== order.id && (
                <button
                  className="btn btn-orange"
                  style={{ fontSize: 12 }}
                  onClick={() => setRatingOrder(order.id)}
                >
                  Rate Now ⭐
                </button>
              )}
              {ratingOrder === order.id && (
                <StarRating
                  orderId={order.id}
                  onClose={() => setRatingOrder(null)}
                />
              )}
              {order.rated && <span className="rated-check">✓ Rated</span>}
              <button
                className="btn btn-ghost"
                style={{ fontSize: 11 }}
                onClick={() => onReport(order._id)}
              >
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
