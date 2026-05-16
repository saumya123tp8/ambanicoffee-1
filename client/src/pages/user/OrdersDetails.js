import React, { useState, useRef, useEffect } from "react";
import "./OrdersDetails.css";
import OrderTracker from "./OrderTracker";
import axios from "axios";
import ReportModel from "./ReportModel";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// const REPORT_ISSUES = [
//   "Wrong item delivered",
//   "Order not received",
//   "Poor packaging",
//   "Late delivery",
//   "Item quality issue",
//   "Missing items",
//   "Other",
// ];

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({ value, onChange, readonly = false, size = 28 }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="od-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`od-star ${readonly ? "readonly" : "interactive"}`}
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{
            fontSize: size,
            color: star <= display ? "#F7B731" : "rgba(255,255,255,0.15)",
            transform: !readonly && star <= hovered ? "scale(1.2)" : "scale(1)",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};
// ─── Report Modal ─────────────────────────────────────────────────────────────
// const ReportModal = ({ orderId, getReport, onClose }) => {
//   const [selected, setSelected] = useState(null);
//   const [note, setNote] = useState("");
//   const [submitted, setSubmitted] = useState(false);
   
//   if (submitted){
//     return (
//       <div className="od-overlay">
//         <div className="od-modal">
//           <div className="od-modal-success-icon">✅</div>
//           <h3 className="od-modal-success-title">Report Submitted</h3>
//           <p className="od-modal-success-sub">
//             Our support team will reach out within 24 hours.
//           </p>
//           <button className="od-btn-primary" onClick={onClose}>
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }else{
//   return (
//     <div className="od-overlay" onClick={onClose}>
//       <div className="od-modal" onClick={(e) => e.stopPropagation()}>
//         <h3 className="od-modal-title">Report an Issue</h3>
//         <p className="od-modal-sub">Order #{orderId}</p>

//         <div className="od-issue-list">
//           {REPORT_ISSUES.map((issue) => (
//             <div
//               key={issue}
//               className="od-issue-item"
//               onClick={() => setSelected(issue)}
//               style={{
//                 border: `1px solid ${selected === issue ? "#FF6B35" : "rgba(255,255,255,0.08)"}`,
//                 background:
//                   selected === issue
//                     ? "rgba(255,107,53,0.12)"
//                     : "rgba(255,255,255,0.03)",
//                 color: selected === issue ? "#FF6B35" : "#aaa",
//               }}
//             >
//               {issue}
//             </div>
//           ))}
//         </div>

//         <textarea
//           className="od-modal-textarea"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           placeholder="Additional details (optional)…"
//           rows={3}
//         />

//         <div className="od-modal-btns">
//           <button
//             className={`od-btn-primary ${!selected ? "disabled" : ""}`}
//             onClick={() => {selected && setSubmitted(true);getReport();}}
//           >
//             Submit Report
//           </button>
//           <button className="od-btn-ghost" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// };

// ─── Rating Modal ─────────────────────────────────────────────────────────────
const RatingModal = ({ order, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({});
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit({ ratings, review });
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="od-overlay">
        <div className="od-modal">
          <div className="od-modal-success-icon">🌟</div>
          <h3 className="od-modal-success-title">Thanks for your feedback!</h3>
          <p className="od-modal-success-sub">
            Your review helps other customers.
          </p>
          <button className="od-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );

  return (
    <div className="od-overlay" onClick={onClose}>
      <div
        className="od-modal od-modal-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="od-modal-title">Rate Your Order</h3>
        <p className="od-modal-sub" style={{ marginBottom: 20 }}>
          How was your experience?
        </p>

        {(order?.items || []).map((item, i) => (
          <div key={i} className="od-rating-item-card">
            <div className="od-rating-item-name">
              {item.product?.name || item.name}
            </div>
            <StarRating
              value={ratings[i] || 0}
              onChange={(val) => setRatings((r) => ({ ...r, [i]: val }))}
            />
          </div>
        ))}

        <textarea
          className="od-modal-textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review (optional)…"
          rows={3}
          style={{ marginBottom: 14 }}
        />

        <div className="od-modal-btns">
          <button className="od-btn-primary" onClick={handleSubmit}>
            Submit Rating
          </button>
          <button className="od-btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Invoice (hidden, for print) ──────────────────────────────────────────────
const InvoiceView = React.forwardRef(({ order }, ref) => {
  const items = order?.items || [];
  const subtotal =
    order?.subtotal ??
    items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const deliveryFee = order?.deliveryFee ?? 30;
  const discount = order?.discount ?? 0;
  const total = order?.total ?? subtotal + deliveryFee - discount;
  console.log("invoice recor")
  console.log(order)
  return (

    <div ref={ref} className="od-invoice-hidden">
      {/* Invoice styles are inline here intentionally — this renders in a new print window */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          color: "#111",
          padding: 40,
          background: "#fff",
          maxWidth: 600,
          margin: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #FF6B35",
            paddingBottom: 20,
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#FF6B35" }}>
              Bite.rush
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              Order Invoice
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 13 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>
              #{order?.orderId}
            </div>
            <div style={{ color: "#666", marginTop: 4 }}>
              {order?.placedAt || "N/A"}
            </div>
            <div style={{ color: "#666" }}>
              Payment: {order?.paymentMethod || "UPI"}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20, fontSize: 13 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Delivered To:</div>
          <div style={{ color: "#555" }}>
            {order?.customerName || "Customer"}
          </div>
          <div style={{ color: "#555" }}>{order?.deliveryAddress || "—"}</div>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 20,
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "10px 8px", textAlign: "left" }}>Item</th>
              <th style={{ padding: "10px 8px", textAlign: "center" }}>Qty</th>
              <th style={{ padding: "10px 8px", textAlign: "right" }}>
                Unit Price
              </th>
              <th style={{ padding: "10px 8px", textAlign: "right" }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 8px" }}>
                  {item.product?.name || item.name}
                </td>
                <td style={{ padding: "10px 8px", textAlign: "center" }}>
                  {item.quantity || 1}
                </td>
                <td style={{ padding: "10px 8px", textAlign: "right" }}>
                  ₹{item.price || item.product?.price}
                </td>
                <td style={{ padding: "10px 8px", textAlign: "right" }}>
                  ₹{(item.price || item.product?.price) * (item.quantity || 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginLeft: "auto", maxWidth: 220, fontSize: 13 }}>
          {[
            ["Subtotal", `₹${subtotal}`],
            ["Delivery Fee", `₹${deliveryFee}`],
            ...(discount > 0 ? [["Discount", `-₹${discount}`]] : []),
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                color: "#555",
              }}
            >
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0 0",
              borderTop: "2px solid #FF6B35",
              fontWeight: 700,
              fontSize: 16,
              color: "#FF6B35",
            }}
          >
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 11,
            color: "#aaa",
            textAlign: "center",
            borderTop: "1px solid #eee",
            paddingTop: 16,
          }}
        >
          Thank you for ordering with Bite.rush! This is a computer-generated
          invoice.
        </div>
      </div>
    </div>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
const OrdersDetails = ({ order }) => {
  const [showReport, setShowReport] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(order?.rating || null);
  const invoiceRef = useRef(null);
  const [ifReported, setIfReported] = useState(false);
  const [report, setReport] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  // Demo fallback — remove once real prop is passed
  const o = order;
  console.log("order");
  console.log(o);
  console.log("single order o " + o);
  console.log(o);
  const items = o.products || [];
  const subtotal =
    o.subtotal ?? items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const deliveryFee = o.deliveryFee ?? 30;
  const discount = o.discount ?? 0;
  const total = o.totalAmount ?? subtotal + deliveryFee - discount;
  const isDelivered = o.status === "delivered";
  const orderId = o.orderId || o._id?.toString().slice(-8).toUpperCase();
  const orderIdFull = o._id;
  const statusLabel = [
    "Order Placed",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ][o.status];
  const statusColor =
    o.status === "delivered"
      ? "#2EC4B6"
      : o.status === 3
        ? "#FF6B35"
        : "#F7B731";

  const handleDownloadInvoice = () => {
    const el = invoiceRef.current;
    if (!el) return;
    // el.style.display = "block";
    const win = window.open("", "_blank");
    win.document.write(
      `<html><head><title>Invoice #${orderId}</title></head><body>`,
    );
    win.document.write(el.innerHTML);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
    el.style.display = "none";
  };

const handlePrint = async () => {
  const el = invoiceRef.current;
  if (!el) return;

  // Temporarily make it visible (but off-screen)
  el.style.display = "block";
  el.style.position = "absolute";
  el.style.left = "-9999px";

  const canvas = await html2canvas(el, {
    scale: 2, // better quality
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210; // A4 width
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  // If content is long → multiple pages
  if (imgHeight > pageHeight) {
    let heightLeft = imgHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save(`Invoice_${orderId}.pdf`);

  // Hide again
  el.style.display = "none";
};
  const getReport = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/orderReport/get-order-report/${order._id}`,
        );

        if (data?.reports?.length > 0) {
          setIfReported(true);
          setReport(data.reports);
        }
      } catch (error) {
        console.log(error);
      }
    };
  useEffect(() => {
    getReport();
  }, [order._id]);
   useEffect(() => {
  }, [report]);
  return (
    <div className="od-root">
      {/* ── Header ── */}
      <div className="od-header">
        <div>
          <div className="od-header-title">
            Order <span>#{orderId}</span>
          </div>
          <div className="od-header-meta">
            Placed {o.placedAt}
            {o.deliveredAt ? ` · Delivered ${o.deliveredAt}` : ""}
          </div>
        </div>
        <span
          className="od-status-badge"
          style={{
            background: `${statusColor}18`,
            color: statusColor,
            border: `1px solid ${statusColor}30`,
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* ── Tracker ── */}
      <div className="od-card">
        <div className="od-section-label">📍 Delivery Tracking</div>
        console.log({o.status});
        <OrderTracker productStatus={o.status} size="sm" />
      </div>

      {/* ── Items ── */}
      <div className="od-card">
        <div className="od-section-label">🛍️ Items Ordered</div>
        {items.map((item, i) => {
          const p = item.product || {};
          const lineTotal = (item.price || p.price) * (item.quantity || 1);
          return (
            <div key={i} className="od-item-row">
              <div className="od-item-icon">🍽️</div>
              <div className="od-item-info">
                <div className="od-item-name">{p.name || item.name}</div>
                <div className="od-item-desc">
                  {p.description?.slice(0, 56)}
                  {p.description?.length > 56 ? "…" : ""}
                </div>
                {p.averageRating && (
                  <div className="od-item-rating">
                    {"★".repeat(Math.round(p.averageRating))}
                    {"☆".repeat(5 - Math.round(p.averageRating))}
                    <span>({p.totalReviews} reviews)</span>
                  </div>
                )}
              </div>
              <div className="od-item-price">
                <div className="od-item-price-total">₹{lineTotal}</div>
                <div className="od-item-price-unit">
                  ₹{item.price || p.price} × {item.quantity || 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bill ── */}
      <div className="od-card">
        <div className="od-bill-header">
          <div className="od-section-label" style={{ marginBottom: 0 }}>
            🧾 Bill Summary
          </div>
          <button className="od-btn-ghost-sm" onClick={handlePrint}>
            ⬇ Download Invoice
          </button>
        </div>

        {[
          ["Subtotal", `₹${subtotal}`],
          ["Delivery Fee", `₹${deliveryFee}`],
          ...(discount > 0 ? [["Discount Applied", `-₹${discount}`]] : []),
        ].map(([k, v]) => (
          <div key={k} className="od-bill-row">
            <span>{k}</span>
            <span>{v}</span>
          </div>
        ))}

        <div className="od-bill-total">
          <span>Total Paid</span>
          <span className="od-bill-total-amount">₹{total}</span>
        </div>

        <div className="od-payment-row">
          <div className="od-payment-row-left">
            <span className="od-payment-icon">⚡</span>
            <div>
              <div className="od-payment-method">
                {o.paymentMethod || "UPI"}
              </div>
              <div className="od-payment-sublabel">Payment Method</div>
            </div>
          </div>
          <span className="od-payment-status">{o.paymentStatus || "Paid"}</span>
        </div>
      </div>

      {/* ── Address ── */}
      <div className="od-card">
        <div className="od-section-label">📍 Delivery Address</div>
        <div className="od-address-text">{o.deliveryAddress || "—"}</div>
      </div>

      {/* ── Rating ── */}
      {isDelivered && (
        <div className="od-card">
          <div className="od-section-label">⭐ Rate Your Order</div>
          {userRating ? (
            <>
              <div className="od-rated-label">You rated this order</div>
              <StarRating value={userRating} readonly size={32} />
              {o.review && <div className="od-review-quote">"{o.review}"</div>}
            </>
          ) : (
            <>
              <div className="od-rating-prompt">
                Haven't rated yet — share your experience!
              </div>
              <button
                className="od-btn-primary"
                onClick={() => setShowRating(true)}
              >
                ✍️ Rate &amp; Review
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Actions ── */}
      <div className="od-actions">
        <button className="od-btn-primary">🔄 Order Again</button>
        <button className="od-btn-ghost" onClick={() => setShowReport(true)}>
          🚩 Report Issue
        </button>
        <button className="od-btn-ghost" onClick={handlePrint}>
          🧾 Get Invoice
        </button>
        {/* <button className="od-btn-ghost" onClick={()=>setShowInvoice(true)}>
          🧾 Get Invoice
        </button> */}
      </div>

      {/* ── Modals ── */}
      {showReport && (
        // <ReportModel orderId={orderId} getReport={getReport} onClose={() => setShowReport(false)} />
        <ReportModel orderId={orderIdFull} onClose={() => setShowReport(false)} />
      )}
      {showRating && (
        <RatingModal
          order={o}
          onClose={() => setShowRating(false)}
          onSubmit={({ ratings }) => {
            const avg = Object.values(ratings);
            const mean = avg.length
              ? avg.reduce((a, b) => a + b, 0) / avg.length
              : 0;
            setUserRating(Math.round(mean));
          }}
        />
      )}

      {/* ── Print invoice target (hidden) ── */}
      <InvoiceView
        ref={invoiceRef}
        order={{ ...o, subtotal, deliveryFee, discount, total, orderId }}
      />
      {/* {showInvoice && (
  <div className="od-card">
    <div className="od-section-label">🧾 Invoice</div>

  
    <InvoiceView
        ref={invoiceRef}
        order={{ ...o, subtotal, deliveryFee, discount, total, orderId }}
    />
    <div className="d-flex justify-content-between">

    <button className="od-btn-primary" onClick={handlePrint}>
      🖨️ Print 
    </button>
    <button className="od-btn-primary" onClick={()=>setShowInvoice(false)}>
      close 
    </button>
    </div>
  </div>
    )} */}
      <div>
        {ifReported && report && report.map((report,i)=>(
          <div className="od-card">
            <div className="od-section-label">🚨 Report Status</div>

            <div style={{ marginBottom: 8 }}>
              Status:
              <span
                style={{
                  marginLeft: 6,
                  fontWeight: 600,
                  color:
                    report.Status === "Solved"
                      ? "#2EC4B6"
                      : report.Status === "Under-Review"
                        ? "#F7B731"
                        : "#FF6B35",
                }}
              >
                {report.Status}
              </span>
            </div>
            <div>
              <h1>Category :  {report.Category}</h1>
              <p>Note : {report.Note}</p>
              <span>{report.createdOn}</span>
            </div>

            {/* Resolution list (from order model) */}
            {/* {o.resolution && o.resolution.length > 0 && (
              <ul style={{ fontSize: 13 }}>
                {o.resolution.map((r, i) => (
                  <li key={i}>{r.text}</li>
                ))}
              </ul>
            )} */}
            {o.Note && (
              <ul style={{ fontSize: 13 }}>
                <li>o.Note</li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDetails;
