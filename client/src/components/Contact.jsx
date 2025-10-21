import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useSettingsContext } from "../context/SettingsContext";
const Contact = () => {
  const { getSetting } = useSettingsContext();
  const shopEmail = getSetting("email");
  const shopPhone = getSetting("phone");
  return (
    <section
      id="contact"
      className="flex justify-center py-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
    >
      <div className="md:w-3/5 w-4/5 flex gap-10 lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-[#c29e75]/30 aspect-[4/3]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.0642405995764!2d106.7411711746981!3d10.842647089310137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c64a18e851%3A0x80ec03330791ae1!2zUlBWViszR1EsIDMgxJAuIFPhu5EgMzAsIExpbmggxJDDtG5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1760080336180!5m2!1svi!2s"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
        <div className="flex flex-col items-start lg:w-1/2 w-full gap-4">
          <h3 className="text-4xl text-[#c29e75] font-semibold font-RobotoCondensed">
            Liên hệ với chúng tôi
          </h3>

          <div className="flex flex-col text-gray-300 text-lg font-medium gap-1">
            <a
              href={`mailto:${shopEmail}`}
              className="hover:text-[#c29e75] transition-all duration-200"
            >
              {shopEmail}
            </a>
            <a
              href={`tel:${shopPhone}`}
              className="hover:text-[#c29e75] transition-all duration-200"
            >
              {shopPhone }
            </a>
          </div>

          <div className="flex flex-col w-full gap-5 mt-4">
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="text"
              placeholder="Họ và tên của bạn"
            />
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="phone"
              placeholder="Số điện thoại"
            />
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="email"
              placeholder="Email"
            />
            <textarea
              rows="4"
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200 resize-none"
              placeholder="Lời nhắn của bạn..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c29e75] to-[#a47e4f] text-black font-semibold uppercase py-2 px-6 rounded-full shadow-md hover:shadow-[#c29e75]/40 hover:scale-105 transition-all duration-300"
          >
            <FaPaperPlane className="text-lg" />
            Gửi liên hệ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
