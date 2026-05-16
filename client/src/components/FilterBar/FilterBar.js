import React, { useRef, useState, useEffect } from "react";
import "./FilterBar.css";
import { Prices } from "../Prices";

const categoryEmoji = {
  hot: "☕",
  "re-fresher": "🍹",
  juice: "🍊",
  snacks: "🍪",
  "special-ambani": "⭐",
  "oreo-shake": "🥤",
  "oreo-shake-1": "🥛",
  "oreo-shake-2": "🥛",
  "oreo-shake-3": "🥛",
  "oreo-shake-4": "🥛",
};

const categoryColor = {
  hot: { bg: "#fbe9e7", accent: "#bf360c" },
  "re-fresher": { bg: "#e8f5e9", accent: "#2e7d32" },
  juice: { bg: "#fff8e1", accent: "#f57f17" },
  snacks: { bg: "#fff3e0", accent: "#e65100" },
  "special-ambani": { bg: "#f3e5f5", accent: "#6a1b9a" },
  "oreo-shake": { bg: "#e8eaf6", accent: "#283593" },
};
const defaultColor = { bg: "#fdf3eb", accent: "#c8864a" };

export default function FilterBar({
  categories = [],
  checked = [],
  setChecked,
  radio = [],
  onCategory,
  // onSingleCategory,
  onPrice,
  onReset,
}) {
  const priceRef = useRef(null);
  const [currFilterState, setCurrFilterState] = useState({ name: "", _id: "" });
  const catRef = useRef(null);
  const currCategoryRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const allPossibleWayToFilter = [
    { name: "Filter By Category", _id: "ab1" },
    { name: "Filter By Price", _id: "cd2" },
    { name: "Filter By Review", _id: "ef3" },
  ];

  const activePriceLabel = Prices.find(
    (p) => JSON.stringify(p.array) === JSON.stringify(radio),
  )?.name;

  const activeCatNames = categories
    .filter((c) => checked.includes(c._id))
    .map((c) => ({ id: c._id, label: c.name, type: "cat" }));

  const activeTags = [
    ...activeCatNames,
    ...(activePriceLabel
      ? [{ id: "price", label: activePriceLabel, type: "price" }]
      : []),
  ];

  const removeTag = (tag) => {
    if (tag.type === "cat") onCategory(false, tag.id);
    else onPrice([]);
  };

  const categoryConfig = {
    "re-fresher": {
      emoji: "🍹",
      color: "#e8f5e9",
      accent: "#2e7d32",
      label: "Drinks",
    },
    snacks: {
      emoji: "🍪",
      color: "#fff3e0",
      accent: "#e65100",
      label: "Bites",
    },
    hot: { emoji: "☕", color: "#fbe9e7", accent: "#bf360c", label: "Hot" },
    juice: { emoji: "🍊", color: "#fff8e1", accent: "#f57f17", label: "Cold" },
    "special-ambani": {
      emoji: "⭐",
      color: "#f3e5f5",
      accent: "#6a1b9a",
      label: "Signature",
    },
    "oreo-shake": {
      emoji: "🥤",
      color: "#e8eaf6",
      accent: "#283593",
      label: "Shakes",
    },
  };

  const defaultConfig = {
    emoji: "☕",
    color: "#fbe9e7",
    accent: "#c8864a",
    label: "Menu",
  };
  const onSingleCategory = (c) => {
    //need to analyse because we can not apply multiple filte at once or we can make sub filter under filter like shoes and then sport sneaker and etc.
    onCategory(!checked.includes(c._id), c._id);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fb-wrapper">
      {/* ── Category cards row ── */}
      <div className="fb-cards-scroll">
        {/* All card */}
        { isMobile ? (
        <div
          className={`fb-cat-card ${checked.length === 0 && radio.length === 0 ? "fb-cat-card-active" : ""}`}
          onClick={onReset}
          style={{ "--card-bg": "#f7f3ef", "--card-accent": "#c8864a" }}
        >
          <div
            className="fb-cat-card-icon-wrap"
            style={{ background: "#f7f3ef" }}
          >
            <span className="fb-cat-card-icon">🍽️</span>
          </div>
          <span className="fb-cat-card-name">All</span>
        </div>
        ) :
        (
         <div
                className="cat-card"
               onClick={onReset}
              >
                <div className="cat-anim-area">
                  <div
                    className="cat-anim-bg"
                  />
                  <div className="cat-shine" />
                  <div className="cat-3d-object">🍽️</div>
                </div>
                <div className="cat-body">
                  <p className="cat-name">All Products</p>
                </div>
              </div>
        )}
        {categories.map((c) => {
          const color = categoryColor[c.slug] || defaultColor;
          const config = categoryConfig[c.slug] || defaultConfig;
          const isActive = checked.includes(c._id) && checked.length === 1;
          return isMobile ? (
            <>
              <div
                key={c._id}
                className={`fb-cat-card ${isActive ? "fb-cat-card-active" : ""}`}
                onClick={() => (isActive ? onReset() : onSingleCategory(c))}
                style={{ "--card-accent": color.accent }}
              >
                <div
                  className="fb-cat-card-icon-wrap"
                  style={{ background: color.bg }}
                >
                  <span className="fb-cat-card-icon">
                    {categoryEmoji[c.slug] || "☕"}
                  </span>
                </div>
                <span className="fb-cat-card-name">{c.name}</span>
              </div>
            </>
          ) : (
            <>
              <div
                className="cat-card"
                onClick={() => (isActive ? onReset() : onSingleCategory(c))}
              >
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
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="fb-section">
        {/* <span className="fb-section-label">Category</span> */}

        {/* <button className="fb-arrow" onClick={() => scroll(catRef, -1)} aria-label="Scroll left">
                ‹
              </button> */}

        <div className="fb-scroll-wrap">
          <div className="fb-scroll-track" ref={currCategoryRef}>
            {/* <h1>{categories.length}</h1> */}
            {allPossibleWayToFilter.map((c) => (
              <button
                key={`allPos-${c._id}`}
                className={`fb-chip ${currFilterState._id === c._id ? "active" : ""}`}
                onClick={() => {
                  setCurrFilterState((prev) => {
                    if (c._id === prev._id) {
                      return { name: "", _id: "" };
                    }
                    return { ...c };
                  });
                }}
              >
                {/* {c.name} */}
                <span className="fb-chip-dot" />
                {c.name}
                {/* <h1>hii</h1> */}
              </button>
            ))}
          </div>
        </div>

        {/* <button className="fb-arrow" onClick={() => scroll(catRef, 1)} aria-label="Scroll right">
                ›
              </button> */}
      </div>

      {currFilterState._id === "ab1" ? (
        <>
          <div className="fb-section">
            <span className="fb-section-label">Category</span>

            <div className="fb-scroll-wrap">
              <div className="fb-scroll-track" ref={catRef}>
                {/* <h1>{categories.length}</h1> */}
                {categories.map((c) => (
                  <button
                    key={`cat-${c._id}`}
                    className={`fb-chip ${checked.includes(c._id) ? "active" : ""}`}
                    onClick={() => {
                      console.log(categories);
                      onCategory(!checked.includes(c._id), c._id);
                    }}
                  >
                    {/* {c.name} */}
                    <span className="fb-chip-dot" />
                    {c.name}
                    {/* <h1>hii</h1> */}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="fb-divider" />
        </>
      ) : currFilterState._id === "cd2" ? (
        <>
          <div className="fb-section">
            <span className="fb-section-label">Price</span>

            {/* <button className="fb-arrow" onClick={() => scroll(catRef, -1)} aria-label="Scroll left">
                ‹
              </button> */}

            <div className="fb-scroll-wrap">
              <div className="fb-scroll-track" ref={priceRef}>
                {/* <h1>{categories.length}</h1> */}
                {Prices.map((c) => (
                  <button
                    key={`price-${c._id}`}
                    className={`fb-chip ${JSON.stringify(c.array) === JSON.stringify(radio) ? "active" : ""}`}
                    onClick={() =>
                      onPrice(
                        JSON.stringify(c.array) === JSON.stringify(radio)
                          ? []
                          : c.array,
                      )
                    }
                  >
                    {/* {c.name} */}
                    <span className="fb-chip-dot" />
                    {c.name}
                    {/* <h1>hii</h1> */}
                  </button>
                ))}
              </div>
            </div>

            {/* <button className="fb-arrow" onClick={() => scroll(catRef, 1)} aria-label="Scroll right">
                ›
              </button> */}
          </div>

          <div className="fb-divider" />
        </>
      ) : null}

      {/* ── Active filters tag row ── */}
      {activeTags.length > 0 && (
        <>
          <div className="fb-divider" />
          <div className="fb-active-row">
            <span className="fb-active-label">Active</span>

            {activeTags.map((tag) => (
              <span key={tag.id} className="fb-tag">
                {tag.label}
                <button
                  className="fb-tag-remove"
                  onClick={() => removeTag(tag)}
                  aria-label={`Remove ${tag.label} filter`}
                >
                  ×
                </button>
              </span>
            ))}

            <button className="fb-reset" onClick={onReset}>
              Clear all
            </button>
          </div>
        </>
      )}
    </div>
  );
}
