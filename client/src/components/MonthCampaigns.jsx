import React from "react";
import { MdCampaign } from "react-icons/md";
import CampaignsPizzaTheme from "../components/CampaignsPizzaTheme";
import { SiIfood } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiStarSmileFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./Campaigns.css";

// import required modules
import { EffectCards } from "swiper/modules";
const MonthCampaigns = ({ campaigns }) => {
  return (
    <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-center justify-center  w-full shadow-md shadow-gray-500 p-5 rounded-xl">
      <div className="flex flex-col items-start   gap-y-5 w-full">
        <div className="flex items-center gap-x-1">
          <h1 className="font-bold tracking-wider uppercase border-b-4 border-secondary w-40">
            Ayın Kampanyaları:
          </h1>
          <span className="animate-pulse">
            <MdCampaign size={34} />
          </span>
        </div>
        <div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="CardSwiper"
          >
            {campaigns.map((campaign, index) => (
              <SwiperSlide key={index}>
                <CampaignsPizzaTheme campaign={campaign} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-y-5 relative">
        <div className="flex items-center gap-x-4">
          <h1 className="text-3xl font-bold tracking-wider">
            Ayın Kampanyası Özellikleri
          </h1>
          <span>
            <SiIfood size={34} />
          </span>
        </div>
        <p className="border-secondary pb-1 border-b-2">
          Seçtiğin kampanya ürünlerinde %50 indirim fırsatı!
        </p>
        <p className="border-secondary pb-1 border-b-2">
          Ücretsiz kargo fırsatı!
        </p>
        <p className="border-secondary pb-1 border-b-2">
          Ücretsiz Seçtiğin bir Yan Ürün
        </p>
        <Link to="/allproduct" className="bg-gray-800 text-center py-2 rounded-lg hover:text-gray-800 hover:bg-gray-300 font-bold transition-all duration-300 text-white w-[65%] ">
          Detaylar
        </Link>
        <span className='absolute -top-20 -right-2 bg-green-600 text-white p-2 rounded-full'><RiStarSmileFill size={65}/></span>
      </div>
    </div>
  );
};

export default MonthCampaigns;
