import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { logout } from "../utils/auth";
import { useSettingsContext } from "../context/SettingsContext";

const Header = () => {
  const { getSetting } = useSettingsContext();

  const websiteName = getSetting("websiteName");
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      logout(navigate);
    }
  };

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
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl hover:text-white transition-all duration-200"
          onClick={() => setMenuOpen(false)}
        >
          {websiteName}
        </Link>

        {/* Nút menu mobile */}
        <button
          className="md:hidden text-2xl text-[#c29e75] hover:text-white transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold items-center">
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
                  }
                }}
                className="hover:text-white transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link to="/booking" className="hover:text-white transition-all">
                  ĐẶT LỊCH
                </Link>
              </li>
              <li>
                <Link to="/review" className="hover:text-white transition-all">
                  ĐÁNH GIÁ
                </Link>
              </li>
            </>
          )}

          {/* Dropdown tài khoản */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:text-white transition-all"
            >
              {" "}
              TÀI KHOẢN
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 bg-[#111] border border-[#c29e75]/30 rounded-xl shadow-lg w-48 py-2 z-50 animate-fadeIn">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#c29e75]/20 transition-all"
                    >Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#c29e75]/20 transition-all"
                    >Đăng ký
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b border-[#c29e75]/20 text-sm text-[#e5d1aa]">
                      👋 {user.name}
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#c29e75]/20 transition-all"
                    >Hồ sơ
                    </Link>
                    {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#c29e75]/20 transition-all"
                      >Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-[#c29e75]/20 transition-all"
                    >Đăng xuất
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>

        {/* Menu mobile */}
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
                      }
                      setMenuOpen(false);
                    }}
                    className="hover:text-white transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-all"
                >
                  ĐẶT LỊCH
                </Link>
              </li>
              <li>
                <Link
                  to="/review"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-all"
                >
                  ĐÁNH GIÁ
                </Link>
              </li>

              {!user ? (
                <>
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
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-white transition-all"
                    >
                      ĐĂNG KÝ
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-white transition-all"
                    >
                      HỒ SƠ
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="hover:text-white transition-all"
                    >
                      ĐĂNG XUẤT
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
