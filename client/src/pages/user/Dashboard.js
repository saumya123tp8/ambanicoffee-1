// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import UserMenu from '../../components/Layout/UserMenu'
// import '../../styles/dashbrd.css'
// import { useAuth } from '../../context/auth'
// const Dashboard = () => {
//   const [auth]=useAuth()
//   return (
//          <Layout>
//     <div className='container-fluid m-3 p-3 dashbrd'>
//         <div className='row'>
//             <div className='col-md-3'>
//                 <UserMenu/>
//             </div>
//             <div className='col-md-4'>
//                 <div className='card w-75 p-3'>
//                  <h4>name : {auth?.user?.name}</h4>
//                  <h4>email : {auth?.user?.email}</h4>
//                  <h4>address : {auth?.user?.address}</h4>
//                 </div>
//             </div>
//             {/* <div className='col-md-5'>
//                 <h1>photo</h1>
//             </div> */}
//         </div>
//     </div>
//    </Layout>
      
//   )
// }

// export default Dashboard


import axios from "axios";
import React, { useEffect, useState } from 'react'
import './dashboard.css'
import Layout from '../../components/Layout/Layout'
import Orders from './Orders'
import OrdersDetails from './OrdersDetails'
import OrderTracker from './OrderTracker'
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import ReportModel from "./ReportModel";
// ─── Dummy Auth ────────────────────────────────────────────────────────────────
// Replace with: const [auth] = useAuth()
 


// ─── Active Orders ──────────────────────────────────────────────────────────────
// status: 0=placed | 1=confirmed | 2=preparing | 3=out_for_delivery | 4=delivered
//  const activeOrders = [
//   {
//     id: 'ORD-9821',
//     items: ['Butter Chicken', 'Garlic Naan x2', 'Raita'],
//     restaurant: 'Spice Garden',
//     total: 549,
//     eta: '12 mins',
//     status: 3,
//     placedAt: '7:42 PM',
//   },
// ]


// ─── Offers ─────────────────────────────────────────────────────────────────────
 const offers = [
  { code: 'FIRST50', desc: '50% off on your next order', expiry: '10 Apr', color: '#FF6B35' },
  { code: 'FREEDEL', desc: 'Free delivery all week', expiry: '7 Apr', color: '#2EC4B6' },
  { code: 'SAVE100', desc: '₹100 off on orders above ₹499', expiry: '15 Apr', color: '#9B5DE5' },
  { code: 'BDAY25', desc: '25% off on your birthday month', expiry: '30 Apr', color: '#F7B731' },
  { code: 'REFER20', desc: '₹20 credit per referral', expiry: 'No expiry', color: '#45AAF2' },
]

// ─── Payment Methods ─────────────────────────────────────────────────────────────
 const paymentMethods = [
  { type: 'UPI', detail: 'arjun@okaxis', icon: '⚡', primary: true },
  { type: 'Visa', detail: '•••• •••• •••• 4821', icon: '💳', primary: false },
  { type: 'Wallet', detail: '₹230 balance', icon: '👛', primary: false },
]

// ─── Transactions ────────────────────────────────────────────────────────────────
 const transactions = [
  { label: 'Spice Garden · ORD-9821', date: 'Today', amt: -549 },
  { label: 'Biryani Blues · ORD-9720', date: '3 Apr', amt: -389 },
  { label: 'Referral Bonus', date: '2 Apr', amt: +50 },
  { label: 'The Pizza Co. · ORD-9614', date: '1 Apr', amt: -620 },
]

// ─── Overview Stats ───────────────────────────────────────────────────────────────
 const overviewStats = [
  { num: '24', label: 'Total Orders', icon: '📦', color: '#FF6B35' },
  { num: '₹8,240', label: 'Total Spent', icon: '💰', color: '#2EC4B6' },
  { num: '4.8★', label: 'Avg Rating Given', icon: '⭐', color: '#9B5DE5' },
]

// ─── Nav Tabs ─────────────────────────────────────────────────────────────────────
 const NAV_TABS = [
  { id: 'overview', label: 'Overview', icon: '◈' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'offers', label: 'Offers', icon: '🏷️' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'profile', label: 'Profile', icon: '◉' },
  // { id: 'Order-Detail', label: 'Order-Detail', icon: '📦' },
]


