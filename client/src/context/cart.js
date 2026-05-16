import { useState, useContext, createContext,useEffect } from "react";
import { useAuth } from "./auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart,setCart]=useState([])
  const [auth, setAuth] = useAuth();

///we save our product in cart as a local storage but it is not shown in real time  so we use useeffect
 useEffect(()=>{
  // dynamic cart key
    const cartKey = `cart_${auth?.user?._id}`;
    console.log("auth");
    console.log(auth);
    console.log(cartKey);
    // const cartKey="cart";
  // let existingCartItem=localStorage.getItem('cart');
   let existingCartItem=localStorage.getItem(cartKey);
  if(existingCartItem){
    setCart(JSON.parse(existingCartItem));
  }else{
    setCart([]);
  }

 },[auth?.user?._id])


  return (
    <CartContext.Provider value={[cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };