// ProductCard.jsx
// Desktop/tablet: vertical card grid (4 → 3 → 2 cols)
// Mobile (≤540px): horizontal card — image left, content right

import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import CustomizeProductCard from "./CustomizeProductCard";

export default function ProductCard({
  p,
  cart,
  setCart,
  buy,
  increaseQuantity,
  decreaseQuantity,
  navigate,
  toast,
  handleAdd,
  handleRemove,
  openCustomizationModal

}) {
 
  return (
    // <>
    //   {showCustomizationModal && currentProduct ? (
    //     <CustomizeProductCard
    //     p={p}
    //     confirmCustomization={confirmCustomization}
    //     closeCustomizationModal={closeCustomizationModal}
    //     openCustomizationModal={openCustomizationModal}
    //     customization={customization}
    //     setCustomization={setCustomization}
    //     currentProduct={currentProduct}
    //     />
    //   ) : (
        <article className="pg-card" key={p._id}>
          <div
            className="pg-img-wrap"
            onClick={() => navigate(`/product/${p.slug}`)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${p.name}`}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/product/${p.slug}`)
            }
          >
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              alt={p.name}
              loading="lazy"
            />
            <div className="pg-img-overlay">
              <span className="pg-overlay-label">View Details</span>
            </div>
            {p.price <= 30 && <span className="pg-badge">Best Value</span>}
          </div>

          {/* Card body */}
          <div className="pg-body">
            <div className="pg-header">
              <h2 className="pg-name">{p.name}</h2>
              <span className="pg-price">
                {p.price.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <p className="pg-desc">{p.description.substring(0, 90)}</p>

            <div className="pg-divider" />

            <div className="pg-actions">
              {buy[p._id] >= 1 ? (
                <div className="pg-stepper">
                  <button
                    className="pg-step-btn"
                    aria-label="Remove one"
                    onClick={() => handleRemove(p)}
                  >
                    −
                  </button>
                  <input
                    className="pg-step-num"
                    type="number"
                    readOnly
                    value={buy[p._id] || 0}
                    aria-label="Quantity"
                  />
                  <button
                    className="pg-step-btn"
                    aria-label="Add one more"
                    onClick={() => openCustomizationModal(p)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="pg-btn-cart"
                  onClick={() => openCustomizationModal(p)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </article>
      // )}
    // </>
  );
}
