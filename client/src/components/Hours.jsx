import React from "react";
import "../theme.css";
import { useSettingsContext } from "../context/SettingsContext";
import { formatPhoneForTel, formatPhoneForDisplay } from "../utils/phoneHelper";
const Hours = () => {
  const { getSetting } = useSettingsContext();
  const shopOwner = getSetting("owner");
  const shopPhone = getSetting("phone");
  const shopPhoneDisplay = formatPhoneForDisplay(shopPhone);
  const shopPhoneTel = formatPhoneForTel(shopPhone);
  const days = [
    { day: "Mon", time: "9:00 AM - 7:00 PM" },
    { day: "Tue", time: "9:00 AM - 7:00 PM" },
    { day: "Wed", time: "9:00 AM - 7:00 PM" },
    { day: "Thu", time: "9:00 AM - 7:00 PM" },
    { day: "Fri", time: "9:00 AM - 7:00 PM" },
    { day: "Sat", time: "9:00 AM - 7:00 PM" },
    { day: "Sun", time: "Đóng cửa" },
  ];

  return (
    <div id="hours" className="text-white bg-[#0d0d0d]">
      {/* Thời gian làm việc */}
      <section className="flex flex-col items-center py-20">
        <div className="lg:w-4/6 w-5/6 flex flex-col items-center">
          <h3 className="text-4xl font-bold text-[var(--color-gold)] tracking-wide uppercase mb-2">
            Thời gian làm việc
          </h3>
          <p className="text-gray-400 text-center max-w-md">
            Chúng tôi luôn sẵn sàng phục vụ bạn với phong cách chuyên nghiệp và
            tận tâm.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
            {days.map((item, i) => (
              <div
                key={i}
                className={`H-card flex flex-col items-center justify-center text-center border border-[var(--color-gold)]/30 rounded-xl 
                  bg-gradient-to-b from-[#1b1b1b]/70 to-[#111]/90 w-36 h-40 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:scale-105 
                  hover:border-[var(--color-gold)]/70 hover:shadow-[0_0_25px_rgba(194,158,117,0.3)] transition-all duration-300`}
              >
                <h3 className="font-bold text-xl uppercase mb-2 text-[var(--color-gold)]">
                  {item.day}
                </h3>
                {item.time === "Đóng cửa" ? (
                  <span className="text-gray-400 font-medium">Đóng cửa</span>
                ) : (
                  <div className="text-sm leading-relaxed">
                    <p className="text-gray-200">{item.time.split("-")[0]}</p>
                    <p className="text-[#c29e75] text-xs my-1">đến</p>
                    <p className="text-gray-200">{item.time.split("-")[1]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="text-center mt-16 bg-[#111]/60 border border-[var(--color-gold)]/30 rounded-2xl px-8 py-6 shadow-[0_0_25px_rgba(0,0,0,0.4)]">
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-gold)] mb-2">
              Đặt lịch? Gọi chúng tôi ngay
            </h2>
            <a
              href={`tel:${shopPhoneTel}`}
              className="text-2xl font-bold text-white hover:text-[var(--color-gold)] transition-all duration-200"
            >
              {shopPhoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Barber Quote Section */}
      <section className="w-full hero2-image h-[400px] flex flex-col justify-center items-center text-white text-center bg-[#111]/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6em"
          height="6em"
          viewBox="0 0 24 24"
          className="fill-current text-[var(--color-gold)] mb-4"
        >
          <path d="M16.372 11.621c1.57 0 2.628 1.092 2.628 2.71C19 15.787 17.784 17 16.137 17C14.333 17 13 15.544 13 13.32c0-5.055 3.686-7.077 6-7.32v2.224c-1.569.283-3.333 1.86-3.412 3.6c.079-.04.392-.203.784-.203Zm-7.999 0c1.568 0 2.627 1.092 2.627 2.71C11 15.787 9.784 17 8.137 17C6.333 17 5 15.544 5 13.32C5 8.265 8.686 6.243 11 6v2.224c-1.569.283-3.333 1.86-3.412 3.6c.079-.04.392-.203.785-.203Z" />
        </svg>
        <h3 className="md:text-2xl text-xl font-semibold text-gray-200 leading-relaxed max-w-2xl">
          “ Một mái tóc đẹp không chỉ là phong cách, mà còn là phong thái của
          bạn. ”
        </h3>
        <small className="mt-4 text-lg text-[var(--color-gold)] font-semibold">
          - {shopOwner} -
        </small>
      </section>
    </div>
  );
};

export default Hours;
