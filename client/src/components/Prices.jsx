import React from "react";

const Prices = () => {
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
        Chúng tôi mang đến cho bạn những dịch vụ chăm sóc tóc và râu chuyên nghiệp nhất.
      </p>

      {/* Price */}
      <div className="flex justify-between md:w-3/5 w-4/5 mt-10 lg:flex-row flex-col gap-10">
        {/* Column: Cut hair */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-[#c29e75] font-bold text-lg bg-[#1a1a1a] inline-block py-1 px-3 uppercase mb-4 rounded-md shadow-inner shadow-black/30">
            CẮT TÓC
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Cắt tóc cơ bản</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Cắt gọn gàng, tạo kiểu phù hợp khuôn mặt và phong cách cá nhân.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Cắt tông đơ</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Kiểu tóc gọn gàng nhanh chóng, thích hợp cho khách hàng bận rộn.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Skin Fade</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Tạo hiệu ứng mờ dần chuyên nghiệp, phong cách hiện đại và năng động.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Cạo đầu khăn nóng</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Dịch vụ cao cấp giúp da đầu thư giãn, loại bỏ tế bào chết và sạch sâu.
              </p>
            </div>
          </div>
        </div>

        {/* Column: Shave beard */}
        <div className="lg:w-1/2 w-full">
          <h3 className="text-[#c29e75] font-bold text-lg bg-[#1a1a1a] inline-block py-1 px-3 uppercase mb-4 rounded-md shadow-inner shadow-black/30">
            CẠO RÂU & CHĂM SÓC RÂU
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Cạo mặt khăn nóng</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Thư giãn với dao cạo truyền thống và khăn nóng giúp da mềm mại, sạch sâu.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Tỉa râu</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Tạo hình râu chuyên nghiệp, giúp khuôn mặt cân đối và phong cách hơn.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Tạo kiểu râu</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Định hình râu theo phong cách riêng, tinh tế và cuốn hút.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-xl text-[#fdf8f2]">Kẻ viền râu</h5>
                <h6 className="font-bold text-lg text-[#c29e75]">50.000 VNĐ</h6>
              </div>
              <p className="text-gray-400 text-sm leading-snug mt-1">
                Đường viền sắc nét, tinh tế — tạo ấn tượng mạnh mẽ cho gương mặt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
