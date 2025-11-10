-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 08, 2025 lúc 02:32 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `barber_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL COMMENT 'Tên khách hàng ',
  `customer_phone` varchar(20) DEFAULT NULL COMMENT 'Số điện thoại khách hàng',
  `service_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `status` enum('pending','confirmed','completed','cancelled') DEFAULT 'pending',
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `customer_name`, `customer_phone`, `service_id`, `staff_id`, `appointment_date`, `status`, `note`, `created_at`, `updated_at`) VALUES
(45, 9, 'Ngo Dinh Nam', '0347101143', 12, 9, '2025-11-06 09:00:00', 'completed', NULL, '2025-11-05 06:45:54', '2025-11-05 06:52:32'),
(49, 9, 'Ngo Dinh Nam', '0347101143', 8, 8, '2025-11-05 16:00:00', 'confirmed', NULL, '2025-11-05 07:49:44', '2025-11-05 07:50:25'),
(50, 9, 'Ngo Dinh Nam', '0347101143', 8, 8, '2025-11-07 10:00:00', 'cancelled', NULL, '2025-11-05 08:02:10', '2025-11-05 08:02:23'),
(51, 9, 'Ngo Dinh Nam', '0347101143', 8, 8, '2025-11-08 15:30:00', 'pending', NULL, '2025-11-08 07:41:46', '2025-11-08 07:41:46'),
(52, NULL, 'Test', '0347101143', 8, 8, '2025-11-09 10:00:00', 'confirmed', NULL, '2025-11-08 08:07:21', '2025-11-08 08:07:21'),
(55, NULL, 'Test API', '0912345678', 8, 8, '2025-12-25 14:30:00', 'confirmed', 'Khách hàng VIP, ưu tiên', '2025-11-08 08:13:53', '2025-11-08 08:13:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(9, 'Dang Cong Danh', 'congdanh.201@outlook.com', '0868889613', 'Liên hệ từ Dang Cong Danh - 0868889613', 'Test2', 'unread', '2025-10-31 04:30:17', '2025-10-31 04:30:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `experience` enum('excellent','good','average','poor') DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` int(11) DEFAULT 30,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `duration`, `image`, `status`, `created_at`, `updated_at`) VALUES
(8, 'Cắt tóc cơ bản', 'Kiểu tóc gọn gàng, phù hợp với khuôn mặt và phong cách của bạn. Dành cho những quý ông ưa sự chỉnh chu.', 60000.00, 30, '/uploads/1761154893543-770471485.png', 'active', '2025-10-22 17:35:56', '2025-10-22 17:42:04'),
(9, 'Cạo râu truyền thống', 'Trải nghiệm cảm giác thư giãn với dao cạo chuyên dụng và tay nghề chuẩn Barber.', 50000.00, 20, '/uploads/1761155006401-34221249.png', 'active', '2025-10-22 17:38:04', '2025-10-22 17:43:27'),
(10, 'Gội đầu & tạo kiểu', 'Gội đầu thư giãn với tinh dầu tự nhiên, sấy tạo kiểu sang trọng và lịch lãm.', 80000.00, 45, '/uploads/1761154955548-787834313.png', 'active', '2025-10-22 17:39:54', '2025-10-22 17:42:36'),
(11, 'Phục hồi tóc', 'Dưỡng tóc chuyên sâu giúp tóc khỏe mạnh, bóng mượt và phục hồi hư tổn hiệu quả.', 120000.00, 60, '/uploads/1761154991163-392042946.png', 'active', '2025-10-22 17:43:18', '2025-10-22 17:43:18'),
(12, 'Tỉa & tạo kiểu râu', 'Chăm sóc râu chuyên nghiệp, tỉa gọn và tạo hình phù hợp với khuôn mặt của bạn.', 100000.00, 40, '/uploads/1761155039859-875961488.png', 'active', '2025-10-22 17:44:00', '2025-10-22 17:44:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `domain` varchar(100) NOT NULL,
  `websiteName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slogan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(100) NOT NULL,
  `developer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `iframeGoogleMap` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `settings`
--

INSERT INTO `settings` (`id`, `title`, `keywords`, `description`, `domain`, `websiteName`, `slogan`, `owner`, `developer`, `email`, `phone`, `address`, `iframeGoogleMap`, `created_at`, `updated_at`) VALUES
(1, 'Barber Booking Test', 'barber, booking, hair, salon, cắt tóc nam', 'barber, booking, hair, salon, cắt tóc nam', 'localhost:5173', 'NAMINC', 'Phong cách – Tinh tế – Đẳng cấp Barber Việt', 'Ngo Dinh Nam', 'naminc', 'admin@naminc.dev', '(+84) 347 101 143', '615 Âu Cơ, Phú Trung, Tân Phú, TP.HCM', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.0642405995764!2d106.7411711746981!3d10.842647089310137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c64a18e851%3A0x80ec03330791ae1!2zUlBWViszR1EsIDMgxJAuIFPhu5EgMzAsIExpbmggxJDDtG5nLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1760080336180!5m2!1svi!2s', '2025-10-08 02:22:11', '2025-10-18 21:36:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT 'Tên thợ',
  `specialization` varchar(150) DEFAULT NULL COMMENT 'Chuyên môn của thợ',
  `phone` varchar(20) DEFAULT NULL COMMENT 'Số điện thoại liên hệ',
  `experience` varchar(50) DEFAULT NULL COMMENT 'Kinh nghiệm làm việc',
  `image` varchar(255) DEFAULT NULL COMMENT 'Đường dẫn hình ảnh',
  `status` enum('active','inactive') DEFAULT 'active' COMMENT 'Trạng thái hoạt động',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `staff`
--

INSERT INTO `staff` (`id`, `name`, `specialization`, `phone`, `experience`, `image`, `status`, `created_at`, `updated_at`) VALUES
(8, 'Anh Nam', 'Cắt râu mày', '0347101143', '1-2 năm', '/uploads/1761203712882-21151400.jpg', 'active', '2025-10-23 07:07:11', '2025-11-05 06:40:58'),
(9, 'Anh Khoa', 'Tất cả dịch vụ', '0347101143', 'Dưới 1 năm', '/uploads/1761203603486-235812381.jpg', 'active', '2025-10-23 07:13:24', '2025-10-23 07:13:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `phone` varchar(20) DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Nguyen Tuan Khoa', 'admin@xdoop.com', '$2y$10$6D/CXmMO9q2BfXv9G7Jwzue.u3h7oEIoce05pN0vO4oiUV89sd.ei', 'user', '0336999301', 'active', '2025-10-08 08:00:48', '2025-10-08 08:00:48'),
(8, 'Test', 'test@naminc.io', '$2b$10$hjRRHT03ZJgFP.m9QGmsseU//qAHcdF6JrWDycIwPCqZcrP5HKo/y', 'admin', '0999999999', 'active', '2025-10-08 08:45:25', '2025-10-08 08:45:25'),
(9, 'Ngo Dinh Nam', 'admin@naminc.dev', '$2b$10$L.0TcLOrp9AqA12rpihDGev5ckQSvU/uXIMs.YcOOlYVZYSKC9BTu', 'admin', '0347101143', 'active', '2025-10-09 03:00:04', '2025-10-21 07:29:58'),
(22, 'Test2', 'test2@naminc.app', '$2b$10$dFlkfEsM3JdgzaDx2SgrzeOBC113qS48BYaFErtbqljjXvRGr1T82', 'user', '0868889613', 'inactive', '2025-10-21 14:22:14', '2025-10-21 14:22:33'),
(23, 'Ngo Dinh Nam', 'info@naminc.dev', '$2b$10$rv52VLF/0i6cSTaZBrQkdeloTavVNgOhkaDZYyMf5lCWGc/ahECRm', 'user', '0868889614', 'active', '2025-10-23 13:28:01', '2025-10-23 13:35:05'),
(24, 'Dang Cong Danh', 'congdanh@outlook.com', '$2b$10$DMkrQBf6feY79.V1pqhHqO56d0ejl/CqvMoaJYuDTnErOdE.PCGh6', 'user', '0867772341', 'inactive', '2025-10-23 13:42:43', '2025-10-23 13:44:58'),
(25, 'Ngô Đình Nam', 'admin@naminc.devc', '$2b$10$ZUyoAQptFbHFOv838mb5Ge6eQmD2uEu5bJ0uuwjXBbCutzk.ABNhe', 'user', '0868889611', 'active', '2025-10-30 08:26:23', '2025-10-30 08:27:15'),
(26, 'Ngo Dinh Nam', 'ngodinhnam.dev@gmail.com', '$2b$10$AeSmPczH8W4MhQ0Qjt7zS.aP6eohkcIInCUCwiDjNE7JuhDlVV.ou', 'user', NULL, 'active', '2025-11-08 13:26:48', '2025-11-08 13:29:55');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Chỉ mục cho bảng `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `expires_at` (`expires_at`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Chỉ mục cho bảng `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Chỉ mục cho bảng `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`);

--
-- Các ràng buộc cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `password_resets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
