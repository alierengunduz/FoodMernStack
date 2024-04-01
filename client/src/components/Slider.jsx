import React,{ useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Slider = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

  return (
    <div>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full object-cover h-full"
      >
        <SwiperSlide>
            <img className='w-full sm:h-auto !h-[200px] !object-cover' src="img/slider1.png" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full sm:h-auto !h-[200px] !object-cover' src="img/slider2.png" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full sm:h-auto !h-[200px] !object-cover' src="img/slider3.png" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full sm:h-auto !h-[200px] !object-cover' src="img/slider4.png" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full sm:h-auto !h-[200px] !object-cover' src="img/slider5.png" />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}

export default Slider