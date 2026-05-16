import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  FaStar,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheckCircle,
} from "react-icons/fa";
import CustomizeProductCard from "../components/ProductCard/CustomizeProductCard";
import { useAuth } from "../context/auth";
import CustomizeDeleteProductCard from "../components/ProductCard/CustomizeDeleteProduct";

const StarRating = ({ rating }) => {
  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <FaStar key={star} className="text-warning" />
        ) : (
          <FaRegStar key={star} className="text-muted" />
        ),
      )}
    </div>
  );
};

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [buy, setBuy] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCustomizationDelete, setShowCustomizationDelete] = useState(false);
  const [delProductId, setDelProductId] = useState("");
  const [customization, setCustomization] = useState({
    notes: "",
    thickness: "",
    sweetness: "",
    coffeeStrength: "",
  });

  const [showCustomizationModal, setShowCustomizationModal] = useState(false);

  const [currentProduct, setCurrentProduct] = useState(null);

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: relatedProducts.length > 4,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
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
      centerMode: true,
      centerPadding: "10px",
    }),
    [relatedProducts],
  );
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
          cartQuantity: (updatedCart[existingIndex].cartQuantity || 1) + 1,
        };

        toast.success("Quantity updated");
      } else {
        // Add new item
        updatedCart.push({
          ...p,
          cartQuantity: 1,
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

  const confirmCustomization = (product) => {
    const cartItem = {
      ...product, // keep for UI (name, image, etc.)
      productId: product._id, // important for backend
      customization: { ...customization },
      cartItemId: Date.now(), // unique id for each customization
      addedOrUpdatedToCartAt:Date.now()
    };
    console.log("buy");
    console.log(buy);
    console.log("cartItem");
    console.log(cartItem);

    handleAdd(cartItem);
    // Close modal
    closeCustomizationModal();
  };
  const getProduct = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`,
      );

      setProduct(data?.product);

      if (data?.product?._id && data?.product?.category?._id) {
        getSimilarProduct(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`,
      );

      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviews = async () => {
    try {
      setShowReviews(!showReviews);

      const { data } = await axios.get(
        `/api/v1/productReview/product-review/${product._id}/`,
      );

      setReviews(data?.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };
  const increaseQuantity = (pid) =>
    setBuy((prev) => ({ ...prev, [pid]: (prev[pid] || 0) + 1 }));

  const decreaseQuantity = (pid) =>
    setBuy((prev) => ({ ...prev, [pid]: Math.max((prev[pid] || 0) - 1, 0) }));

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  if (loading) {
    return (
      <Layout>
        <div className="product-loader">
          <div className="loader-box"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product?.name}>
      <div className="container py-4 product-page">
        {/* Breadcrumb */}
        <div className="breadcrumb-box mb-4">
          {product?.category?.name} / {product?.name}
        </div>

        <div className="row g-4">
          {/* Image */}
          <div className="col-lg-6">
            <div className="product-image-card">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="product-main-image"
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-lg-6">
            <div className="product-info-card">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-success">In Stock</span>

                <span className="badge bg-danger">20% OFF</span>
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="d-flex align-items-center gap-3 mb-3">
                <StarRating rating={product.averageRating} />

                <span className="rating-text">
                  ({product.totalReviews} Reviews)
                </span>
              </div>

              <h2 className="product-price">
                {product?.price?.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h2>

              <p className="product-description">{product.description}</p>
              {/* Quantity */}

              {/* Buttons */}
              <div className="product-btn-group">
                {buy[product._id] >= 1 ? (
                  <div className="pg-stepper">
                    <button
                      className="pg-step-btn"
                      aria-label="Remove one"
                      onClick={() => handleRemove(product)}
                    >
                      −
                    </button>
                    <input
                      className="pg-step-num"
                      type="number"
                      readOnly
                      value={buy[product._id] || 0}
                      aria-label="Quantity"
                    />
                    <button
                      className="pg-step-btn"
                      aria-label="Add one more"
                      onClick={() => openCustomizationModal(product)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="pg-btn-cart"
                    onClick={() => openCustomizationModal(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Features */}
              <div className="features-grid">
                <div className="feature-card">
                  <FaTruck />
                  <span>Fast Delivery</span>
                </div>

                <div className="feature-card">
                  <FaShieldAlt />
                  <span>Secure Payment</span>
                </div>

                <div className="feature-card">
                  <FaUndo />
                  <span>Easy Return</span>
                </div>

                <div className="feature-card">
                  <FaCheckCircle />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-accordion mt-4">
          {/* Product Details */}
          <div className="accordion-item-custom">
            <button
              className="accordion-header-custom"
              onClick={() =>
                setOpenAccordion(openAccordion === "details" ? "" : "details")
              }
            >
              <span>📋 Product Details</span>

              <span>{openAccordion === "details" ? "⌃" : "⌵"}</span>
            </button>

            {openAccordion === "details" && (
              <div className="accordion-body-custom">
                <div className="detail-row">
                  <span>Category</span>
                  <span>{product?.category?.name}</span>
                </div>

                <div className="detail-row">
                  <span>Quantity</span>
                  <span>250 ml</span>
                </div>

                <div className="detail-row">
                  <span>Ingredients</span>
                  <span>Milk, Coffee, Sugar</span>
                </div>

                <div className="detail-row">
                  <span>Calories</span>
                  <span>180 kcal</span>
                </div>

                <div className="detail-row">
                  <span>Protein</span>
                  <span>8g</span>
                </div>

                <div className="detail-row">
                  <span>Fat</span>
                  <span>5g</span>
                </div>

                <div className="detail-row">
                  <span>Carbohydrates</span>
                  <span>22g</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Instructions */}
          <div className="accordion-item-custom">
            <button
              className="accordion-header-custom"
              onClick={() =>
                setOpenAccordion(openAccordion === "delivery" ? "" : "delivery")
              }
            >
              <span>🚚 Delivery Instructions</span>

              <span>{openAccordion === "delivery" ? "⌃" : "⌵"}</span>
            </button>

            {openAccordion === "delivery" && (
              <div className="accordion-body-custom">
                <ul>
                  <li>Delivery within 25-30 minutes</li>

                  <li>Contactless delivery available</li>

                  <li>Ensure phone is reachable</li>

                  <li>Live order tracking available</li>
                </ul>
              </div>
            )}
          </div>

          {/* Return Policy */}
          <div className="accordion-item-custom">
            <button
              className="accordion-header-custom"
              onClick={() =>
                setOpenAccordion(openAccordion === "return" ? "" : "return")
              }
            >
              <span>🔄 Return Policy</span>

              <span>{openAccordion === "return" ? "⌃" : "⌵"}</span>
            </button>

            {openAccordion === "return" && (
              <div className="accordion-body-custom">
                <ul>
                  <li>Easy 7-day return policy</li>

                  <li>Damaged items eligible for replacement</li>

                  <li>Refund processed within 3-5 business days</li>

                  <li>Product should remain unused</li>
                </ul>
              </div>
            )}
          </div>

          {/* Customization */}
          <div className="accordion-item-custom">
            <button
              className="accordion-header-custom"
              onClick={() =>
                setOpenAccordion(openAccordion === "custom" ? "" : "custom")
              }
            >
              <span>✨ Customization Options</span>

              <span>{openAccordion === "custom" ? "⌃" : "⌵"}</span>
            </button>

            {openAccordion === "custom" && (
              <div className="accordion-body-custom">
                <ul>
                  <li>Choose sweetness level</li>

                  <li>Select coffee strength</li>

                  <li>Add custom notes</li>

                  <li>Extra toppings available</li>
                </ul>
              </div>
            )}
          </div>

          {/* Storage */}
          <div className="accordion-item-custom">
            <button
              className="accordion-header-custom"
              onClick={() =>
                setOpenAccordion(openAccordion === "storage" ? "" : "storage")
              }
            >
              <span>🧊 Storage Information</span>

              <span>{openAccordion === "storage" ? "⌃" : "⌵"}</span>
            </button>

            {openAccordion === "storage" && (
              <div className="accordion-body-custom">
                <ul>
                  <li>Keep refrigerated below 5°C</li>

                  <li>Consume within 24 hours</li>

                  <li>Avoid direct sunlight</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Reviews */}
        <div className="reviews-section mt-5">
          <div className="reviews-header" onClick={getAllReviews}>
            <h4>Reviews ({product.totalReviews})</h4>

            {/* <button
              className="btn btn-outline-dark"
              onClick={getAllReviews}
            > */}
            <span>{"⌵"} </span>
            {/* </button> */}
          </div>

          {showReviews &&
            reviews.map((review) => (
              <div className="review-card" key={review._id}>
                <div className="review-top">
                  <div className="review-avatar">
                    {review?.userId?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <h6>{review?.userId?.name}</h6>

                    <small>Verified Purchase</small>
                  </div>
                </div>

                <div className="mt-2">
                  <StarRating rating={review.rating} />
                </div>

                <p className="review-text">{review.comment}</p>
              </div>
            ))}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section mt-5">
            <h2 className="section-title">Similar Products</h2>

            <Slider {...sliderSettings}>
              {relatedProducts.map((p) => (
                <div key={product._id} className="px-2">
                  <ProductCard
                    key={product._id}
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
        )}

        {/* Mobile Sticky Bar */}
        <div className="mobile-buy-bar d-lg-none">
          {buy[product._id] >= 1 ? (
            <div className="pg-stepper">
              <button
                className="pg-step-btn"
                aria-label="Remove one"
                onClick={() => handleRemove(product)}
              >
                −
              </button>
              <input
                className="pg-step-num"
                type="number"
                readOnly
                value={buy[product._id] || 0}
                aria-label="Quantity"
              />
              <button
                className="pg-step-btn"
                aria-label="Add one more"
                onClick={() => openCustomizationModal(product)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="pg-btn-cart"
              onClick={() => openCustomizationModal(product)}
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Customization Modal */}
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
        {showCustomizationDelete && (
          <CustomizeDeleteProductCard
            productId={delProductId}
            closeCustomizationDelete={closeCustomizationDelete}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
