-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2025 at 02:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `visualds_admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `algorithms`
--

CREATE TABLE `algorithms` (
  `id` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `algorithms`
--

INSERT INTO `algorithms` (`id`, `type_id`, `name`) VALUES
(1, 1, 'Bubble Sort'),
(2, 1, 'Quick Sort'),
(3, 1, 'Merge Sort'),
(4, 2, 'Linear Search'),
(5, 2, 'Binary Search'),
(6, 3, 'Singly Linked List'),
(7, 3, 'Doubly Linked List'),
(8, 4, 'Binary Search Tree'),
(9, 4, 'AVL Tree');

-- --------------------------------------------------------

--
-- Table structure for table `algorithm_types`
--

CREATE TABLE `algorithm_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `algorithm_types`
--

INSERT INTO `algorithm_types` (`id`, `name`) VALUES
(1, 'Sorting'),
(2, 'Searching'),
(3, 'Linked Lists'),
(4, 'Trees');

-- --------------------------------------------------------

--
-- Table structure for table `card_actions`
--

CREATE TABLE `card_actions` (
  `action_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `button_text` varchar(50) NOT NULL,
  `page_name` varchar(50) NOT NULL,
  `section_name` varchar(50) NOT NULL,
  `display_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `card_actions`
--

INSERT INTO `card_actions` (`action_id`, `card_id`, `button_text`, `page_name`, `section_name`, `display_order`, `created_at`) VALUES
(1, 1, 'Concept', 'bubble', 'concept', 1, '2025-03-05 18:02:00'),
(2, 1, 'Algorithm', 'bubble', 'algorithm', 2, '2025-03-05 18:02:00'),
(3, 1, 'Visualization', 'bubble', 'visualization', 3, '2025-03-05 18:02:00'),
(4, 2, 'Concept', 'linkedList', 'concept', 1, '2025-03-05 18:02:00'),
(5, 2, 'Algorithm', 'linkedList', 'algorithm', 2, '2025-03-05 18:02:00'),
(6, 2, 'Visualization', 'linkedList', 'visualization', 3, '2025-03-05 18:02:00');

-- --------------------------------------------------------

--
-- Table structure for table `contact_section`
--

CREATE TABLE `contact_section` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `map_embed_code` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_section`
--

INSERT INTO `contact_section` (`id`, `title`, `subtitle`, `email`, `phone`, `address`, `map_embed_code`, `updated_at`) VALUES
(1, 'Get in Touch', 'Have questions? We\'re here to help!', 'contact@visualds.com', '+1234567890', '123 Learning Street, Education City, 12345', '<iframe src=\"https://www.google.com/maps/embed?...\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>', '2025-03-05 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `status` enum('published','draft') DEFAULT 'draft',
  `last_updated` datetime DEFAULT current_timestamp(),
  `type` enum('page','article','resource','media') DEFAULT 'page'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_cards`
--

CREATE TABLE `content_cards` (
  `card_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `display_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content_cards`
--

INSERT INTO `content_cards` (`card_id`, `title`, `image_path`, `category_id`, `display_order`, `created_at`) VALUES
(1, 'Bubble Sort', '../assets/images/sorting.gif', 1, 1, '2025-03-05 18:02:00'),
(2, 'Linked List', '../assets/images/list.gif', 3, 2, '2025-03-05 18:02:00');

-- --------------------------------------------------------

--
-- Table structure for table `features_section`
--

CREATE TABLE `features_section` (
  `feature_id` int(11) NOT NULL,
  `icon_class` varchar(50) DEFAULT NULL,
  `icon_path` varchar(255) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `display_order` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `features_section`
--

INSERT INTO `features_section` (`feature_id`, `icon_class`, `icon_path`, `title`, `description`, `link_url`, `display_order`, `status`, `created_at`) VALUES
(1, 'fas fa-code', NULL, 'Interactive Learning', 'Learn with hands-on examples and live visualizations', '/features/interactive', 1, 'active', '2025-03-05 18:30:19'),
(2, 'fas fa-project-diagram', NULL, 'Visual Algorithms', 'See how algorithms work in real-time', '/features/algorithms', 2, 'active', '2025-03-05 18:30:19'),
(3, 'fas fa-graduation-cap', NULL, 'Step-by-Step Guide', 'Detailed explanations with each step', '/features/guide', 3, 'active', '2025-03-05 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `hero_section`
--

CREATE TABLE `hero_section` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `subtitle` text DEFAULT NULL,
  `button_text` varchar(50) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  `display_order` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_section`
--

INSERT INTO `hero_section` (`id`, `title`, `subtitle`, `button_text`, `button_link`, `background_image`, `display_order`, `status`, `created_at`) VALUES
(1, 'Learn Data Structures Visually', 'Interactive visualizations to help you understand complex algorithms', 'Get Started', '/pages/home.php', '../assets/images/hero-bg.jpg', 1, 'active', '2025-03-05 18:30:19'),
(2, 'Master Algorithms Step by Step', 'Practice with real-time visualization and code examples', 'Explore Now', '/pages/algorithms.php', '../assets/images/algo-bg.jpg', 2, 'active', '2025-03-05 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `setting_name` varchar(100) NOT NULL,
  `setting_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `setting_name`, `setting_value`) VALUES
(1, 'site_name', 'VisualDS'),
(2, 'admin_email', 'admin@visualds.com');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_categories`
--

CREATE TABLE `sidebar_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `display_order` int(11) NOT NULL,
  `icon_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sidebar_categories`
--

INSERT INTO `sidebar_categories` (`category_id`, `category_name`, `display_order`, `icon_path`, `created_at`) VALUES
(1, 'Sorting', 1, NULL, '2025-03-05 18:02:00'),
(2, 'Searching', 2, NULL, '2025-03-05 18:02:00'),
(3, 'Linked List', 3, NULL, '2025-03-05 18:02:00');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_items`
--

CREATE TABLE `sidebar_items` (
  `item_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `link_url` varchar(255) NOT NULL,
  `display_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sidebar_items`
--

INSERT INTO `sidebar_items` (`item_id`, `category_id`, `item_name`, `link_url`, `display_order`, `created_at`) VALUES
(1, 1, 'Bubble', '/pages/bubble.php', 1, '2025-03-05 18:02:00'),
(2, 1, 'Selection', '/pages/selection.php', 2, '2025-03-05 18:02:00'),
(3, 1, 'Insertion', '/pages/insertion.php', 3, '2025-03-05 18:02:00'),
(4, 1, 'Heap', '/pages/heap.php', 4, '2025-03-05 18:02:00'),
(5, 2, 'Binary Search', '/pages/binary-search.php', 1, '2025-03-05 18:02:00'),
(6, 2, 'Linear Search', '/pages/linear-search.php', 2, '2025-03-05 18:02:00'),
(7, 3, 'Singly', '/pages/singly-linked-list.php', 1, '2025-03-05 18:02:00'),
(8, 3, 'Doubly', '/pages/doubly-linked-list.php', 2, '2025-03-05 18:02:00');

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `icon_class` varchar(50) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `display_order` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `platform`, `icon_class`, `url`, `display_order`, `status`, `created_at`) VALUES
(1, 'Facebook', 'fab fa-facebook', 'https://facebook.com/visualds', 1, 'active', '2025-03-05 18:30:19'),
(2, 'Twitter', 'fab fa-twitter', 'https://twitter.com/visualds', 2, 'active', '2025-03-05 18:30:19'),
(3, 'LinkedIn', 'fab fa-linkedin', 'https://linkedin.com/company/visualds', 3, 'active', '2025-03-05 18:30:19'),
(4, 'GitHub', 'fab fa-github', 'https://github.com/visualds', 4, 'active', '2025-03-05 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `topics_section`
--

CREATE TABLE `topics_section` (
  `topic_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `display_order` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics_section`
--

INSERT INTO `topics_section` (`topic_id`, `title`, `description`, `image_path`, `link_url`, `display_order`, `status`, `created_at`) VALUES
(1, 'Sorting Algorithms', 'Learn different sorting techniques visually', '../assets/images/sorting.jpg', '/pages/sorting.php', 1, 'active', '2025-03-05 18:30:19'),
(2, 'Data Structures', 'Understand complex data structures easily', '../assets/images/data-structures.jpg', '/pages/structures.php', 2, 'active', '2025-03-05 18:30:19'),
(3, 'Search Algorithms', 'Master various searching techniques', '../assets/images/searching.jpg', '/pages/searching.php', 3, 'active', '2025-03-05 18:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `status` enum('active','inactive') DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `ip_address` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `status`, `last_login`, `ip_address`) VALUES
(1, 'admin', 'admin@visualds.com', 'admin', 'admin', 'active', '2025-03-05 22:18:59', NULL),
(2, 'master', 'master@email.com', 'master', 'user', 'active', '2025-03-05 22:06:29', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `algorithm_type` varchar(50) NOT NULL,
  `algorithm_name` varchar(50) NOT NULL,
  `progress` int(11) DEFAULT 0,
  `last_visited` datetime DEFAULT current_timestamp(),
  `completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `algorithms`
--
ALTER TABLE `algorithms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `algorithm_types`
--
ALTER TABLE `algorithm_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `card_actions`
--
ALTER TABLE `card_actions`
  ADD PRIMARY KEY (`action_id`),
  ADD UNIQUE KEY `idx_action_card_order` (`card_id`,`display_order`),
  ADD KEY `idx_card` (`card_id`);

--
-- Indexes for table `contact_section`
--
ALTER TABLE `contact_section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content_cards`
--
ALTER TABLE `content_cards`
  ADD PRIMARY KEY (`card_id`),
  ADD UNIQUE KEY `idx_card_order` (`display_order`),
  ADD KEY `idx_category` (`category_id`);

--
-- Indexes for table `features_section`
--
ALTER TABLE `features_section`
  ADD PRIMARY KEY (`feature_id`),
  ADD UNIQUE KEY `idx_feature_order` (`display_order`);

--
-- Indexes for table `hero_section`
--
ALTER TABLE `hero_section`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_hero_order` (`display_order`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_name` (`setting_name`);

--
-- Indexes for table `sidebar_categories`
--
ALTER TABLE `sidebar_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `idx_category_order` (`display_order`),
  ADD UNIQUE KEY `idx_category_name` (`category_name`);

--
-- Indexes for table `sidebar_items`
--
ALTER TABLE `sidebar_items`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `idx_item_category_order` (`category_id`,`display_order`),
  ADD KEY `idx_category` (`category_id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_social_order` (`display_order`);

--
-- Indexes for table `topics_section`
--
ALTER TABLE `topics_section`
  ADD PRIMARY KEY (`topic_id`),
  ADD UNIQUE KEY `idx_topic_order` (`display_order`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_algo` (`user_id`,`algorithm_type`,`algorithm_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `algorithms`
--
ALTER TABLE `algorithms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `algorithm_types`
--
ALTER TABLE `algorithm_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `card_actions`
--
ALTER TABLE `card_actions`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact_section`
--
ALTER TABLE `contact_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `content_cards`
--
ALTER TABLE `content_cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `features_section`
--
ALTER TABLE `features_section`
  MODIFY `feature_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hero_section`
--
ALTER TABLE `hero_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sidebar_categories`
--
ALTER TABLE `sidebar_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sidebar_items`
--
ALTER TABLE `sidebar_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `topics_section`
--
ALTER TABLE `topics_section`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `algorithms`
--
ALTER TABLE `algorithms`
  ADD CONSTRAINT `algorithms_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `algorithm_types` (`id`);

--
-- Constraints for table `card_actions`
--
ALTER TABLE `card_actions`
  ADD CONSTRAINT `card_actions_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `content_cards` (`card_id`) ON DELETE CASCADE;

--
-- Constraints for table `content_cards`
--
ALTER TABLE `content_cards`
  ADD CONSTRAINT `content_cards_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `sidebar_categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `sidebar_items`
--
ALTER TABLE `sidebar_items`
  ADD CONSTRAINT `sidebar_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `sidebar_categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
