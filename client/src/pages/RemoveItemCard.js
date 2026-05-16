import React, { useEffect, useState } from "react";

const RemoveItemCard = (activeTags, item, onRemove, onQtyChange, maxQty = 20) =>{ 
 const [qty, setQty] = useState(
    item.cartQuantity ?? item.selectedQty ?? 1
  );

  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    setQty(item.cartQuantity ?? item.selectedQty ?? 1);
  }, [item]);

  const price = item.price ?? 0;
  const lineTotal = price * qty;

  const tags = activeTags?.(item.customization) || [];

  const hasCustom =
    tags.length > 0 ||
    item.customization?.notes?.trim();

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

export default RemoveItemCard;