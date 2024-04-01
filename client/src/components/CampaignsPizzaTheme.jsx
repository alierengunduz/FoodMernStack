import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const CampaignsPizzaTheme = ({campaign}) => {

  // State tanımla, modal'ın açık/kapalı durumunu takip etmek için
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SweetAlert2 modal'ı açacak fonksiyon
  const openModal = () => {
    Swal.fire({
      title: "Harikasın!",
      text: "Ürün favorilere eklendi!",
      icon: "success",
    });
  };
  return (
    <div className="w-full h-full text-xs relative text-black flex flex-col animate-borderColorAnim hover:translate-x-1 p-3 rounded-lg border-2 border-double border-primary transition-all duration-300">
      <div className="w-full h-[50%] p-1">
        <img
          className="w-full h-full object-cover"
          src={campaign.img}
          alt=""
        />
      </div>
      <div className="flex flex-col items-start w-full h-full justify-between gap-y-3">
        <div>
          <h1 className="text-lg"> {campaign.title} </h1>
          <p> {campaign.description} </p>
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
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default CampaignsPizzaTheme