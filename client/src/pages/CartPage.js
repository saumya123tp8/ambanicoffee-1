

// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";
// import Slider from "react-slick";
// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [slidesToShow, setSlidesToShow] = useState(4);
//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//   };
//   useEffect(() => {
//     const handleResize = () => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth < 768) {
//         setSlidesToShow(1);
//       } else if (windowWidth >= 768 && windowWidth < 992) {
//         setSlidesToShow(3);
//       } else {
//         setSlidesToShow(4);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-IN", {
//         style: "currency",
//         currency: "INR",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//       toast.success(`1 item remove from your cart now yo have only ${cart.length-1} products`)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   return (
//     <Layout>
//       <div className=" cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center bg-light p-2 mb-1">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.name}`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${
//                       auth?.token ? "" : "please login to checkout !"
//                     }`
//                   : " Your Cart Is Empty"}
//               </p>
//             </h1>
//           </div>
//         </div>
//         <div className="row container similar-products">
//           <h4> Products in your cart ➡️</h4>
//           {/* <Slider {...settings}> */}

//           <Slider {...settings}>
//             {cart?.map((p,i) => (
//               <div className="card-1 m-2" key={p._id}>
//                 <h6>{i+1}</h6>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                   width="100%"
//                   height={"13px"}
//                 />
//                 <div className="card-body">
//                   <div className="card-name-price">
//                     <p>{p.name.substring(0,10)}...</p>
//                     <p>Price : ₹ {p.price}</p>
//                   </div>
//                   <p className="card-text ">
//                     {/* <p>{p.description.substring(0, 30)}</p> */}
//                     {p.description.substring(0,15)}...
//                   </p>
//                   <div className="remove">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>

//           {/* </Slider> */}
//         </div>
//         <div className="container ">
//           <div className="row">
//             <div className="col-md-5 cart-summary ">
//               <h2>Cart Summary</h2>
//               <p>Total | Checkout | Payment</p>
//               <hr />
//               <h4>Total : {totalPrice()} </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div className="mb-3">
//                     <h4>Current Address</h4>
//                     <h5>{auth?.user?.address}</h5>
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
//                 {!clientToken || !auth?.token || !cart?.length ? (
//                   ""
//                 ) : (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />

//                     <button
//                       className="btn btn-primary"
//                       onClick={handlePayment}
//                       disabled={loading || !instance || !auth?.user?.address}
//                     >
//                       {loading ? "Processing ...." : "Make Payment"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;



import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import Slider from "react-slick";
import CartItemCard from "./CartItemCard";

const CartPage = () => {
  /* ── Context (falls back to dummy when context is unavailable) ── */
  
  const  [auth, setAuth] = useAuth();
  const  [cart, setCart] = useCart();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(4);

  /* ── Responsive slides ── */
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setSlidesToShow(w < 600 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : 4);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 3,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "30px",
  };

  /* ── Total price ── */
  const totalPrice = () => {
    const total = (cart || []).reduce((acc, item) => acc + (item.price)*(item.cartQuantity), 0);
    return total.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  };

  const subtotalNumeric = () =>
    (cart || []).reduce((acc, item) => acc + (item.price)*(item.cartQuantity), 0);

  /* ── Remove item ── */
  const removeCartItem = (pid) => {
    try {
      console.log("remove cart"+pid);
      console.log(cart);
      const updated = (cart || []).filter((item) => item.cartItemId!== pid);
      setCart(updated);
      console.log(cart);
      const cartKey = `cart_${auth.user._id}`;
      console.log(cartKey);
      localStorage.setItem(cartKey, JSON.stringify(updated));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
    }
  };

