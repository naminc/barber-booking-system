import React from "react";
import beard from "../imgs/beard.png";
import bottle from "../imgs/bottle.png";
import hairDrayer from "../imgs/hair-dryer.png";
import blade from "../imgs/blade.png";
import scissors from "../imgs/scissors.png";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { useServices } from "../hooks";

const Services = () => {
  const navigate = useNavigate();
  const { services, loading } = useServices();

  // Default images
  const defaultImages = [scissors, blade, hairDrayer, bottle, beard];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    return `${apiUrl.replace("/api", "")}${imagePath}`;
  };

  // Chỉ lấy dịch vụ active
  const activeServices = services.filter((s) => s.status === "active");

  return (
    <div id="services">
      <section className="flex justify-center items-center flex-col py-20">
        <div className="lg:w-4/6 w-5/6 flex items-center flex-col">
          <h3 className="text-4xl text-gold font-semibold font-RobotoCondensed">
            DỊCH VỤ CỦA CHÚNG TÔI
          </h3>
          <p className="font-medium text-center">
            Chúng tôi mang đến những dịch vụ tốt nhất dành cho phái mạnh.
          </p>

          {loading ? (
            <div className="mt-8 text-gray-400">Đang tải dịch vụ...</div>
          ) : activeServices.length > 0 ? (
            <div className="flex justify-center items-center flex-wrap mt-8">
              {activeServices.map((service, index) => {
                const imageUrl = getImageUrl(service.image);
                const displayImage = imageUrl || defaultImages[index % defaultImages.length];

                return (
                  <div key={service.id} className="card text-center m-3">
                    <img src={displayImage} alt={service.name} className="mx-auto mb-2" />
                    <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                      {service.name}
                    </h4>
                    <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 text-gray-400">Chưa có dịch vụ nào</div>
          )}
        </div>
        <div className="mt-10">
          <button
            onClick={() => navigate("/booking")}
            className="flex items-center gap-2 bg-gradient-to-r from-[#c29e75] to-[#a47e4f] 
             text-black font-semibold py-2.5 px-6 rounded-full shadow-md 
             hover:shadow-[#c29e75]/40 hover:scale-105 transition-all duration-300 text-base"
          >
            <FaCalendarAlt className="text-lg" />
            Đặt lịch ngay
          </button>
        </div>
      </section>

      <section className="w-full hero3-image h-[400px] flex justify-center items-center flex-col text-white-200 text-center">
        <h3 className="md:text-2xl text-xl mb-10 font-bold">
          “Hãy để chúng tôi giúp bạn trở nên tự tin và phong cách hơn mỗi ngày.”
        </h3>
        <small className="text-lg">
          Dịch vụ chuyên nghiệp - Phong cách đẳng cấp - Trải nghiệm thư giãn
          tuyệt vời.
        </small>
      </section>
    </div>
  );
};

export default Services;
