CREATE DATABASE IF NOT EXISTS `restaurant_db`;
USE `restaurant_db`;

-- Tạo bảng user
CREATE TABLE `user` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255),
    `email` VARCHAR(255),
    `password` VARCHAR(255),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng restaurant
CREATE TABLE `restaurant` (
    `res_id` INT AUTO_INCREMENT PRIMARY KEY,
    `res_name` VARCHAR(255),
    `image` VARCHAR(255),
    `desc` VARCHAR(255),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng food_type
CREATE TABLE `food_type` (
    `type_id` INT AUTO_INCREMENT PRIMARY KEY,
    `type_name` VARCHAR(255),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng food
CREATE TABLE `food` (
    `food_id` INT AUTO_INCREMENT PRIMARY KEY,
    `food_name` VARCHAR(255),
    `image` VARCHAR(255),
    `price` FLOAT,
    `desc` VARCHAR(255),
    `type_id` INT,
    FOREIGN KEY (`type_id`) REFERENCES `food_type`(`type_id`),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng sub_food
CREATE TABLE `sub_food` (
    `sub_id` INT AUTO_INCREMENT PRIMARY KEY,
    `sub_name` VARCHAR(255),
    `sub_price` FLOAT,
    `food_id` INT,
    FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng order
CREATE TABLE `order` (
    `user_id` INT,
    `food_id` INT,
    `amount` INT,
    `code` VARCHAR(255),
    `arr_sub_id` VARCHAR(255),
    PRIMARY KEY (`user_id`, `food_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng like_res
CREATE TABLE `like_res` (
    `user_id` INT,
    `res_id` INT,
    `date_like` DATETIME,
    PRIMARY KEY (`user_id`, `res_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng rate_res
CREATE TABLE `rate_res` (
    `user_id` INT,
    `res_id` INT,
    `amount` INT,
    `date_rate` DATETIME,
    PRIMARY KEY (`user_id`, `res_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`res_id`) REFERENCES `restaurant`(`res_id`),
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Thêm dữ liệu user (7 người, 1 người không order là user_id = 7)
INSERT INTO `user` (`full_name`, `email`, `password`) VALUES
('Nguyễn Văn A', 'vana@example.com', 'pass123'),
('Trần Thị B', 'thib@example.com', 'pass456'),
('Lê Văn C', 'vanc@example.com', 'pass789'),
('Phạm Minh D', 'minhd@example.com', 'pass321'),
('Hoàng Thị E', 'thie@example.com', 'pass654'),
('Nguyễn Thị F', 'thif@example.com', 'pass111'),
('Võ Văn G', 'vang@example.com', 'pass222'); -- không order

-- Thêm nhà hàng
INSERT INTO `restaurant` (`res_name`, `image`, `desc`) VALUES
('Phở Nhà', 'pho_house.jpg', 'Nhà hàng phở truyền thống Việt Nam'),
('Bún Bò Nam Bộ', 'bun_bo.jpg', 'Nhà hàng bún bò nổi tiếng'),
('Cơm Tấm 123', 'comtam.jpg', 'Các món cơm tấm ngon miệng');

-- Thêm loại món ăn
INSERT INTO `food_type` (`type_name`) VALUES
('Món chính'), ('Món phụ'), ('Tráng miệng'), ('Đồ uống');

-- Thêm món ăn
INSERT INTO `food` (`food_name`, `image`, `price`, `desc`, `type_id`) VALUES
('Phở Bò', 'pho_bo.jpg', 5.99, 'Phở bò thơm ngon', 1),
('Bún Bò', 'bun_bo.jpg', 6.50, 'Bún bò Nam Bộ đậm đà', 1),
('Chè Đậu', 'che_dau.jpg', 3.00, 'Chè đậu ngọt mát', 3),
('Chả Giò', 'cha_gio.jpg', 2.50, 'Chả giò chiên giòn', 2),
('Cơm Tấm Sườn', 'comtam_suon.jpg', 7.00, 'Cơm tấm sườn thơm ngon', 1),
('Nước Cam', 'orange_juice.jpg', 1.50, 'Nước cam tươi nguyên chất', 4);

-- Thêm món phụ (sub_food) với tên tiếng Việt
INSERT INTO `sub_food` (`sub_name`, `sub_price`, `food_id`) VALUES
('Thịt bò thêm', 1.50, 1),
('Thêm mì', 1.00, 1),
('Nước sốt cay', 0.50, 2),
('Chả giò thêm', 1.00, 4),
('Trứng', 0.75, 5),
('Chanh', 0.25, 1),
('Đá', 0.00, 6);

-- Thêm đơn hàng (user 7 không có order)
INSERT INTO `order` (`user_id`, `food_id`, `amount`, `code`, `arr_sub_id`) VALUES
(1, 1, 2, 'DH001', '1,2,6'),
(2, 2, 1, 'DH002', '3'),
(3, 4, 3, 'DH003', '4'),
(4, 5, 2, 'DH004', '5'),
(5, 6, 1, 'DH005', '7'),
(6, 3, 1, 'DH006', '');

-- Thêm lượt thích nhà hàng
INSERT INTO `like_res` (`user_id`, `res_id`, `date_like`) VALUES
(1, 1, '2025-05-15 10:00:00'),
(2, 2, '2025-05-15 12:00:00'),
(3, 3, '2025-05-15 14:00:00'),
(4, 1, '2025-05-15 15:00:00'),
(5, 2, '2025-05-15 16:00:00'),
(6, 3, '2025-05-15 17:00:00');

-- Thêm đánh giá nhà hàng
INSERT INTO `rate_res` (`user_id`, `res_id`, `amount`, `date_rate`) VALUES
(1, 1, 4, '2025-05-15 10:30:00'),
(2, 2, 5, '2025-05-15 12:30:00'),
(3, 3, 3, '2025-05-15 14:30:00'),
(4, 1, 4, '2025-05-15 15:30:00'),
(5, 2, 5, '2025-05-15 16:30:00');

