import React from "react";
  const TRACK_STEPS = [
   "Order Placed", "Processing", "Shipped", "deliverd", "cancel"
  ];
  const OrderTracker = ({ productStatus, size = "lg" }) => {
    const dotClass = size === "lg" ? "step-dot" : "step-dot-sm";
    const colClass = size === "lg" ? "tracker-step-col" : "tracker-step-col-sm";
    const labelClass = size === "lg" ? "step-label" : "step-label-sm";
    const lineClass = size === "lg" ? "step-line" : "step-line-sm";
    // const productStatus=2;
    // status = 3;
    let status = TRACK_STEPS.indexOf(productStatus);
   
    return (
      <div className="tracker-wrap">
        {TRACK_STEPS.map((step, i) => (
          <React.Fragment key={step}>
            <div className={colClass}>
              <div
                className={dotClass}
                style={{
                  background:
                    i <= status ? "#FF6B35" : "rgba(255,255,255,0.08)",
                  color: i <= status ? "white" : "#555",
                  boxShadow:
                    i === status ? "0 0 12px rgba(255,107,53,0.5)" : "none",
                }}
              >
                {i <= status ? "✓" : size === "lg" ? i + 1 : ""}
              </div>
              <div
                className={labelClass}
                style={{ color: i <= status ? "#FF6B35" : "#555" }}
              >
                {step}
              </div>
            </div>
            {i < TRACK_STEPS.length - 1 && (
              <div
                className={lineClass}
                style={{
                  background: i < status ? "#FF6B35" : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
export default OrderTracker;