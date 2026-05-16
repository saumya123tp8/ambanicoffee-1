// // HomePage.jsx — only the render section changed, all logic identical

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Layout from "./../components/Layout/Layout";
// import ProductCard from "../components/ProductCard/ProductCard";
// import FilterBar from "../components/FilterBar/FilterBar";
// import Slider from "react-slick";
// import "../styles/Homepage.css";
// import CustomizeProductCard from "../components/ProductCard/CustomizeProductCard";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [products, setProducts] = useState([]);
//   const [slideProducts, setSlideProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [buy, setBuy] = useState({});
//   const [slidesToShow, setSlidesToShow] = useState(6);

//   // ── all your existing logic unchanged ────────────────────────────────────

//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const w = window.innerWidth;
//       if (w < 760) setSlidesToShow(3);
//       else if (w < 992) setSlidesToShow(5);
//       else setSlidesToShow(7);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const increaseQuantity = (pid) =>
//     setBuy((prev) => ({ ...prev, [pid]: (prev[pid] || 0) + 1 }));

//   const decreaseQuantity = (pid) =>
//     setBuy((prev) => ({ ...prev, [pid]: Math.max((prev[pid] || 0) - 1, 0) }));

//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(`/api/v1/category/get-category`);
//       if (data?.success) setCategories(data?.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllAvlProducts();
//     getAllCategory();
//     getTotal();
//   }, []);

//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//       setSlideProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   const getAllAvlProducts = async () => {
//     try {
//       let currentPage = 1;
//       let allProducts = [];
//       while (allProducts.length < total) {
//         const { data } = await axios.get(
//           `/api/v1/product/product-list/${currentPage}`,
//         );
//         allProducts = [...allProducts, ...data.products];
//         currentPage++;
//       }
//       setSlideProducts(allProducts);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(`/api/v1/product/product-count`);
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) all.push(id);
//     else all = all.filter((c) => c !== id);
//     setChecked(all);
//   };

//   useEffect(() => {
//     if (checked.length || radio.length) filterProduct();
//     else getAllProducts();
//   }, [checked, radio]);

//   const filterProduct = async () => {
//     try {
//       const { data } = await axios.post(`/api/v1/product/product-filters`, {
//         checked,
//         radio,
//       });
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────────────────

//   const handleAdd = (p) => {
//     increaseQuantity(p._id);
//     const updated = [...cart, p];
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//     toast.success("Added to cart");
//   };

