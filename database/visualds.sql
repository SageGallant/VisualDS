CREATE DATABASE IF NOT EXISTS visualds_admin;
USE visualds_admin;

-- Existing tables structure
-- ...existing tables code from database.php...

-- New table for sidebar menu
CREATE TABLE IF NOT EXISTS sidebar_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    parent_id INT DEFAULT NULL,
    order_index INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- New table for algorithm cards
CREATE TABLE IF NOT EXISTS algorithm_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    algorithm_type VARCHAR(50) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Insert sample data for sidebar
INSERT INTO sidebar_menu (title, parent_id, order_index) VALUES
('Algorithms', NULL, 1),
('Sorting', 1, 1),
('Searching', 1, 2),
('Linked List', 1, 3),
('Bubble', 2, 1),
('Selection', 2, 2),
('Insertion', 2, 3),
('Heap', 2, 4),
('Binary Search', 3, 1),
('Linear Search', 3, 2),
('Singly', 4, 1),
('Doubly', 4, 2);

-- Insert sample data for algorithm cards
INSERT INTO algorithm_cards (title, image_path, algorithm_type) VALUES
('Bubble Sort', '../assets/images/sorting.gif', 'sorting'),
('Linked List', '../assets/images/list.gif', 'data_structure');
