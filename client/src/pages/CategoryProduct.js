// import React,{useState,useEffect} from 'react'
// import Layout from '../components/Layout/Layout'
// import axios from 'axios'
// import { useParams,useNavigate } from 'react-router-dom'

// const CategoryProduct = () => {
//     const [products,setProducts]=useState([])
//     const [category,setCategory]=useState([]);
//     const params=useParams()
//     const navigate=useNavigate()
//     useEffect(()=>{
//         if(params?.slug)getProductByCat()
//     },[params?.slug])

//     const getProductByCat=async()=>{
//         try{
//             const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
//             setProducts(data?.products)
//             setCategory(data?.category)
//         }catch(error){
//             console.log(error)
//         }
//     }
//   return (
//     // <div>CategoryProduct</div>
//     <Layout>
//         <div className='container mt-3'>
//             <h1 className='text-center'>{category?.name}</h1>
//             {/* <h1 className='text-center'>{products?.length} found</h1> */}
//             <div className='row'>
//             <div className="d-flex flex-wrap">
//             {/* <h1>products</h1>
//              */}
//             {products?.map((p) => (
//               // <Link
//               //   key={p._id}
//               //   to={`/dashboard/admin/product/${p.slug}`}
//               //   className="product-link"
//               // >
//               <div className="card m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">{p.description.substring(0, 30)}</p>
//                   <p className="card-text">{p.price} ₹</p>
//                   <button
//                     className="btn btn-primary ms-1"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     more details
//                   </button>
//                   <button className="btn btn-secondary ms-1">
//                     add to cart
//                   </button>
//                 </div>
//               </div>
//               // </Link>
//             ))}
//           </div>
//             </div>
//             {/* <h1 className='text-center'>hiii</h1> */}
//         </div>
//     </Layout>
//   )
// }

// export default CategoryProduct

// import React, { useState, useEffect } from "react"
// import Layout from "../components/Layout/Layout";
// import { useParams, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import "../styles/CategoryProductStyles.css";
// import axios from "axios";
// import { useCart } from "../context/cart";
// const CategoryProduct = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [cart, setCart] = useCart();

//   useEffect(() => {
//     if (params?.slug) getPrductsByCat();
//   }, [params?.slug]);
//   const getPrductsByCat = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
//       );
//       setProducts(data?.products);
//       setCategory(data?.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mt-3 category">
//         <h4 className="text-center">Category - {category?.name}</h4>
//         <h6 className="text-center">{products?.length} result found </h6>
//         <div className="row">
//           <div className="col-md-9 offset-1">
//             <div className="d-flex flex-wrap">
//               {products?.map((p) => (
//                 <div className="card m-2" key={p._id}>
//                   <img
//                     src={`/api/v1/product/product-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <div className="card-name-price">
//                       <h5 className="card-title">{p.name}</h5>
//                       <h5 className="card-title card-price">
//                         {p.price.toLocaleString("en-US", {
//                           style: "currency",
//                           currency: "USD",
//                         })}
//                       </h5>
//                     </div>
//                     <p className="card-text ">
//                       {p.description.substring(0, 60)}...
//                     </p>
//                     <div className="card-name-price">
//                       <button
//                         className="btn btn-info ms-1"
//                         onClick={() => navigate(`/product/${p.slug}`)}
//                       >
//                         More Details
//                       </button>
// <button
//   className="btn btn-secondary ms-1"
//   onClick={() => {
//     setCart([...cart, p]);
//     localStorage.setItem(
//       "cart",
//       JSON.stringify([...cart, p])
//     );
//     toast.success("item added to cart");
//   }}
// >
//   add to cart
// </button>
//                       {/* <button
//                     className="btn btn-dark ms-1"
//                     onClick={() => {
//                       setCart([...cart, p]);
//                       localStorage.setItem(
//                         "cart",
//                         JSON.stringify([...cart, p])
//                       );
//                       toast.success("Item Added to cart");
//                     }}
//                   >
//                     ADD TO CAR
//                   </button> */}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {/* <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault()
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Loadmore"}
//               </button>
//             )}
//           </div> */}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CategoryProduct;
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard/ProductCard";
import { useAuth } from "../context/auth";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [buy, setBuy] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const [auth, setAuth] = useAuth();
  const [customization, setCustomization] = useState({
    notes: "",
    thickness: "",
    sweetness: "",
    coffeeStrength: "",
  });

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`,
      );
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      // );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = (p) => {
    increaseQuantity(p._id);
    const updated = [...cart, p];
    setCart(updated);
     const cartKey = `cart_${auth.user._id}`;
     
     localStorage.setItem(cartKey, JSON.stringify(updated));
    // localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Added to cart");
  };

  const handleRemove = (p) => {
    decreaseQuantity(p._id);
    const updated = [...cart];
    const idx = updated.findIndex((item) => item._id === p._id);
    if (idx > -1) updated.splice(idx, 1);
    setCart(updated);
     const cartKey = `cart_${auth.user._id}`;
    localStorage.setItem(cartKey, JSON.stringify(updated));
    // localStorage.setItem("cart", JSON.stringify(updated));
  };
  const openCustomizationModal = (product) => {
    setCurrentProduct(product);
    // Reset customization for new product
    setCustomization({
      notes: "",
      thickness: "",
      sweetness: "",
      coffeeStrength: "",
    });
    setShowCustomizationModal(true);
  };

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: products.length > slidesToShow,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      cssEase: "ease-in-out",
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 1 },
        },
      ],
    }),
    [slidesToShow, products.length],
  );

  // Optimized quantity handlers with useCallback
  const increaseQuantity = useCallback((pid) => {
    setBuy((prevBuy) => ({
      ...prevBuy,
      [pid]: (prevBuy[pid] || 0) + 1,
    }));
  }, []);

  const decreaseQuantity = useCallback((pid) => {
    setBuy((prevBuy) => ({
      ...prevBuy,
      [pid]: Math.max((prevBuy[pid] || 0) - 1, 0),
    }));
  }, []);

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        {/* <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height="300px"
                    width={"350px"}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("item added to cart");
                        }}
                      >
                        add to cart
                      </button>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div> */}
        <Slider {...settings}>
          {products.map((p) => (
            <div key={p._id} className="px-2">
              <ProductCard
                key={p._id}
                p={p}
                cart={cart}
                setCart={setCart}
                buy={buy}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                navigate={navigate}
                toast={toast}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                openCustomizationModal={openCustomizationModal}
              />
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
