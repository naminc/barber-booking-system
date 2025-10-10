import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="flex justify-center bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white border-t border-[#c29e75]/20 pt-10 pb-6"
    >
      <div className="w-full text-center py-10 flex flex-col items-center gap-5">
        <p className="text-[#c29e75] text-lg font-semibold font-RobotoCondensed tracking-wide">
          Phong cách – Tinh tế – Đẳng cấp Barber Việt
        </p>
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} NAMINC BARBER. Mọi quyền được bảo lưu.{" "}
          <br className="md:hidden" />
          Thiết kế bởi{" "}
          <a
            href="https://naminc.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c29e75] hover:text-[#e8c891] transition-all duration-300"
          >
            @naminc
          </a>
        </p>

        <div className="flex gap-6 text-2xl justify-center">
          <a
            href="https://github.com/naminc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c29e75] transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/naminc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c29e75] transition-all duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/nam1nc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c29e75] transition-all duration-300"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;