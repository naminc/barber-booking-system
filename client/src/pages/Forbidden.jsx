import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] text-white text-center px-4">
      <h1 className="text-6xl font-bold text-[#c29e75] mb-4">403</h1>
      <p className="text-lg text-gray-300 mb-6">
        Bạn không có quyền truy cập vào trang này.
      </p>
      <Link
        to="/"
        className="bg-gradient-to-r from-[#c29e75] to-[#a47e4f] text-black px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        Quay lại trang chủ
      </Link>
    </main>
  );
};

export default Forbidden;