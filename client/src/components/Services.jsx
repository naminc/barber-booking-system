import React from "react";
import beard from "../imgs/beard.png";
import bottle from "../imgs/bottle.png";
import hairDrayer from "../imgs/hair-dryer.png";
import blade from "../imgs/blade.png";
import scissors from "../imgs/scissors.png";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();
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
          <div className="flex justify-center items-center flex-wrap mt-8">
            <div className="card text-center m-3">
              <img src={scissors} alt="" className="mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                Cắt tóc cơ bản
              </h4>
              <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                Kiểu tóc gọn gàng, phù hợp với khuôn mặt và phong cách của bạn.
                Dành cho những quý ông ưa sự chỉnh chu.
              </p>
            </div>
            <div className="card text-center m-3">
              <img src={blade} alt="" className="mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                Cạo râu truyền thống
              </h4>
              <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                Trải nghiệm cảm giác thư giãn với dao cạo chuyên dụng và tay
                nghề chuẩn Barber.
              </p>
            </div>
            <div className="card text-center m-3">
              <img src={hairDrayer} alt="" className="mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                Gội đầu & tạo kiểu
              </h4>
              <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                Gội đầu thư giãn với tinh dầu tự nhiên, sấy tạo kiểu sang trọng
                và lịch lãm.
              </p>
            </div>
            <div className="card text-center m-3">
              <img src={bottle} alt="" className="mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                Phục hồi tóc
              </h4>
              <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                Dưỡng tóc chuyên sâu giúp tóc khỏe mạnh, bóng mượt và phục hồi
                hư tổn hiệu quả.
              </p>
            </div>
            <div className="card text-center m-3">
              <img src={beard} alt="" className="mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-[#fdf8f2] leading-tight mt-2 mb-1 tracking-wide">
                Tỉa & tạo kiểu râu
              </h4>
              <p className="px-4 py-2 text-[15px] leading-snug text-gray-300">
                Chăm sóc râu chuyên nghiệp, tỉa gọn và tạo hình phù hợp với
                khuôn mặt của bạn.
              </p>
            </div>
          </div>
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
