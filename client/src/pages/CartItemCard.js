import React, { useState } from "react";
import "./CartItemCard.css";

/* ─── helpers ─────────────────────────────────── */
const productImage = (id) => `https://picsum.photos/seed/${id}/200/150`;

const CUSTOMIZATION_LABELS = {
  thickness:      { label: "Thickness",  icon: "◉" },
  sweetness:      { label: "Sweetness",  icon: "✦" },
  coffeeStrength: { label: "Strength",   icon: "⚡" },
  notes:          { label: "Notes",      icon: "✎" },
};

const activeCustomizations = (customization = {}) =>
  Object.entries(customization).filter(([, v]) => v && v.trim() !== "");

/* ─── StarRating ──────────────────────────────── */
const StarRating = ({ rating = 0 }) => (
  <span className="cic-stars" aria-label={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= Math.round(rating) ? "star star--on" : "star"}>★</span>
    ))}
  </span>
);

/* ─── CartItemCard ────────────────────────────── */
const CartItemCard = ({
  item,
  index,
  onRemove,
  onQuantityChange,
  maxQuantity = item?.quantity ?? 99,
}) => {
  const [qty, setQty]           = useState(item?.cartQuantity);
  const [removing, setRemoving] = useState(false);

  if (!item) return null;

  const {
    _id,
    cartItemId,
    name        = "—",
    price       = 0,
    averageRating = 0,
    totalReviews  = 0,
    customization,
  } = item;

  const customs      = activeCustomizations(customization);
  const hasCustom    = customs.length > 0;
  const lineTotal    = price * qty;
  const uniqueId     = cartItemId ?? _id;

  const increment = () => {
    if (qty >= maxQuantity) return;
    const next = qty + 1;
    setQty(next);
    onQuantityChange?.(uniqueId, next);
  };

  const decrement = () => {
    if (qty <= 1) return;
    const next = qty - 1;
    setQty(next);
    onQuantityChange?.(uniqueId, next);
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove?.(uniqueId), 320);
  };

  return (
    <article
      className={`cic${removing ? " cic--removing" : ""}`}
      aria-label={`Cart item: ${name}`}
    >
      {/* ── Top-right remove circle ── */}
      <button
        className="cic__remove"
        onClick={handleRemove}
        aria-label={`Remove ${name}`}
        title="Remove item"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {/* ── LEFT: small image → name → price ── */}
      <div className="cic__left">
        <div className="cic__image-wrap">
          <img
            src={`/api/v1/product/product-photo/${_id}`}
            onError={(e) => { e.target.onerror = null; e.target.src = productImage(_id); }}
            alt={name}
            className="cic__image"
          />
        </div>

        <p className="cic__name">{name}</p>

        <p className="cic__price">
          <span>₹</span>{price.toLocaleString("en-IN")}
        </p>
      </div>

      {/* ── vertical divider ── */}
      <div className="cic__divider" />

      {/* ── RIGHT: customization + rating + qty ── */}
      <div className="cic__right">

        {/* Rating */}
        <div className="cic__rating-row">
          <StarRating rating={averageRating} />
          <span className="cic__reviews">
            {totalReviews > 0 ? `(${totalReviews})` : "No reviews"}
          </span>
        </div>

        {/* Customization — only when values exist */}
        {hasCustom && (
          <div className="cic__customization">
            <p className="cic__customization-title">
              <span className="cic__customization-dot" />
              Customization
            </p>
            <ul className="cic__customization-list">
              {customs.map(([key, val]) => {
                const meta = CUSTOMIZATION_LABELS[key] ?? { label: key, icon: "·" };
                return (
                  <li key={key} className="cic__customization-item">
                    <span className="cic__cust-icon">{meta.icon}</span>
                    <span className="cic__cust-label">{meta.label}</span>
                    <span className="cic__cust-value">{val}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Qty stepper + line total */}
        <div className="cic__qty-row">
          <div className="cic__qty">
            <button
              className="cic__qty-btn"
              onClick={decrement}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >−</button>
            <span className="cic__qty-value">{qty}</span>
            <button
              className="cic__qty-btn"
              onClick={increment}
              disabled={qty >= maxQuantity}
              aria-label="Increase quantity"
            >+</button>
          </div>

          <div>
            <span className="cic__unit-price">₹{price.toLocaleString("en-IN")} × {qty}</span>
            <span className="cic__line-total">₹{lineTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>

      </div>
    </article>
  );
};

export default CartItemCard;
