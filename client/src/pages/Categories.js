// // import React, { useState, useEffect } from "react";
// // import Layout from "../components/Layout/Layout";
// // import useCategory from "../hooks/useCategory";
// // import { Link } from "react-router-dom";
// // import "../styles/categories.css"
// // const Categories = () => {
// //   const categories = useCategory();
// //   return (
// //     <Layout title={"all categories"}>
// //       <div className="containerc" style={{ marginTop: "60px", overflow: "auto"  }}>
// //         <div className="row container">
// //           {categories.map((c) => (
// //             <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
// //             <div className="card">
// //               <Link to={`/category/${c.slug}`} className="modi btn cat-btn">
// //                 {c.name}
// //               </Link>
// //             </div>
// //           </div>
// //           ))}
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Categories;


import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../styles/categories.css";
const categoryConfig = {
  "re-fresher":     { emoji: "🍹", color: "#e8f5e9", accent: "#2e7d32", label: "Drinks" },
  "snacks":         { emoji: "🍪", color: "#fff3e0", accent: "#e65100", label: "Bites" },
  "hot":            { emoji: "☕", color: "#fbe9e7", accent: "#bf360c", label: "Hot" },
  "juice":          { emoji: "🍊", color: "#fff8e1", accent: "#f57f17", label: "Cold" },
  "special-ambani": { emoji: "⭐", color: "#f3e5f5", accent: "#6a1b9a", label: "Signature" },
  "oreo-shake":     { emoji: "🥤", color: "#e8eaf6", accent: "#283593", label: "Shakes" },
};

const defaultConfig = { emoji: "☕", color: "#fbe9e7", accent: "#c8864a", label: "Menu" };

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="categories-page">
        <div className="categories-header">
          <p className="categories-eyebrow">Explore our menu</p>
          <h1 className="categories-title">
            Our <span>Categories</span>
          </h1>
          <div className="categories-divider" />
        </div>

        <div className="categories-grid">
          {categories.map((c) => {
            const config = categoryConfig[c.slug] || defaultConfig;
            return (
              <Link key={c._id} to={`/category/${c.slug}`} className="cat-link">
                <div className="cat-card">
                  <div className="cat-anim-area">
                    <div
                      className="cat-anim-bg"
                      style={{ background: config.color }}
                    />
                    <div className="cat-shine" />
                    <div className="cat-3d-object">{config.emoji}</div>
                  </div>
                  <div className="cat-body">
                    <span
                      className="cat-tag"
                      style={{
                        background: config.color,
                        color: config.accent,
                      }}
                    >
                      {config.label}
                    </span>
                    <p className="cat-name">{c.name}</p>
                    <span
                      className="cat-arrow"
                      style={{ color: config.accent }}
                    >
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;


// import React from "react";
// import Lottie from "lottie-react";
// import Layout from "../components/Layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";

// // Import your downloaded Lottie JSON files
// import coffeeAnim from "../animations/coffee.json";
// import shakeAnim from "../animations/shake.json";
// import juiceAnim from "../animations/juice.json";
// import snacksAnim from "../animations/snacks.json";
// import drinkAnim from "../animations/drink.json";

//down load above json from https://lottiefiles.com/free-animations/coffee

// const categoryConfig = {
//   "hot":            { anim: coffeeAnim,  color: "#fbe9e7", accent: "#bf360c", label: "Hot" },
//   "re-fresher":     { anim: drinkAnim,   color: "#e8f5e9", accent: "#2e7d32", label: "Drinks" },
//   "juice":          { anim: juiceAnim,   color: "#fff8e1", accent: "#f57f17", label: "Cold" },
//   "snacks":         { anim: snacksAnim,  color: "#fff3e0", accent: "#e65100", label: "Bites" },
//   "oreo-shake":     { anim: shakeAnim,   color: "#e8eaf6", accent: "#283593", label: "Shakes" },
//   "special-ambani": { anim: coffeeAnim,  color: "#f3e5f5", accent: "#6a1b9a", label: "Signature" },
// };

// const defaultConfig = { anim: coffeeAnim, color: "#fbe9e7", accent: "#c8864a", label: "Menu" };

// const Categories = () => {
//   const categories = useCategory();

//   return (
//     <Layout title="All Categories">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');
//         .categories-page { padding: 2.5rem 1.5rem; font-family: 'DM Sans', sans-serif; }
//         .categories-header { text-align: center; margin-bottom: 3rem; }
//         .categories-eyebrow { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #a07850; margin-bottom: 8px; }
//         .categories-title { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 600; color: #1a1a1a; }
//         .categories-title span { color: #c8864a; }
//         .categories-divider { width: 48px; height: 2px; background: #c8864a; margin: 1rem auto 0; border-radius: 2px; }
//         .categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 20px; max-width: 960px; margin: 0 auto; }
//         .cat-link { text-decoration: none; }
//         .cat-card { border-radius: 18px; border: 1px solid rgba(0,0,0,0.07); overflow: hidden; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; background: #fff; }
//         .cat-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
//         .cat-anim-area { height: 140px; display: flex; align-items: center; justify-content: center; position: relative; }
//         .cat-anim-bg { position: absolute; inset: 0; opacity: 0.5; }
//         .cat-lottie { width: 110px; height: 110px; position: relative; z-index: 1; transition: transform 0.3s ease; }
//         .cat-card:hover .cat-lottie { transform: scale(1.12) translateY(-4px); }
//         .cat-body { padding: 1rem 1.1rem 1.2rem; }
//         .cat-tag { display: inline-block; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; padding: 3px 9px; border-radius: 20px; margin-bottom: 6px; }
//         .cat-name { font-size: 15px; font-weight: 500; color: #1a1a1a; margin: 0; line-height: 1.3; }
//         .cat-arrow { display: inline-block; margin-top: 8px; font-size: 13px; font-weight: 500; opacity: 0; transform: translateX(-4px); transition: opacity 0.2s, transform 0.2s; }
//         .cat-card:hover .cat-arrow { opacity: 1; transform: translateX(0); }
//       `}</style>

//       <div className="categories-page">
//         <div className="categories-header">
//           <p className="categories-eyebrow">Explore our menu</p>
//           <h1 className="categories-title">Our <span>Categories</span></h1>
//           <div className="categories-divider" />
//         </div>

//         <div className="categories-grid">
//           {categories.map((c) => {
//             const config = categoryConfig[c.slug] || defaultConfig;
//             return (
//               <Link key={c._id} to={`/category/${c.slug}`} className="cat-link">
//                 <div className="cat-card">
//                   <div className="cat-anim-area">
//                     <div className="cat-anim-bg" style={{ background: config.color }} />
//                     <Lottie
//                       animationData={config.anim}
//                       loop={true}
//                       className="cat-lottie"
//                     />
//                   </div>
//                   <div className="cat-body">
//                     <span className="cat-tag" style={{ background: config.color, color: config.accent }}>
//                       {config.label}
//                     </span>
//                     <p className="cat-name">{c.name}</p>
//                     <span className="cat-arrow" style={{ color: config.accent }}>Explore →</span>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Categories;