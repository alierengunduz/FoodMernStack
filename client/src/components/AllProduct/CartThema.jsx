import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartProvider";
const CartThema = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, cartItems } = useContext(CartContext);




  return (
    <div className="w-[268px] h-[344px] relative flex flex-col animate-borderColorAnim hover:translate-x-1 p-3 rounded-lg border-2 border-double border-primary transition-all duration-300">
      <div className="w-full h-[50%] p-1">
        <img className="w-full h-full object-cover" src={product.img} alt={product.title} />
      </div>
      <span className="absolute left-1 top-1 z-10 text-white bg-green-500 p-2 rounded-md text-xs">
                %{product.price.discount},
              </span>
      <div className="flex flex-col items-start w-full h-full justify-between gap-y-3">
        <div>
          <h1>{product.title} </h1>
          <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="font-bold text-xl flex flex-col ">
        
            <span >
              {product.price.current.toFixed(2)}
            </span>
          </div>
     <div className="flex flex-col">
     <button
            onClick={() => addToCart(product)}
            className="
            bg-primary text-white py-2 px-6 rounded-xl hover:bg-secondary hover:text-white transition-all duration-300"
          >
            Sepete Ekle
          </button >
     </div>
        </div>
      </div>
 

      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartThema;
