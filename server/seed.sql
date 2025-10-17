DELETE FROM appointments;
DELETE FROM users;
DELETE FROM services;
DELETE FROM staff;

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE services AUTO_INCREMENT = 1;
ALTER TABLE staff AUTO_INCREMENT = 1;


INSERT INTO users (name, email, password, role, phone)
VALUES
('Nguyen Van A', 'a@example.com', '123456', 'admin', '0901234567'),
('Tran Thi B', 'b@example.com', '123456', 'user', '0902345678'),
('Le Van C', 'c@example.com', '123456', 'user', '0903456789');

-- SERVICES
INSERT INTO services (name, description, price, duration, image, status)
VALUES
('Cắt tóc nam', 'Cắt tóc nam chuyên nghiệp, tạo kiểu theo yêu cầu', 100000, 30, 'uploads/services/haircut.jpg', 'active'),
('Gội đầu dưỡng sinh', 'Gội đầu thư giãn với tinh dầu thiên nhiên', 80000, 25, 'uploads/services/shampoo.jpg', 'active'),
('Nhuộm tóc', 'Nhuộm tóc thời trang với sản phẩm cao cấp', 250000, 60, 'uploads/services/coloring.jpg', 'active');

-- STAFF
INSERT INTO staff (name, specialization, phone, status)
VALUES
('Nguyen Hoang', 'Cắt tóc, tạo kiểu', '0901111222', 'active'),
('Tran Quoc', 'Nhuộm và tạo kiểu', '0903333444', 'active'),
('Pham Long', 'Cạo râu và gội đầu', '0905555666', 'active');

INSERT INTO appointments (user_id, service_id, staff_id, appointment_date, status, note)
VALUES
(1, 1, 1, '2025-10-12 09:00:00', 'confirmed', 'Khách quen, cắt ngắn gọn'),
(2, 2, 3, '2025-10-13 14:30:00', 'pending', 'Gội đầu thư giãn'),
(3, 3, 2, '2025-10-14 16:00:00', 'completed', 'Nhuộm màu nâu tây');


INSERT INTO settings (title, keywords, description, domain, owner, email, phone, address)
VALUES
('Barber Booking', 'barber, booking, hair, salon, cắt tóc nam, đặt lịch', 'Professional barber booking platform for modern salons', 'http://localhost:5173', 'Ngo Dinh Nam', 'admin@naminc.dev', '0909090909', '615 Âu Cơ, Phú Trung, Tân Phú, TP.HCM');