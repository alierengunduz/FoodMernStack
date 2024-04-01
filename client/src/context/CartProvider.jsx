import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    // Ürünün daha önce sepete eklenip eklenmediğini kontrol et
    const isAlreadyInCart = cartItems.some(item => item._id === cartItem._id);
  
    // Eğer ürün daha önce eklenmemişse, sepete ekle
    if (!isAlreadyInCart) {
      setCartItems(prevCart => [...prevCart, { ...cartItem, quantity: cartItem.quantity ? cartItem.quantity : 1 }]);
    } else {
      // Ürün zaten eklenmişse, kullanıcıya bir uyarı göster
      Swal.fire({
        title: "Uyarı!",
        text: "Bu ürün zaten sepetinizde bulunmaktadır.",
        icon: "warning",
      });
    }
  };
  

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
        return cartItem._id !== itemId;
    })
    setCartItems(filteredCartItems);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        setCartItems,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