// ─── Report Issue Options ──────────────────────────────────────────────────────────
//  const REPORT_ISSUES = [
//   'Wrong item delivered',
//   'Order not received',
//   'Poor packaging',
//   'Late delivery',
//   'Other',
// ]

// ─── Add Payment Options ───────────────────────────────────────────────────────────
const ADD_PAYMENT_OPTIONS = ['UPI ID', 'Card Number', 'Net Banking']


// ─── Star Rating ───────────────────────────────────────────────────────────────


// ─── Report Modal ──────────────────────────────────────────────────────────────

// const ReportModal = ({ orderId, onClose }) => {
//   const [step, setStep] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!selected) return;

//     try {
//       setLoading(true);

//       await axios.post("/api/v1/orderReport/report-order", {
//         OrderId: orderId,
//         Category: selected,
//         Note: note,
//       });

//       setStep(1); // success screen
//     } catch (error) {
//       console.log(error);
//       alert("Failed to submit report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Success Screen
//   if (step === 1) {
//     return (
//       <div className="modal-overlay">
//         <div className="modal-box">
//           <h3 className="modal-title">Issue Reported ✓</h3>
//           <p className="modal-sub">
//             Our team will reach out within 24 hrs.
//           </p>
//           <button className="modal-btn-primary" onClick={onClose}>
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Main Modal
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-box" onClick={(e) => e.stopPropagation()}>
//         <h3 className="modal-title">Report an Issue</h3>
//         <p className="modal-sub">Order #{orderId}</p>

//         {/* Issues */}
//         <div className="modal-issue-list">
//           {REPORT_ISSUES.map((issue) => (
//             <div
//               key={issue}
//               className="modal-issue-item"
//               onClick={() => setSelected(issue)}
//               style={{
//                 border:
//                   selected === issue
//                     ? "1px solid #FF6B35"
//                     : "1px solid rgba(255,255,255,0.1)",
//                 background:
//                   selected === issue
//                     ? "rgba(255,107,53,0.12)"
//                     : "rgba(255,255,255,0.04)",
//                 color: selected === issue ? "#FF6B35" : "#c0bdb6",
//               }}
//             >
//               {issue}
//             </div>
//           ))}
//         </div>

//         {/* Note */}
//         <textarea
//           className="modal-textarea"
//           placeholder="Additional details..."
//           rows={2}
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />

//         {/* Buttons */}
//         <div className="modal-btns">
//           <button
//             className="modal-btn-primary"
//             disabled={!selected || loading}
//             onClick={handleSubmit}
//           >
//             {loading ? "Submitting..." : "Submit Report"}
//           </button>

