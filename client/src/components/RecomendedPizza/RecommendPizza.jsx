import React, { useState, useEffect, useContext } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/recommend.json";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { GiSausage, GiMushroomGills, GiCorn, GiOlive } from "react-icons/gi";
import { TbMeat, TbSausage } from "react-icons/tb";
import { FaBacon, FaFish } from "react-icons/fa";
import { CartContext } from "../../context/CartProvider";
import axios from "axios";
const RecommendPizza = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("sucuk");
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { addToCart, cartItems } = useContext(CartContext);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/pizzacategories`);
        if (!response.ok) {
          console.log("Ürün getirilemedi");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/pizzaproduct`);
        const data = res.data;
        setOriginalData(data);
        setFilteredData(data.filter((item) => item.title === "sucuk")); // Varsayılan olarak 'sucuk' sekmesi seçili
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [apiUrl]);
 


  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
    const newFilteredData = originalData.filter((item) => item.title === tab);
    setFilteredData(newFilteredData);
  };

  // SweetAlert2 modal'ı açacak fonksiyon
  const openModal = () => {
    Swal.fire({
      title: "Harikasın!",
      text: "Ürün favorilere eklendi!",
      icon: "success",
    });
  };

 
  return (
    <div className="w-full sm:px-20 px-0  flex flex-col relative items-center gap-y-10 mt-10 py-5">
      <div className="flex items-start w-full gap-x-2">
        <h1 className="pt-10 pb-2 text-xl font-medium tracking-widest border-b-2 border-double border-secondary">
          Malzeme seçimine göre{" "}
          <span className="text-secondary font-bold text-2xl">Pizza</span>
        </h1>
        <span className="w-14">
          {" "}
          <Lottie animationData={animationData} />
        </span>
      </div>
      <ul className="w-full h-full  grid  sm:grid-cols-8 grid-cols-4 p-1 place-items-center items-center sm:px-32 px-0">
        {categoryData.map((item) => {
          return (
            <li
              className="flex flex-col items-center gap-y-2 pr-4"
              key={item._id}
            >
              {item.name === "sucuk" && (
                <GiSausage className="text-gray-500" size={25} />
              )}
              {item.name === "mantar" && (
                <GiMushroomGills className="text-gray-500" size={25} />
              )}
              {item.name === "mısır" && (
                <GiCorn className="text-gray-500" size={25} />
              )}
              {item.name === "zeytin" && (
                <GiOlive className="text-gray-500" size={25} />
              )}
              {item.name === "sosis" && (
                <TbSausage className="text-gray-500" size={25} />
              )}
              {item.name === "pastırma" && (
                <TbMeat className="text-gray-500" size={25} />
              )}
              {item.name === "kavurma" && (
                <FaBacon className="text-gray-500" size={25} />
              )}
              {item.name === "somon" && (
                <FaFish className="text-gray-500" size={25} />
              )}
              <a
                href="/"
                onClick={(e) => handleTabClick(e, item.name)}
                className={`${
                  activeTab === item.name ? "bg-secondary text-white" : ""
                } py-2 px-4 rounded-lg transition-all duration-300`}
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
      <div className=" grid sm:grid-cols-3 grid-cols-1 place-items-center gap-14">
        {filteredData.map((item) => {
          return (
            <div
              key={item._id}
              className="w-[268px] h-[344px] relative flex flex-col animate-borderColorAnim hover:translate-x-1 p-3 rounded-lg border-2 border-double border-primary transition-all duration-300"
            >
              <div className="w-full h-[50%] p-1">
                <img
                  className="w-full h-full object-cover"
                  src={item.img}
                  alt=""
                />
              </div>
              <span className="absolute left-1 top-1 z-10 text-white bg-green-500 p-2 rounded-md text-xs">
                %{item.price.discount},
              </span>
              <div className="flex flex-col items-center text-center w-full h-full justify-between gap-y-3">
                <div>
                  <h1 className="uppercase">{item.name} </h1>
                  <p
                    className="text-sm px-2"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="font-bold text-xl  flex flex-col">
                    <span>{item.price.current.toFixed(2)},</span>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-secondary text-white px-3 py-1 rounded-lg hover:bg-white hover:text-secondary transition-all duration-300"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
              <span
                className="absolute top-0 right-0 text-red-600 text-2xl border-2 border-dotted border-secondary rounded-full p-2 animate-textColorAnim cursor-pointer"
                onClick={openModal}
              >
                <FaHeart />
              </span>
              {isModalOpen && (
                <div className="overlay">
                  <div className="modal">
                    <button
                      className="close-btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <img
        src="img/space.png"
        className="absolute top-5 -right-20 rotate-180 -z-10"
        alt=""
      />
    </div>
  );
};

export default RecommendPizza;
