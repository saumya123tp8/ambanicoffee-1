// ProductCard.jsx
// Desktop/tablet: vertical card grid (4 → 3 → 2 cols)
// Mobile (≤540px): horizontal card — image left, content right

import React, { useEffect, useState } from "react";
import "./CustomizeProductCard.css";
import toast from "react-hot-toast";
import CustomizeDeleteProductCard from "./CustomizeDeleteProduct";

export default function CustomizeProductCard({
  p,
  confirmCustomization,
  closeCustomizationModal,
  openCustomizationModal,
  customization,
  setCustomization,
  currentProduct,
  closeCustomizationDelete

}) {

  const [selectedQuantity, setSelectedQuantity] =useState(0);

  return (
        <div
          className="customization-modal-overlay"
          onClick={() => closeCustomizationModal()}
        >
          <div
            className="customization-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Customize your {currentProduct.name}</h3>
              <button
                className="modal-close"
                onClick={() => closeCustomizationModal()}
                aria-label="Close customization"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* Notes textarea */}
              {/* <div className="customization-group">
                <label htmlFor="notes">Special Notes</label>
                <textarea
                  id="notes"
                  placeholder="Any special instructions..."
                  value={customization.notes}
                  onChange={(e) =>
                    setCustomization({
                      ...customization,
                      notes: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div> */}

              {/* Thickness options */}
              <div className="customization-group">
                <label>Thickness</label>
                <div className="option-buttons">
                  {["Thin", "Thick", "Extra Thick"].map((option) => (
                    <button
                      key={option}
                      className={`option-btn ${customization.thickness === option ? "active" : ""}`}
                      onClick={() =>
                        setCustomization({
                          ...customization,
                          thickness: option,
                        })
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness options */}
              <div className="customization-group">
                <label>Sweetness</label>
                <div className="option-buttons">
                  {["Sugar Free", "Light", "Medium", "Heavy"].map((option) => (
                    <button
                      key={option}
                      className={`option-btn ${customization.sweetness === option ? "active" : ""}`}
                      onClick={() =>
                        setCustomization({
                          ...customization,
                          sweetness: option,
                        })
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coffee strength options */}
              <div className="customization-group">
                <label>Coffee Strength</label>
                <div className="option-buttons">
                  {["Mild", "Medium", "Dark"].map((option) => (
                    <button
                      key={option}
                      className={`option-btn ${customization.coffeeStrength === option ? "active" : ""}`}
                      onClick={() =>
                        setCustomization({
                          ...customization,
                          coffeeStrength: option,
                        })
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              
              {selectedQuantity >= 1 ? (
                <div className="pg-stepper">
                  <button
                    className="pg-step-btn"
                    aria-label="Remove one"
                    onClick={() => {setSelectedQuantity(selectedQuantity-1)}}
                  >
                    −
                  </button>
                  <input
                    className="pg-step-num"
                    type="number"
                    readOnly
                    value={selectedQuantity}
                    aria-label="Quantity"
                  />
                  <button
                    className="pg-step-btn"
                    aria-label="Add one more"
                    onClick={() => {setSelectedQuantity(selectedQuantity+1)}}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="pg-btn-cart"
                  onClick={() => {setSelectedQuantity(selectedQuantity+1)}}
                >
                  Add Quantity
                </button>
              )}
             <button
                className="btn-cancel"
                onClick={() => closeCustomizationModal()}
              >
                Confirm Below Order
              </button>
              <button
                className="btn-confirm"
                onClick={() => {
                  setCustomization({
                         
                        });
                  setSelectedQuantity(0);
                  confirmCustomization(currentProduct, selectedQuantity);
                }}
                disabled={selectedQuantity<=0}
              >
                Add new to Cart
              </button>
            </div>
          <div className="modal-current">
              <CustomizeDeleteProductCard
               parent={"customizeAdd"}
               productId={p?._id}
               closeCustomizationDelete={closeCustomizationDelete}
              />
          </div>
          </div>
        </div>
  );
}
