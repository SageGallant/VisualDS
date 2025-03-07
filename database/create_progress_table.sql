DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS algorithms;
DROP TABLE IF EXISTS algorithm_types;

CREATE TABLE algorithm_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE algorithms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_id INT,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (type_id) REFERENCES algorithm_types(id)
);

CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    algorithm_id INT NOT NULL,
    progress INT DEFAULT 0,
    last_visited TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (algorithm_id) REFERENCES algorithms(id)
);

-- Insert default algorithm types
INSERT INTO algorithm_types (name) VALUES 
('Sorting'),
('Searching'),
('Linked Lists'),
('Trees');

-- Insert default algorithms
INSERT INTO algorithms (type_id, name) VALUES 
(1, 'Bubble Sort'),
(1, 'Quick Sort'),
(1, 'Merge Sort'),
(2, 'Linear Search'),
(2, 'Binary Search'),
(3, 'Singly Linked List'),
(3, 'Doubly Linked List'),
(4, 'Binary Search Tree'),
(4, 'AVL Tree');
