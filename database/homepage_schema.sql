
-- Create hero_section table for main banner/slider
CREATE TABLE hero_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    subtitle TEXT,
    button_text VARCHAR(50),
    button_link VARCHAR(255),
    background_image VARCHAR(255),
    display_order INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_hero_order (display_order)
);

-- Create features_section table for key features/highlights
CREATE TABLE features_section (
    feature_id INT PRIMARY KEY AUTO_INCREMENT,
    icon_class VARCHAR(50),
    icon_path VARCHAR(255),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    link_url VARCHAR(255),
    display_order INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_feature_order (display_order)
);

-- Create topics_section table for main topics/categories
CREATE TABLE topics_section (
    topic_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    link_url VARCHAR(255),
    display_order INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_topic_order (display_order)
);

-- Create contact_section table
CREATE TABLE contact_section (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    subtitle TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    map_embed_code TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create social_links table
CREATE TABLE social_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(50) NOT NULL,
    icon_class VARCHAR(50),
    url VARCHAR(255) NOT NULL,
    display_order INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_social_order (display_order)
);

-- Insert sample data for hero section
INSERT INTO hero_section (title, subtitle, button_text, button_link, background_image, display_order) VALUES
('Learn Data Structures Visually', 'Interactive visualizations to help you understand complex algorithms', 'Get Started', '/pages/home.php', '../assets/images/hero-bg.jpg', 1),
('Master Algorithms Step by Step', 'Practice with real-time visualization and code examples', 'Explore Now', '/pages/algorithms.php', '../assets/images/algo-bg.jpg', 2);

-- Insert sample data for features section
INSERT INTO features_section (icon_class, title, description, link_url, display_order) VALUES 
('fas fa-code', 'Interactive Learning', 'Learn with hands-on examples and live visualizations', '/features/interactive', 1),
('fas fa-project-diagram', 'Visual Algorithms', 'See how algorithms work in real-time', '/features/algorithms', 2),
('fas fa-graduation-cap', 'Step-by-Step Guide', 'Detailed explanations with each step', '/features/guide', 3);

-- Insert sample data for topics section
INSERT INTO topics_section (title, description, image_path, link_url, display_order) VALUES
('Sorting Algorithms', 'Learn different sorting techniques visually', '../assets/images/sorting.jpg', '/pages/sorting.php', 1),
('Data Structures', 'Understand complex data structures easily', '../assets/images/data-structures.jpg', '/pages/structures.php', 2),
('Search Algorithms', 'Master various searching techniques', '../assets/images/searching.jpg', '/pages/searching.php', 3);

-- Insert sample data for contact section
INSERT INTO contact_section (title, subtitle, email, phone, address, map_embed_code) VALUES
('Get in Touch', 'Have questions? We''re here to help!', 'contact@visualds.com', '+1234567890', '123 Learning Street, Education City, 12345', '<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');

-- Insert sample data for social links
INSERT INTO social_links (platform, icon_class, url, display_order) VALUES
('Facebook', 'fab fa-facebook', 'https://facebook.com/visualds', 1),
('Twitter', 'fab fa-twitter', 'https://twitter.com/visualds', 2),
('LinkedIn', 'fab fa-linkedin', 'https://linkedin.com/company/visualds', 3),
('GitHub', 'fab fa-github', 'https://github.com/visualds', 4);
