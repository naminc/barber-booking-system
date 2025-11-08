import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useSettingsContext } from "../context/SettingsContext";
import contactsApi from "../api/contactsApi";
import { formatPhoneForTel, formatPhoneForDisplay } from "../utils/phoneHelper";

const Contact = () => {
  const { getSetting } = useSettingsContext();
  const shopEmail = getSetting("email");
  const shopPhone = getSetting("phone");
  const shopPhoneDisplay = formatPhoneForDisplay(shopPhone);
  const shopPhoneTel = formatPhoneForTel(shopPhone);
  const iframeGoogleMap = getSetting("iframeGoogleMap");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);
      await contactsApi.createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Liên hệ từ ${formData.name} - ${formData.phone}`,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert(error.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex justify-center py-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
    >
      <div className="md:w-3/5 w-4/5 flex gap-10 lg:flex-row flex-col">
        <div className="lg:w-1/2 w-full rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-[#c29e75]/30 aspect-[4/3]">
          <iframe
            src={iframeGoogleMap}
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
              href={`tel:${shopPhoneTel}`}
              className="hover:text-[#c29e75] transition-all duration-200"
            >
              {shopPhoneDisplay}
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-5 mt-4"
          >
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Họ và tên của bạn *"
              required
            />
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Số điện thoại *"
              required
            />
            <input
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              required
            />
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent py-2 border-b border-[#c29e75]/50 pl-1 text-[#fdf8f2] placeholder:text-gray-400 outline-none focus:border-[#c29e75] transition-all duration-200 resize-none"
              placeholder="Lời nhắn của bạn... *"
              required
            ></textarea>

            {success && (
              <div className="text-green-400 text-sm bg-green-900/20 border border-green-400/30 rounded-lg px-4 py-2">
                ✓ Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c29e75] to-[#a47e4f] text-black font-semibold uppercase py-2 px-6 rounded-full shadow-md hover:shadow-[#c29e75]/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="text-lg" />
              {loading ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
