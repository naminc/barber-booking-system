import React from "react";
import { useServices } from "../hooks";

const Prices = () => {
  const { services, loading } = useServices();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Lọc chỉ lấy dịch vụ active
  const activeServices = services.filter((s) => s.status === "active");

  return (
    <section
      id="prices"
      className="flex items-center justify-center flex-col py-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
    >
      {/* Title */}
      <h3 className="text-4xl text-gold font-semibold font-RobotoCondensed">
        BẢNG GIÁ DỊCH VỤ
      </h3>
      <p className="font-medium text-center text-gray-300 mt-2">
        Chúng tôi mang đến cho bạn những dịch vụ chăm sóc tóc và râu chuyên
        nghiệp nhất.
      </p>

      {/* Price */}
      {loading ? (
        <div className="mt-10 text-gray-400">Đang tải bảng giá...</div>
      ) : activeServices.length > 0 ? (
        <div className="flex justify-between md:w-3/5 w-4/5 mt-10 lg:flex-row flex-col gap-10">
          <div className="w-full">
            <div className="space-y-5">
              {activeServices.map((service) => (
                <div key={service.id}>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-xl text-[#fdf8f2]">
                          {service.name}
                        </h5>
                        {service.duration && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#c29e75]/20 text-[#c29e75] border border-[#c29e75]/50">
                            {service.duration} phút
                          </span>
                        )}
                      </div>
                    </div>
                    <h6 className="font-bold text-lg text-[#c29e75] ml-4">
                      {formatPrice(service.price)}
                    </h6>
                  </div>
                  <p className="text-gray-400 text-sm leading-snug mt-1">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 text-gray-400">Chưa có dịch vụ nào</div>
      )}
    </section>
  );
};

export default Prices;