//   const handleRemove = (p) => {
//     decreaseQuantity(p._id);
//     const updated = [...cart];
//     const idx = updated.findIndex((item) => item._id === p._id);
//     if (idx > -1) updated.splice(idx, 1);
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   const updatedProductAfterReload = () => {
//     cart?.forEach((item) => {
//       increaseQuantity(item._id);
//     });
//   };
//   // ── end of your existing logic ──

//   const openCustomizationModal = (product) => {
//     setCurrentProduct(product);
//     // Reset customization for new product
//     setCustomization({
//       notes: "",
//       thickness: "",
//       sweetness: "",
//       coffeeStrength: "",
//     });
//     setShowCustomizationModal(true);
//   };

//   const closeCustomizationModal = () => {
//     setShowCustomizationModal(false);
//     setCurrentProduct(null);
//   };

//   const confirmCustomization = (product) => {
//     // Store customization with the product
//     const productWithCustomization = {
//       ...product,
//       customization: customization,
//     };

//     // Call your existing handleAdd with customized product
//     handleAdd(productWithCustomization);

//     // Close modal
//     closeCustomizationModal();
//   };

//   const [showCustomizationModal, setShowCustomizationModal] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [customization, setCustomization] = useState({
//     notes: "",
//     thickness: "",
//     sweetness: "",
//     coffeeStrength: "",
//   });

//   return (
//     <Layout title={"All Products - Best offers"}>
//       {/* Slider — unchanged */}
//       <div className="slick-set">
//         <Slider {...settings}>
//           {slideProducts?.map((p) => (
//             <div className="imgbox" key={p._id}>
//               <img
//                 src={`/api/v1/product/product-photo/${p._id}`}
//                 className="card-img-top-slide"
//                 alt={p.name}
//                 onClick={() => navigate(`/product/${p.slug}`)}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {/* Filter bar */}
//       <FilterBar
//         categories={categories}
//         prices={Prices}
//         checked={checked}
//         setChecked={setChecked}
//         radio={radio}
//         onCategory={handleFilter}
//         onPrice={(val) => setRadio(val)}
//         // onReset={() => window.location.reload()}
//         onReset={() => { setChecked([]); setRadio([]); }}
//       />

//       {/* Products */}
//       <div className="container-fluid mt-3">
//         <h1
//           className="text-center mb-3"
//           style={{ color: "gray", fontFamily: "'Playfair Display', serif" }}
//         >
//           All Products
//         </h1>

//         {/* ✅ ProductCard now owns the pg-grid — no extra wrapper needed */}
//         <div className="pg-grid">
//           {products?.map((p) => (
//             <ProductCard
//               key={p._id}
//               p={p}
//               cart={cart}
//               setCart={setCart}
//               buy={buy}
//               increaseQuantity={increaseQuantity}
//               decreaseQuantity={decreaseQuantity}
//               navigate={navigate}
//               toast={toast}
//               handleAdd={handleAdd}
//               handleRemove={handleRemove}
//               openCustomizationModal={openCustomizationModal}
//             />
//           ))}
//         </div>
//         {showCustomizationModal && currentProduct && (
//           <CustomizeProductCard
//             p={currentProduct}
//             confirmCustomization={confirmCustomization}
//             closeCustomizationModal={closeCustomizationModal}
//             customization={customization}
//             setCustomization={setCustomization}
//             currentProduct={currentProduct}
//           />
//         )}
//         {/* Load more */}
//         <div className="m-2 p-3">
//           {products && products.length < total && (
//             <button
//               className="btn loadmore"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setPage(page + 1);
//               }}
//             >
//               {loading ? "Loading ..." : "Explore more .."}
//             </button>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;

// HomePage.jsx — only the render section changed, all logic identical

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterBar from "../components/FilterBar/FilterBar";
import Slider from "react-slick";
import "../styles/Homepage.css";
import CustomizeProductCard from "../components/ProductCard/CustomizeProductCard";
import { useAuth } from "../context/auth";
import CustomizeDeleteProductCard from "../components/ProductCard/CustomizeDeleteProduct";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [slideProducts, setSlideProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buy, setBuy] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [auth, setAuth] = useAuth();
  // ── all your existing logic unchanged ────────────────────────────────────

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 760) setSlidesToShow(3);
      else if (w < 992) setSlidesToShow(5);
      else setSlidesToShow(7);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const initializeBuy = () => {
    const buyState = {};

    cart.forEach((item) => {
      const productId = item.productId;
      const qty = item.cartQuantity || 0;

      // If product already exists, add quantity
      if (buyState[productId]) {
        buyState[productId] += qty;
      } else {
        buyState[productId] = qty;
      }
    });

    setBuy(buyState);
  };
  useEffect(() => {
    initializeBuy();
  }, [cart]);
  const increaseQuantity = (pid) =>
    setBuy((prev) => ({ ...prev, [pid]: (prev[pid] || 0) + 1 }));

  const decreaseQuantity = (pid) =>
    setBuy((prev) => ({ ...prev, [pid]: Math.max((prev[pid] || 0) - 1, 0) }));

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAvlProducts();
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      setSlideProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllAvlProducts = async () => {
    try {
      let currentPage = 1;
      let allProducts = [];
      while (allProducts.length < total) {
        const { data } = await axios.get(
          `/api/v1/product/product-list/${currentPage}`,
        );
        allProducts = [...allProducts, ...data.products];
        currentPage++;
      }
      setSlideProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────

  // const handleAdd = (p) => {
  //   // increaseQuantity(p._id);
  //   increaseQuantity(p.cartItemId);
  //   const updated = [...cart, p];
  //   setCart(updated);
  //   const cartKey = `cart_${auth.user._id}`;
  //   console.log("auth home");
  //   console.log(auth);
  //   console.log("item added to cart : " + cartKey)
  //   // localStorage.setItem("cart", JSON.stringify(updated));
  //    localStorage.setItem(cartKey, JSON.stringify(updated));
  //   toast.success("Added to cart");
  // };

  const handleAdd = (p) => {
    try {
      // Compare customization dynamically
      // Ignore fields like "notes"
      const isSameCustomization = (c1 = {}, c2 = {}) => {
        const clean1 = Object.entries(c1)
          .filter(([key]) => key !== "notes")
          .sort();

        const clean2 = Object.entries(c2)
          .filter(([key]) => key !== "notes")
          .sort();

        return JSON.stringify(clean1) === JSON.stringify(clean2);
      };

      // Find existing cart item
      const existingIndex = cart.findIndex((item) => {
        return (
          item.productId === p.productId &&
          isSameCustomization(item.customization, p.customization)
        );
      });

      let updatedCart = [...cart];

      // Product already exists
      if (existingIndex !== -1) {
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],

          // increase cart quantity
          cartQuantity: (updatedCart[existingIndex].cartQuantity || 1) + p.cartQuantity,
        };

        toast.success("Quantity updated");
      } else {
        // Add new item
        updatedCart.push({
          ...p,
          // cartQuantity: 1,
        });

        toast.success("Added to cart");
      }

      // Update state
      setCart(updatedCart);

      // Save user-specific cart
      const cartKey = `cart_${auth.user._id}`;

      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      console.log("Updated cart:", updatedCart);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // const handleRemove = (p) => {
  //   decreaseQuantity(p.cartItemId);
  //   setDelProductId(p?._id);
  //   console.log("del prod id "+ delProductId);
  //    console.log("del prod id "+ p);
  //    console.log( p);
  //   const updated = [...cart];
  //   // const idx = updated.findIndex((item) => item._id === p._id);
  //   const idx = updated.findIndex((item) => item.cartItemId === p.cartItemId);
  //   if (idx > -1) updated.splice(idx, 1);
  //   setCart(updated);
  //   const cartKey = `cart_${auth.user._id}`;
  //   // localStorage.setItem("cart", JSON.stringify(updated));
  //   localStorage.setItem(cartKey, JSON.stringify(updated));
  //   setShowCustomizationDelete(true);
  // };
  const handleRemove = (p) => {
    setDelProductId(p?._id);
    setShowCustomizationDelete(true);
  };

  const updatedProductAfterReload = () => {
    cart?.forEach((item) => {
      increaseQuantity(item._id);
    });
  };
  // ── end of your existing logic ──

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

  const closeCustomizationModal = () => {
    setShowCustomizationModal(false);
    setCurrentProduct(null);
  };
  const closeCustomizationDelete = () => {
    setShowCustomizationDelete(false);
    setDelProductId(null);
  };

  const confirmCustomization = (product, selectedQuantity) => {
    const cartItem = {
      ...product, // keep for UI (name, image, etc.)
      productId: product._id, // important for backend
      customization: { ...customization },
      cartItemId: Date.now(), // unique id for each customization
      cartQuantity : selectedQuantity,
      addedOrUpdatedToCartAt:Date.now()
    };

    handleAdd(cartItem);
    // Close modal
    // closeCustomizationModal();
  };

  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [showCustomizationDelete, setShowCustomizationDelete] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [delProductId, setDelProductId]=useState("");
  const [customization, setCustomization] = useState({
    notes: "",
    thickness: "",
    sweetness: "",
    coffeeStrength: "",
  });

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Slider — unchanged */}
      <div className="slick-set">
        <Slider {...settings}>
          {slideProducts?.map((p) => (
            <div className="imgbox" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top-slide"
                alt={p.name}
                onClick={() => navigate(`/product/${p.slug}`)}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Filter bar */}
      <FilterBar
        categories={categories}
        prices={Prices}
        checked={checked}
        setChecked={setChecked}
        radio={radio}
        onCategory={handleFilter}
        onPrice={(val) => setRadio(val)}
        // onReset={() => window.location.reload()}
        onReset={() => {
          setChecked([]);
          setRadio([]);
        }}
      />

      {/* Products */}
      <div className="container-fluid mt-3">
        <h1
          className="text-center mb-3"
          style={{ color: "gray", fontFamily: "'Playfair Display', serif" }}
        >
          All Products
        </h1>

        {/* ✅ ProductCard now owns the pg-grid — no extra wrapper needed */}
        <div className="pg-grid">
          {products?.map((p) => (
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
          ))}
        </div>
        {showCustomizationModal && currentProduct && (
          <CustomizeProductCard
            p={currentProduct}
            confirmCustomization={confirmCustomization}
            closeCustomizationModal={closeCustomizationModal}
            customization={customization}
            setCustomization={setCustomization}
            currentProduct={currentProduct}
            closeCustomizationDelete={closeCustomizationDelete}
          />
        )}
        {showCustomizationDelete  && (
          <CustomizeDeleteProductCard
           productId={delProductId}
           closeCustomizationDelete = {closeCustomizationDelete}
          />
        )}
        {/* Load more */}
        <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Explore more .."}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
