import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { Modal, Badge } from "antd";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import Auth from "../AuthModal.jsx/Auth";
import { CartContext } from "../../context/CartProvider";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {cartItems} = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="flex w-full sm:px-10 px-1 items-center  sm:justify-between justify-around bg-primary text-white  sm:p-3 p-5 sticky top-0 z-40">
      <div className="sm:flex hidden items-center gap-x-5">
        <Link to="/">
          <img
            className="w-14 object-cover rounded-full"
            src="img/logo.png"
            alt=""
          />
        </Link>
     
      </div>
      <div>
        <Link
          to="/"
          className="tracking-wider sm:text-2xl text-xs font-bold border-secondary border-2 sm:p-2 p-1 rounded-sm shadow-sm shadow-secondary"
        >
          Monster Pizza
        </Link>
      </div>
      <div className="flex items-center sm:gap-x-5 gap-x-3 sm:text-base text-xs">
        <Link
          to="/allproduct"
          className="hover:text-secondary  transition-colors duration-300 cursor-pointer"
        >
          Tüm Ürünler
        </Link>
        <Link
          to="/campaigns"
          className="hover:text-secondary transition-colors duration-300 cursor-pointer"
        >
          Kampanyalar
        </Link>
        <Link  to="/cart" >
          <Badge  count={cartItems.length}
           className="text-white">
            <FaShoppingBasket className="sm:text-2xl text-base"  />
          </Badge>
        </Link>
        <div className="cursor-pointer  hover:text-secondary transition-all duration-300 ">
           {
            user ? (
              <span className="border-2 p-1 rounded-md">
                 {user.username.toUpperCase()}
              </span>
            ) : (
              <Auth />
            )
           }
        </div>
        {
          user && (
            <button  onClick={()=> {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("user")
                window.location.reload();
              }
             }}>
              <GiExitDoor className="sm:text-2xl text-base" />
            </button>
          )
        }
        
      </div>
    
    </header>
  );
};

export default Header;
