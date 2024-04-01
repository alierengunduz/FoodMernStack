import React, { useState, useEffect } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import Lottie from "lottie-react";
import animationData from "../../assets/testimonialAnim.json";
import axios from "axios";
import { FaHandPointLeft, FaHandPointRight } from "react-icons/fa";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("json/test.json");
        const data = res.data;
        setTestimonials(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-col gap-y-10 container mx-auto justify-center items-center p-5 py-10 relative">
      <img className="absolute rotate-90 left-0 -top-40" src="img/space.png" alt="" />
      <h1 className="text-5xl tracking-widest font-bold text-center">
        Testimonial
      </h1>
      <ul className="sm:w-[1079px] sm:h-[426px] w-full h-[426px] relative overflow-hidden">
        {testimonials.map((item, index) => (
          <li
            key={item.id}
            className={`absolute top-0 left-0 opacity-0 shadow-lg shadow-gray-600 border-4 border-double border-secondary  h-[400px] p-5 flex flex-col items-center justify-center transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : ""
            }`}
          >
            <div className="mt-28 h-full flex flex-col justify-between">
              <h1 className="text-4xl font-bold tracking-wider">
                {item.title}
              </h1>
              <p className="leading-relaxed text-xl">{item.description}</p>
              <div className="flex items-center justify-between w-full">
                <div>
                  <RiDoubleQuotesL size={30} />
                </div>
                <div className="flex items-center gap-x-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full bg-primary ${
                        i === activeIndex ? "bg-yellow-500" : ""
                      }`}
                      onClick={() => setActiveIndex(i)}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24">
                <Lottie animationData={animationData} />
              </div>
              <img
                className="absolute sm:top-10 top-0 sm:left-[60%] left-0 sm:w-36 w-32 bg-secondary p-2 rounded-3xl"
                src={item.img}
                alt=""
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        className="absolute left-0 border-2 border-double bg-secondary p-2 rounded-full text-white"
        onClick={handlePrev}
      >
        <FaHandPointLeft size={30} />
      </button>
      <button
        className="absolute right-0 border-2 border-double bg-secondary p-2 rounded-full text-white"
        onClick={handleNext}
      >
        <FaHandPointRight size={30} />
      </button>
    </div>
  );
};

export default Testimonial;
