import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="bg-[#302128] w-full min-h-[250px] text-white  flex flex-col gap-y-7 justify-evenly items-center p-10">
      {/* r---------section 1------------------ */}
      <div className="flex items-center sm:gap-x-10 gap-x-5 sm:text-3xl text-lg">
        <span className="hover:bg-secondary p-2 rounded-full transition-all duration-300 cursor-pointer">
          <FaFacebook />
        </span>
        <span className="hover:bg-secondary p-2 rounded-full transition-all duration-300 cursor-pointer">
          <FaTwitter />
        </span>
        <span className="hover:bg-secondary p-2 rounded-full transition-all duration-300 cursor-pointer">
          <FaInstagram />
        </span>
        <span className="hover:bg-secondary p-2 rounded-full transition-all duration-300 cursor-pointer">
          <FaLinkedinIn />
        </span>
        <span className="hover:bg-secondary p-2 rounded-full transition-all duration-300 cursor-pointer">
          <FaYoutube />
        </span>
      </div>
      {/* r---------section 2------------------ */}
      <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-y-0 gap-y-5 sm:gap-x-28 gap-x-2 sm:text-lg text-xs shadow-sm shadow-white border-secondary border-2 border-double p-3 rounded-xl sm:w-[780px] w-full">
        <div className="flex items-center gap-x-3">
          <span className="border-2 border-secondary p-2 rounded-full">
            <IoLocationSharp />
          </span>
          <p>Locations</p>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="border-2 border-secondary p-2 rounded-full">
            <FaPhoneAlt />
          </span>
          <p>+01 1234567890</p>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="border-2 border-secondary p-2 rounded-full">
            <BiLogoGmail />
          </span>
          <p>Demo@Gmail.Com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