//           <button className="modal-btn-sec" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// ─── Tab: Overview ─────────────────────────────────────────────────────────────
const OverviewTab = ({ onReport, auth }) => (
  <div>
    <div className="section-title">Welcome back, {auth.user.name.split(' ')[0]} 👋</div>
    <div className="section-sub">Here's what's happening with your account.</div>

    <div className="grid-3">
      {overviewStats.map((s) => (
        <div className="card stat-card" key={s.label}>
          <div className="stat-icon">{s.icon}</div>
          <div>
            <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>

    {/* <div className="card card-mb">
      <div className="active-order-header">
        <div>
          <div className="active-order-title">🚴 Live Order</div>
          <div className="active-order-meta">
            {activeOrders[0].provider} · ETA{' '}
            <span className="active-order-eta">{activeOrders[0].eta}</span>
          </div>
        </div>
        <span className="badge badge-teal">Out for Delivery</span>
      </div>
      <OrderTracker status={activeOrders[0].status} size="lg" />
      <div className="item-pills">
        {activeOrders[0].items.map((item) => (
          <span key={item} className="item-pill">{item}</span>
        ))}
      </div>
    </div> */}

    <div className="card">
      <div className="section-title" style={{ fontSize: 16, marginBottom: 14 }}>🏷️ Active Offers</div>
      <div className="offer-mini-grid">
        {offers.slice(0, 3).map((o) => (
          <div
            key={o.code}
            className="offer-mini-card"
            style={{
              border: `1px solid ${o.color}30`,
              background: `${o.color}0f`,
            }}
          >
            <div className="offer-mini-code" style={{ color: o.color }}>{o.code}</div>
            <div className="offer-mini-desc">{o.desc}</div>
            <div className="offer-mini-expiry">Expires {o.expiry}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ─── Tab: Orders ───────────────────────────────────────────────────────────────
// const OrdersTab = ({ ratingOrder, setRatingOrder, onReport }) => (
  
// )

// ─── Tab: Offers ───────────────────────────────────────────────────────────────
const OffersTab = () => (
  <div>
    <div className="section-title">Offers & Coupons</div>
    <div className="section-sub">Exclusive deals available just for you.</div>
    <div className="offer-full-list">
      {offers.map((o) => (
        <div
          key={o.code}
          className="offer-full-card"
          style={{
            border: `1px solid ${o.color}25`,
            background: `${o.color}0a`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = `${o.color}18`)}
          onMouseLeave={(e) => (e.currentTarget.style.background = `${o.color}0a`)}
        >
          <div className="offer-full-icon-wrap" style={{ background: `${o.color}20` }}>
            🏷️
          </div>
          <div style={{ flex: 1 }}>
            <div className="offer-full-code" style={{ color: o.color }}>{o.code}</div>
            <div className="offer-full-desc">{o.desc}</div>
            <div className="offer-full-expiry">Expires: {o.expiry}</div>
          </div>
          <button className="btn" style={{ background: o.color, color: '#fff', flexShrink: 0 }}>
            Copy
          </button>
          <div className="offer-deco-circle" style={{ background: `${o.color}12` }} />
        </div>
      ))}
    </div>
  </div>
)

// ─── Tab: Payments ─────────────────────────────────────────────────────────────
const PaymentsTab = ({ addPayment, setAddPayment }) => (
  <div>
    <div className="section-title">Payment Methods</div>
    <div className="section-sub">Manage how you pay for your orders.</div>
    <div style={{ maxWidth: 500 }}>
      {paymentMethods.map((pm) => (
        <div key={pm.type} className="payment-card">
          <div className="payment-icon-wrap">{pm.icon}</div>
          <div style={{ flex: 1 }}>
            <div className="payment-type">{pm.type}</div>
            <div className="payment-detail">{pm.detail}</div>
          </div>
          {pm.primary && <span className="badge badge-teal">Primary</span>}
          <button className="btn btn-ghost" style={{ fontSize: 12 }} >Edit</button>
        </div>
      ))}

      {!addPayment ? (
        <button className="btn btn-outline btn-full" onClick={() => setAddPayment(true)}>
          + Add Payment Method
        </button>
      ) : (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="add-method-title">Add New Method</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ADD_PAYMENT_OPTIONS.map((opt) => (
              <div key={opt} className="add-method-option">{opt}</div>
            ))}
          </div>
          <button
            className="btn btn-ghost"
            style={{ marginTop: 12, fontSize: 13 }}
            onClick={() => setAddPayment(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="tx-history-title">Recent Transactions</div>
      {transactions.map((tx) => (
        <div key={tx.label} className="tx-row">
          <div>
            <div className="tx-label">{tx.label}</div>
            <div className="tx-date">{tx.date}</div>
          </div>
          <div className="tx-amount" style={{ color: tx.amt > 0 ? '#2EC4B6' : '#f0ece4' }}>
            {tx.amt > 0 ? '+' : ''}₹{Math.abs(tx.amt)}
          </div>
        </div>
      ))}
    </div>
  </div>
)

// ─── Tab: Profile ──────────────────────────────────────────────────────────────
// const ProfileTab = ({auth}) => {
//   const { user } = auth
//   const fields = getProfileFields(user)
//   const navigate = useNavigate();
//   return (
//     <div style={{ maxWidth: 560 }}>
//       <div className="section-title">Your Profile</div>
//       <div className="section-sub">Manage your personal information.</div>

//       <div className="card" style={{ marginBottom: 16 }}>
//         <div className="profile-header">
//           {/* <div className="avatar-lg">{user.avatar}</div> */}
//           <div>
//             <div className="profile-name">{user.name}</div>
//             <div className="profile-since">Member since {user.memberSince}</div>
//           </div>
//           <button className="btn btn-ghost" style={{ marginLeft: 'auto', fontSize: 13 }} onClick={() =>{ navigate("/dashboard/user/profile"); console.log("Edit");}}>
//             Edit
//           </button>
//         </div>
//         {fields.map((f) => (
//           <div className="profile-field" key={f.label}>
//             <div className="profile-label">{f.label}</div>
//             <div className="profile-val">{f.val}</div>
//           </div>
//         ))}
//       </div>

//       <div className="card">
//         <div className="support-title">Support & Help</div>
//         {supportOptions.map((s) => (
//           <div key={s.label} className="support-row">
//             <span className="support-icon">{s.icon}</span>
//             <div>
//               <div className="support-label">{s.label}</div>
//               <div className="support-sub">{s.sub}</div>
//             </div>
//             <span className="support-arrow">→</span>
//           </div>
//         ))}
//         <div style={{ marginTop: 14 }}>
//           <button className="btn btn-danger">Sign Out</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [ratingOrder, setRatingOrder] = useState(null)
  const [reportOrder, setReportOrder] = useState(false)
  const [addPayment, setAddPayment] = useState(false)
  const [orderDetail,setOrderDetail]=useState();
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]); 
   const [user, setUser] = useState(); 
  const [ttlOrders, setTtlOrders]=useState(0);
  const [ttlAvgGivenRating, setTtlAvgGivenRating]=useState(0);
  const [ttlSpent, setTtlSpent]=useState(0);
  // const [showOrderDetail, setShowOrderDetail]=useState(false);

   const getOrders = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/orders");
        console.log("Orders ");
        console.log(data);
        setOrders(data);
        // setTtlOrders(data.orders.length);
        console.log("auth" )
        console.log(auth)
        overviewStats[0].num=(auth.user.totalOrder);
        overviewStats[1].num=(auth.user.totalSpent);
        overviewStats[2].num=(auth.user.avgRating);
        
      } catch (error) {
        console.log(error);
      }
    };

  const onCheckOrderDetail=(order)=>{
      console.log("onCheckOrderDetail"+order);
      console.log(order);
      setActiveTab("Order-Detail");
      // setShowOrderDetail(true);
      setOrderDetail(order);
  }
  // useEffect(() => {
  //     getToken();
  // }, [auth?.token]);
  useEffect(() => {
      if (auth?.token){
        getOrders();
        const fetchUser =async()=>{
         const { data } = await axios.get("/api/v1/auth/orders");
         setUser(data);
        }
        console.log("Orders "+ orders);
      } 
    }, [auth?.token]);
  return (
    <Layout>
    <div className="dash-root">
      <aside className="dash-sidebar">
        <div className="dash-logo">
          Bite<span>.</span>rush
        </div>
        <div className="dash-user-card">
          <div className="dash-user-card-inner">
            <div className="avatar">{auth.user.avatar}</div>
            <div>
              <div className="dash-user-name">{auth.user.name.split(' ')[0]}</div>
              <div className="dash-user-role">Member</div>
            </div>
          </div>
        </div>
        <nav className="dash-nav">
          {NAV_TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </nav>
        {/* <div className="dash-user-card">
          <div className="dash-user-card-inner">
            <div className="avatar">{auth.user.avatar}</div>
            <div>
              <div className="dash-user-name">{auth.user.name.split(' ')[0]}</div>
              <div className="dash-user-role">Member</div>
            </div>
          </div>
        </div> */}
      </aside>

      <main className="dash-main">
        {activeTab === 'Order-Detail' && <OrdersDetails order={orderDetail} />}
        {activeTab === 'overview' && <OverviewTab onReport={setReportOrder} auth={auth} />}
        {activeTab === 'orders' && (
          <Orders
            orders={orders}
            ratingOrder={ratingOrder}
            setRatingOrder={setRatingOrder}
            onReport={setReportOrder}
            onCheckOrderDetail={onCheckOrderDetail}
          />
        )}
        {activeTab === 'offers' && <OffersTab />}
        {activeTab === 'payments' && (
          <PaymentsTab addPayment={addPayment} setAddPayment={setAddPayment} />
        )}
        {activeTab === 'profile' && <Profile />}
      </main>

      {reportOrder && (
        <ReportModel orderId={reportOrder} onClose={() => setReportOrder(null)} />
      )}
    </div>
    </Layout>
  )
}

export default Dashboard
