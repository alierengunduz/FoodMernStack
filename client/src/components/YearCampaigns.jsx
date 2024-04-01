import React from 'react'
import { MdCampaign } from "react-icons/md";
import CampaignsPizzaTheme from "../components/CampaignsPizzaTheme";
import { FaRegGrinStars } from "react-icons/fa";
import { SiIfood } from "react-icons/si";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './YearCampaigns.css';

// import required modules
import { EffectCards } from 'swiper/modules';
const YearCampaigns = ({campaigns}) => {
  return (
        <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-center justify-center  w-full shadow-md shadow-gray-500 p-5 rounded-xl">
        <div className="flex flex-col items-start   gap-y-5 w-full">
          <div className="flex items-center gap-x-1">
            <h1 className="font-bold tracking-wider uppercase border-b-4 border-secondary w-40">
              Yılın Kampanyaları:
            </h1>
            <span className="animate-pulse">
              <MdCampaign size={34} />
            </span>
          </div>
          <div>
          <Swiper
        effect={'cards'}
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
         <h1 className="text-3xl font-bold tracking-wider">Yılın Kampanyası Özellikleri</h1>
          <span><SiIfood size={34}/></span>
         </div>
          <p className="border-secondary pb-1 border-b-2">Seçtiğin kampanya ürünlerinde %80 indirim fırsatı! <sup className='w-5 h-5 py-2 px-2 text-white rounded-full bg-secondary'>1</sup> </p>
          <p className="border-secondary pb-1 border-b-2">Ücretsiz kargo fırsatı! <sup className='w-5 h-5 py-2 px-2 text-white rounded-full bg-purple-500'>2</sup> </p>
          <p className="border-secondary pb-1 border-b-2">Ücretsiz Seçtiğin bir Yan Ürün <sup className='w-5 h-5 py-2 px-2 text-white rounded-full bg-blue-500'>3</sup> </p>
          <p className="border-secondary pb-1 border-b-2">Ücretsiz Seçtiğin bir İçecek <sup className='w-5 h-5 py-2 px-2 text-white rounded-full bg-pink-500'>3</sup> </p>
          <p className="border-secondary pb-1 border-b-2">Ücretsiz Seçtiğin bir Tatlı <sup className='w-5 h-5 py-2 px-2 text-white rounded-full bg-green-500'>4</sup> </p>
          <Link to="/allproduct" className="bg-gray-800 rounded-lg hover:text-gray-800 hover:bg-gray-300 font-bold transition-all duration-300 text-white w-[65%] py-2 text-center ">Detaylar</Link>
          <span className='absolute -top-6 -right-2 bg-red-600 text-white p-2 rounded-full'><FaRegGrinStars size={65}/></span>
        </div>
        </div>
  )
}


export default YearCampaigns