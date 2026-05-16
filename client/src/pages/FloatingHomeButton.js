import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "./FloatingHomeButton.css";
import { FaHome } from "react-icons/fa";

const FloatingHomeButton = () => {
  const [cart] = useCart();
  const navigate = useNavigate();

  return (
    <button
      className={`fcbh`}
      onClick={() => navigate("/")}
    >

      <FaHome className="fcbh__icon" />
    </button>
  );
};

export default FloatingHomeButton;
