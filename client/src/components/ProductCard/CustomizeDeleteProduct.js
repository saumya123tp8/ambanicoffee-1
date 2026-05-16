import React, { useMemo, useState } from "react";
import "./CustomizeDeleteProductCard.css";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import RemoveItemCard from "../../pages/RemoveItemCard";
/* ─── helpers ───────────────────────────────── */
const CUST_LABELS = {
  thickness:      { label: "Thickness",   icon: "◉" },
  sweetness:      { label: "Sweetness",   icon: "✦" },
  coffeeStrength: { label: "Strength",    icon: "⚡" },
};

const activeTags = (customization = {}) =>
  Object.entries(CUST_LABELS)
    .filter(([key]) => customization[key]?.trim())
    .map(([key, meta]) => ({ ...meta, value: customization[key] }));

/* ─── Single item row ────────────────────────── */
function CartItemRow({ item, onRemove, onQtyChange, maxQty = 20 }) {
  const [qty, setQty]         = useState(item.cartQuantity ?? item.selectedQty ?? 1);
  const [removing, setRemoving] = useState(false);

  const price    = item.price ?? 0;
  const lineTotal = price * qty;
  const tags      = activeTags(item.customization);
  const hasCustom = tags.length > 0 || item.customization?.notes?.trim();

  const increment = () => {
    if (qty >= maxQty) return;
    const next = qty + 1;
    setQty(next);
    onQtyChange?.(item.cartItemId, next);
  };

  const decrement = () => {
    if (qty <= 1) return;
    const next = qty - 1;
    setQty(next);
    onQtyChange?.(item.cartItemId, next);
  };

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.cartItemId), 300);
  };

  return (
    <div className={`cdp-item${removing ? " cdp-item--removing" : ""}`}>

      {/* ── Top: name | price | qty stepper | line total ── */}
      <div className="cdp-item__top">

        <p className="cdp-item__name" title={item.name}>{item.name}</p>

        <p className="cdp-item__price">
          <span>₹</span>{price.toLocaleString("en-IN")}
        </p>

        {/* Qty stepper */}
        <div className="cdp-item__qty-stepper">
          <button
            className="cdp-qty-btn"
            onClick={decrement}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >−</button>
          <span className="cdp-qty-value">{qty}</span>
          <button
            className="cdp-qty-btn"
            onClick={increment}
            disabled={qty >= maxQty}
            aria-label="Increase quantity"
          >+</button>
        </div>

        {/* Line total */}
        <div className="cdp-item__total">
          <span className="cdp-item__total-unit">
            ₹{price.toLocaleString("en-IN")} × {qty}
          </span>
          ₹{lineTotal.toLocaleString("en-IN")}
        </div>

      </div>

      {/* ── Customization strip (only if values exist) ── */}
      {hasCustom && (
        <div className="cdp-item__custom">
          {/* <span className="cdp-item__custom-label"> */}
            {/* <span className="cdp-item__custom-dot" />
            Customization */}
          {/* </span> */}

          {tags.map(({ label, icon, value }) => (
            <span key={label} className="cdp-item__custom-tag">
              {icon} <b>{label}</b> {value}
            </span>
          ))}

          {item.customization?.notes?.trim() && (
            <p className="cdp-item__custom-notes">
              <b>Notes:</b> {item.customization.notes}
            </p>
          )}
        </div>
      )}

      {/* ── Remove button ── */}
      <div className="cdp-item__actions">
        <button
          className="cdp-btn-remove"
          onClick={handleRemove}
          aria-label={`Remove this customization of ${item.name}`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Remove This Item
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}

/* ─── Main modal ─────────────────────────────── */
export default function CustomizeDeleteProductCard({
  parent="Home",
  productId,
  closeCustomizationDelete,
}) {
  const [cart, setCart] = useCart();
  const [auth]          = useAuth();

  const productItems = useMemo(
    () => cart.filter((item) => item.productId === productId),
    [cart, productId]
  );

  // First item for the header title
  const productName = productItems[0]?.name ?? "Product";

  const handleRemoveItem = (cartItemId) => {
    try {
      const updated = cart.filter((item) => item.cartItemId !== cartItemId);
      setCart(updated);

      const cartKey = `cart_${auth?.user?._id}`;
      localStorage.setItem(cartKey, JSON.stringify(updated));

      const remaining = updated.filter((item) => item.productId === productId);
      if (remaining.length === 0) closeCustomizationDelete();

    } catch (err) {
      console.error(err);
    }
  };

  const handleQtyChange = (cartItemId, newQty) => {
    try {
      const updated = cart.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, cartQuantity: newQty, selectedQty: newQty, addedOrUpdatedToCartAt:Date.now() }
          : item
      );
      setCart(updated);
      const cartKey = `cart_${auth?.user?._id}`;
      localStorage.setItem(cartKey, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return parent === "customizeAdd" ? (
  // embedded mode (no popup)
  <div className="cdp-inline">

    <div className="cdp-header">
      <div className="cdp-header__left">
            <h3 className="cdp-header__title">{productName}</h3>
            <p className="cdp-header__subtitle">
              {productItems.length} {productItems.length === 1 ? "variant" : "variants"} we have — change current or add new
            </p>
      </div>
    </div>

    <div className="cdp-body">
      {productItems.length === 0 ? (
        <div className="cdp-empty">
          No items added yet
        </div>
      ) : (
        productItems.map((item) => (
          <CartItemRow
            key={item.cartItemId}
            item={item}
            onRemove={handleRemoveItem}
            onQtyChange={handleQtyChange}
          />
        ))
      )}
    </div>

  </div>

) : (
    <div
      className="customization-modal-overlay"
      onClick={closeCustomizationDelete}
    >
      <div
        className="customization-modal delete-customization-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div className="cdp-header">
          <div className="cdp-header__left">
            <h3 className="cdp-header__title">{productName}</h3>
            <p className="cdp-header__subtitle">
              {productItems.length} customized {productItems.length === 1 ? "variant" : "variants"} in cart — select which to remove
            </p>
          </div>
          <button
            className="cdp-header__close"
            onClick={closeCustomizationDelete}
            aria-label="Close"
          >×</button>
        </div>

        {/* ── Body ── */}
        <div className="cdp-body">
          {productItems.length === 0 ? (
            <div className="cdp-empty">No items available</div>
          ) : (
            productItems.map((item) => (
              <>
              <CartItemRow
                key={item.cartItemId}
                item={item}
                onRemove={handleRemoveItem}
                onQtyChange={handleQtyChange}
              />
              {/* <RemoveItemCard
                key={item.cartItemId}
                activeTags={activeTags}
                item={item}
                onRemove={handleRemoveItem}
                onQtyChange={handleQtyChange}
              /> */}
              </>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        <div className="cdp-footer">
          <button
            className="cdp-btn-close"
            onClick={closeCustomizationDelete}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
