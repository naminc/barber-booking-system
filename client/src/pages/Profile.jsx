import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaCut,
  FaEdit,
} from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../theme.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987 654 321",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        date: "2025-10-01",
        time: "14:30",
        service: "Cắt tóc nam + gội đầu",
        barber: "Anh Hưng Barber",
        status: "Hoàn thành",
      },
      {
        id: 2,
        date: "2025-09-21",
        time: "16:00",
        service: "Cạo râu + xả stress",
        barber: "Anh Tuấn",
        status: "Đã hủy",
      },
      {
        id: 3,
        date: "2025-09-10",
        time: "10:00",
        service: "Cắt tóc cao cấp",
        barber: "Anh Hưng Barber",
        status: "Hoàn thành",
      },
    ];
    setBookings(fakeData);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      <Header />

      <div className="px-4 py-24">
        <div className="barber-box max-w-5xl mx-auto p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-[var(--color-gold)]/20 pb-8 mb-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-2 border-[var(--color-gold)] shadow-[0_0_20px_rgba(194,158,117,0.3)] object-cover"
                />
                <span className="absolute -bottom-1 -right-1 bg-[var(--color-gold)] text-black text-xs font-semibold px-2 py-0.5 rounded-full">
                  {user.name.split(" ")[1] || "User"}
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[var(--color-gold)] drop-shadow-[0_1px_3px_rgba(194,158,117,0.4)]">
                  {user.name}
                </h2>
                <p className="flex items-center gap-2 text-gray-300 mt-2">
                  <FaEnvelope className="text-[var(--color-gold)]" />{" "}
                  {user.email}
                </p>
                <p className="flex items-center gap-2 text-gray-300 mt-1">
                  <FaPhoneAlt className="text-[var(--color-gold)]" />{" "}
                  {user.phone}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="barber-btn flex items-center gap-2 mt-8 md:mt-0 px-6 py-2"
            >
              <FaEdit /> Chỉnh sửa
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[var(--color-gold)] flex items-center gap-2">
              <FaCalendarAlt /> Lịch sử đặt lịch
            </h3>

            {bookings.length === 0 ? (
              <p className="text-gray-400 text-center">
                Bạn chưa có lịch sử đặt lịch nào.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-[var(--color-gold)]/30 shadow-inner shadow-black/40">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gradient-to-r from-[#1f1b15] to-[#1a1a1a] text-[var(--color-gold)] uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-4 py-3 border-b border-[var(--color-gold)]/30 text-left">
                        Ngày
                      </th>
                      <th className="px-4 py-3 border-b border-[var(--color-gold)]/30 text-left">
                        Giờ
                      </th>
                      <th className="px-4 py-3 border-b border-[var(--color-gold)]/30 text-left">
                        Dịch vụ
                      </th>
                      <th className="px-4 py-3 border-b border-[var(--color-gold)]/30 text-left">
                        Barber
                      </th>
                      <th className="px-4 py-3 border-b border-[var(--color-gold)]/30 text-left">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr
                        key={b.id}
                        className={`transition-all duration-200 ${
                          i % 2 === 0 ? "bg-[#191716]/80" : "bg-[#111]/80"
                        } hover:bg-[#2a231a]/80 hover:shadow-[inset_0_0_10px_rgba(194,158,117,0.2)]`}
                      >
                        <td className="px-4 py-3 text-gray-300 border-b border-[var(--color-gold)]/20">
                          {b.date}
                        </td>
                        <td className="px-4 py-3 text-gray-300 border-b border-[var(--color-gold)]/20">
                          {b.time}
                        </td>
                        <td className="px-4 py-3 text-gray-200 border-b border-[var(--color-gold)]/20">
                          {b.service}
                        </td>
                        <td className="px-4 py-3 text-gray-300 border-b border-[var(--color-gold)]/20">
                          {b.barber}
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold border-b border-[var(--color-gold)]/20 ${
                            b.status === "Hoàn thành"
                              ? "text-emerald-400"
                              : b.status === "Đã hủy"
                              ? "text-rose-400"
                              : "text-amber-300"
                          }`}
                        >
                          {b.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/booking")}
              className="barber-btn flex items-center justify-center gap-2 px-8 py-3 mx-auto"
            >
              <FaCut /> Đặt lịch mới
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
