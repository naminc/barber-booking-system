import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { useSettingsContext } from "../context/SettingsContext";
const Hero = () => {
  const navigate = useNavigate();
  const { getSetting } = useSettingsContext();
  const websiteName = getSetting("websiteName");
  return (
    <section id="hero" className="hero-image">
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-white-200">
        <p className="md:text-2xl text-xl tracking-wider font-medium">
          {websiteName}
        </p>
        <h1 className="md:text-8xl text-5xl font-semibold tracking-wide mb-4">
          BARBER SHOP
        </h1>
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#c29e75] to-[#a47e4f] 
                     text-black font-semibold md:py-3 md:px-8 py-2.5 px-6 rounded-full shadow-lg 
                     hover:shadow-[#c29e75]/50 hover:scale-105 transition-all duration-300 
                     text-base"
        >
          <FaCalendarAlt className="text-lg" />
          Đặt lịch ngay
        </button>
      </div>
    </section>
  );
};

export default Hero;