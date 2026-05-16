// import React from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "../../components/Layout/Layout";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth";
// import '../../styles/dashbrd.css'
// // import '../../styles/AuthStyles.css'
// // import { ToastContainer, toast } from 'react-toastify';
// import toast from "react-hot-toast";
// import axios from "axios";
// const Profile = () => {
//   // context
//   const [auth, setAuth] = useAuth();
//   //state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

// //get user data
// useEffect(()=>{
//  const {email,name,phone,address}=auth?.user
//  setAddress(address);
//  setName(name);
//  setEmail(email);
//  setPhone(phone);
// },[auth?.user])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     //  console.log(name,email,password,phone)
//     try {
//       const {data} = await axios.put(
//         `/api/v1/auth/profile`,
//         { name, email, password, phone, address }
//       );
//       // const {data} = await axios.put(
//       //   `${process.env.REACT_APP_API}/api/v1/auth/profile`,
//       //   { name, email, password, phone, address }
//       // );
//       if(data?.error){
//         toast.error(data.error)
//       }else{
//         setAuth({...auth,user:data?.updatedUser})
//         let ls=localStorage.getItem('auth')
//         ls=JSON.parse(ls);
//         ls.user=data.updatedUser;
//         localStorage.setItem("auth",JSON.stringify(ls));
//         toast.success('profile updated successfully')
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong", { duration: 2500 });
//     }
//   };

//   return (
//     <Layout>
//       <div className="container-fluid  dashbrd">
//         <div className="row">
//           {/* <div className="col-md-3">
//             <UserMenu />
//           </div> */}
//           <div className="col-md-9 ">
//             <h1 className="m-3">
//               <div className="form-container p-3">
//                 <form onSubmit={handleSubmit}>
//                   <h1>User Profile</h1>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="form-control"
//                       id="exampleInputName"
//                       placeholder="Enter your name here"

//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       value={email}
//                       className="form-control"
//                       id="exampleInputEmail1"
//                       placeholder="Enter your email here"

//                       disabled
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       onChange={(e) => setPassword(e.target.value)}
//                       value={password}
//                       className="form-control"
//                       id="exampleInputPassword1"
//                       placeholder="enter your password here"

//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       onChange={(e) => setPhone(e.target.value)}
//                       value={phone}
//                       className="form-control"
//                       id="exampleInputPhone1"
//                       placeholder="enter your phone"

//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       onChange={(e) => setAddress(e.target.value)}
//                       value={address}
//                       className="form-control"
//                       id="exampleInputAddress1"
//                       placeholder="enter your address here"

//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Update
//                   </button>
//                 </form>
//               </div>
//             </h1>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default Profile;

import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import "../../styles/dashbrd.css";
// import '../../styles/AuthStyles.css'
// import { ToastContainer, toast } from 'react-toastify';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ─── Support Options ──────────────────────────────────────────────────────────────
const supportOptions = [
  { icon: "💬", label: "Live Chat Support", sub: "Avg response in 2 min" },
  { icon: "📞", label: "Call Us", sub: "+91 1800-XXX-XXXX (Free)" },
  { icon: "📧", label: "Email Support", sub: "support@biterush.in" },
  { icon: "❓", label: "FAQ & Help Center", sub: "Browse common questions" },
];

// ─── Profile Fields ────────────────────────────────────────────────────────────────
const getProfileFields = (user) => [
  { label: "Email", val: user.email },
  { label: "Phone", val: user.phone },
  { label: "Delivery Address", val: user.address },
];
const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const { user } = auth;
  const fields = getProfileFields(user);
  const navigate = useNavigate();
  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setAddress(address);
    setName(name);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log(name,email,password,phone)
    try {
      const { data } = await axios.put(`/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      // const {data} = await axios.put(
      //   `${process.env.REACT_APP_API}/api/v1/auth/profile`,
      //   { name, email, password, phone, address }
      // );
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated successfully");
        setIsUpdate(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 2500 });
    }
  };

  useEffect(() => {}, [isUpdate]);

  return (
    <>
      <div style={{ maxWidth: 560 }}>
        {isUpdate ? (
      
            // <div className="col-md-9 ">
            //   <h1 className="m-3">
                <div className="card" style={{ marginBottom: 16 }}>
                    <div className="section-title">Your Profile</div>
                    <div className="section-sub">
                      Manage your personal information.
                    </div>
                  <form onSubmit={handleSubmit}>
                    <div className="profile-field">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="exampleInputName"
                        placeholder="Enter your name here"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter your email here"
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="enter your password here"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className="form-control"
                        id="exampleInputPhone1"
                        placeholder="enter your phone"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="form-control"
                        id="exampleInputAddress1"
                        placeholder="enter your address here"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
            //   </h1>
            // </div>
      
        ) : (
          // <div style={{ maxWidth: 560 }}>
          <>
            <div className="section-title">Your Profile</div>
            <div className="section-sub">Manage your personal information.</div>

            <div className="card" style={{ marginBottom: 16 }}>
              <div className="profile-header">
                {/* <div className="avatar-lg">{user.avatar}</div> */}
                <div>
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-since">
                    Member since {user.memberSince}
                  </div>
                </div>
                <button
                  className="btn btn-ghost"
                  style={{ marginLeft: "auto", fontSize: 13 }}
                  onClick={() => {
                    setIsUpdate(true);
                  }}
                >
                  Edit
                </button>
              </div>
              {fields.map((f) => (
                <div className="profile-field" key={f.label}>
                  <div className="profile-label">{f.label}</div>
                  <div className="profile-val">{f.val}</div>
                </div>
              ))}
            </div>

            {/* </div> */}
          </>
        )}
        <div className="card">
          <div className="support-title">Support & Help</div>
          {supportOptions.map((s) => (
            <div key={s.label} className="support-row">
              <span className="support-icon">{s.icon}</span>
              <div>
                <div className="support-label">{s.label}</div>
                <div className="support-sub">{s.sub}</div>
              </div>
              <span className="support-arrow">→</span>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
