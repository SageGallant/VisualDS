-- Create sidebar_categories table for main sidebar items
CREATE TABLE sidebar_categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL,
    icon_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_category_order (display_order),
    UNIQUE INDEX idx_category_name (category_name)
);

-- Create sidebar_items table for dropdown items
CREATE TABLE sidebar_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    item_name VARCHAR(50) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES sidebar_categories(category_id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    UNIQUE INDEX idx_item_category_order (category_id, display_order)
);

-- Create content_cards table for main content area
CREATE TABLE content_cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES sidebar_categories(category_id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    UNIQUE INDEX idx_card_order (display_order)
);

-- Create card_actions table for button groups
CREATE TABLE card_actions (
    action_id INT PRIMARY KEY AUTO_INCREMENT,
    card_id INT NOT NULL,
    button_text VARCHAR(50) NOT NULL,
    page_name VARCHAR(50) NOT NULL,
    section_name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES content_cards(card_id) ON DELETE CASCADE,
    INDEX idx_card (card_id),
    UNIQUE INDEX idx_action_card_order (card_id, display_order)
);

-- Insert sample data for sidebar categories
INSERT INTO sidebar_categories (category_name, display_order) VALUES
('Sorting', 1),
('Searching', 2),
('Linked List', 3);

-- Insert sample data for sidebar items
INSERT INTO sidebar_items (category_id, item_name, link_url, display_order) VALUES
(1, 'Bubble', '/pages/bubble.php', 1),
(1, 'Selection', '/pages/selection.php', 2),
(1, 'Insertion', '/pages/insertion.php', 3),
(1, 'Heap', '/pages/heap.php', 4),
(2, 'Binary Search', '/pages/binary-search.php', 1),
(2, 'Linear Search', '/pages/linear-search.php', 2),
(3, 'Singly', '/pages/singly-linked-list.php', 1),
(3, 'Doubly', '/pages/doubly-linked-list.php', 2);

-- Insert sample data for content cards
INSERT INTO content_cards (title, image_path, category_id, display_order) VALUES
('Bubble Sort', '../assets/images/sorting.gif', 1, 1),
('Linked List', '../assets/images/list.gif', 3, 2);

-- Insert sample data for card actions
INSERT INTO card_actions (card_id, button_text, page_name, section_name, display_order) VALUES
(1, 'Concept', 'bubble', 'concept', 1),
(1, 'Algorithm', 'bubble', 'algorithm', 2),
(1, 'Visualization', 'bubble', 'visualization', 3),
(2, 'Concept', 'linkedList', 'concept', 1),
(2, 'Algorithm', 'linkedList', 'algorithm', 2),
(2, 'Visualization', 'linkedList', 'visualization', 3);
