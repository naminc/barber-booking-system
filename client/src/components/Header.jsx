import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#1a1a1a]/95 text-[#c29e75] py-4 shadow-md fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="font-bold text-xl hover:text-white transition-all duration-200"
          onClick={() => setMenuOpen(false)}
        >
          NAMINC BARBER
        </Link>

        <button
          className="md:hidden text-2xl text-[#c29e75] hover:text-white transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu (desktop) */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("body");
                }
              }}
              className="hover:text-white transition-all"
            >
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("#about");
                }
              }}
              className="hover:text-white transition-all"
            >
              VỀ CHÚNG TÔI
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("#services");
                }
              }}
              className="hover:text-white transition-all"
            >
              DỊCH VỤ
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("#hours");
                }
              }}
              className="hover:text-white transition-all"
            >
              GIỜ LÀM VIỆC
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("#prices");
                }
              }}
              className="hover:text-white transition-all"
            >
              BẢNG GIÁ
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("#contact");
                }
              }}
              className="hover:text-white transition-all"
            >
              LIÊN HỆ
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-white transition-all">
              ĐĂNG NHẬP
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-white transition-all">
              TÀI KHOẢN
            </Link>
          </li>
        </ul>

        {/* Menu (mobile) */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a]/95 border-t border-[#c29e75]/20 shadow-lg md:hidden">
            <ul className="flex flex-col items-center gap-4 py-6 text-sm font-semibold">
              {[
                { id: "body", label: "TRANG CHỦ" },
                { id: "#about", label: "VỀ CHÚNG TÔI" },
                { id: "#services", label: "DỊCH VỤ" },
                { id: "#hours", label: "GIỜ LÀM VIỆC" },
                { id: "#prices", label: "BẢNG GIÁ" },
                { id: "#contact", label: "LIÊN HỆ" },
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    to="/"
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        scrollToSection(item.id);
                      } else setMenuOpen(false);
                    }}
                    className="hover:text-white transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-all"
                >
                  ĐĂNG NHẬP
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-all"
                >
                  TÀI KHOẢN
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