const quantitChangeCartItem = (pid, cartQuantity) => {
  try {
    const updated = (cart || []).map((item) =>
      item.cartItemId === pid
        ? { ...item, cartQuantity : cartQuantity, addedOrUpdatedToCartAt:Date.now() }
        : item
    );

    setCart(updated);
    const cartKey = `cart_${auth.user._id}`;
    localStorage.setItem(cartKey, JSON.stringify(updated));
    subtotalNumeric();
    toast.success("Quantity updated");
  } catch (err) {
    console.error(err);
  }
};

  /* ── Payment token ── */
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
      console.log(data);
      console.log(clientToken);
    } catch (err) {
      console.error("err token");
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  /* ── Payment ── */
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", { nonce, cart });
      setLoading(false);
      const cartKey = `cart_${auth.user._id}`;
      localStorage.removeItem(cartKey);
      setCart([]);
      navigate("/dashboard/user/");
      toast.success("Payment completed successfully!");
    } catch (err) {
      console.error("err");
      console.error(err?.message);
      // console.log(DropinError)
      setLoading(false);
      toast.error("Payment failed"+" ( "+err?.message+" )");
      // toast.error("Payment failed. Please try again.");
    }
  };

  const cartItems = cart || [];
  const isEmpty = cartItems.length === 0;

  return (
    <Layout>
      <div className="cart-page">

        {/* ── Header ── */}
        <div className="cart-header">
          <h1 className="cart-header__greeting">
            {!auth?.user
              ? "Hello, Guest"
              : <>Hello, <span>{auth.user.name.split(" ")[0]}</span></>}
          </h1>
          <p className="cart-header__subtitle">Your Shopping Cart</p>
          {!isEmpty && (
            <span className="cart-header__badge">
              🛍 {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* ── Main Layout ── */}
        <div className="cart-layout">

          {/* ── Left: Products ── */}
          <div className="cart-products-section-par">
            <p className="cart-section-label">Cart Items</p>

            {isEmpty ? (
              <div className="cart-empty">
                <div className="cart-empty__icon">🛒</div>
                <h2 className="cart-empty__title">Your cart is empty</h2>
                <p className="cart-empty__text">
                  Looks like you haven't added anything yet.
                </p>
              </div>
            ) : (
              <div className="cart-products-section">
                <Slider {...sliderSettings}>
                  {cartItems.map((p, i) => (
                    <div key={p._id} className="slider-item-wrapper">
                    <CartItemCard
                    item={p}
                    index={p._id}
                    onRemove={removeCartItem}
                    onQuantityChange={quantitChangeCartItem}
                    maxQuantity={20}
                    />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>

          {/* ── Right: Summary ── */}
          <div className="cart-summary-par">
            <p className="cart-section-label">Summary</p>

            <div className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              <p className="cart-summary__tagline">Total · Checkout · Payment</p>

              {/* Line items */}
              <div className="cart-summary__row">
                <span className="cart-summary__row-label">Items ({cartItems.length})</span>
                <span className="cart-summary__row-value">
                  ₹ {subtotalNumeric().toLocaleString("en-IN")}
                </span>
              </div>
              <div className="cart-summary__row">
                <span className="cart-summary__row-label">Shipping</span>
                <span className="cart-summary__row-value" style={{ color: "#7ecb8f" }}>
                  Free
                </span>
              </div>
              <div className="cart-summary__row">
                <span className="cart-summary__row-label">Taxes & Fees</span>
                <span className="cart-summary__row-value">Included</span>
              </div>

              <hr className="cart-summary__divider" />

              <div className="cart-summary__row" style={{ marginBottom: 0 }}>
                <span className="cart-summary__total-label">Total</span>
                <span className="cart-summary__total-value">{totalPrice()}</span>
              </div>

              <hr className="cart-summary__divider" />

              {/* Address */}
              {auth?.user?.address ? (
                <div className="cart-summary__address-block">
                  <p className="cart-summary__address-label">📍 Deliver to</p>
                  <p className="cart-summary__address-text">{auth.user.address}</p>
                  <button
                    className="btn-update-address"
                    onClick={() => navigate("/dashboard/user/")}
                  >
                    ✎ Update Address
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom: "16px" }}>
                  {auth?.token ? (
                    <button
                      className="btn-update-address"
                      onClick={() => navigate("/dashboard/user/")}
                    >
                      + Add Delivery Address
                    </button>
                  ) : (
                    <button
                      className="btn-login"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}

              {/* Payment */}
              {!isEmpty && clientToken && auth?.token && (
                <div className="cart-dropin-wrap">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(inst) => setInstance(inst)}
                  />
                </div>
              )}

              {!isEmpty && auth?.token && (
                <button
                  className="btn-pay"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? (
                    <><span className="spinner" /> Processing…</>
                  ) : (
                    <>🔒 Pay {totalPrice()}</>
                  )}
                </button>
              )}

              <p className="cart-security-note">
                🔐 SSL Encrypted · Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
