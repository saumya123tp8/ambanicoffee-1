import React, {useState} from "react";
import axios from "axios";

 const REPORT_ISSUES = [
  'Wrong item delivered',
  'Order not received',
  'Poor packaging',
  'Late delivery',
  'Other',
]

const ReportModel = ({ orderId, onClose }) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("orderId");
  console.log(orderId);
  const handleSubmit = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      await axios.post("/api/v1/orderReport/report-order", {
        OrderId: orderId,
        Category: selected,
        Note: note,
      });

      setStep(1); // success screen
    } catch (error) {
      console.log(error);
      alert("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success Screen
  if (step === 1) {
    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3 className="modal-title">Issue Reported ✓</h3>
          <p className="modal-sub">
            Our team will reach out within 24 hrs.
          </p>
          <button className="modal-btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main Modal
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Report an Issue</h3>
        <p className="modal-sub">Order #{orderId}</p>

        {/* Issues */}
        <div className="modal-issue-list">
          {REPORT_ISSUES.map((issue) => (
            <div
              key={issue}
              className="modal-issue-item"
              onClick={() => setSelected(issue)}
              style={{
                border:
                  selected === issue
                    ? "1px solid #FF6B35"
                    : "1px solid rgba(255,255,255,0.1)",
                background:
                  selected === issue
                    ? "rgba(255,107,53,0.12)"
                    : "rgba(255,255,255,0.04)",
                color: selected === issue ? "#FF6B35" : "#c0bdb6",
              }}
            >
              {issue}
            </div>
          ))}
        </div>

        {/* Note */}
        <textarea
          className="modal-textarea"
          placeholder="Additional details..."
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Buttons */}
        <div className="modal-btns">
          <button
            className="modal-btn-primary"
            disabled={!selected || loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

          <button className="modal-btn-sec" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModel;