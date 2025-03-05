<?php
// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "visualds_admin";

// Create main connection
$conn = mysqli_connect($host, $username, $password);
if (!$conn) {
    die("Could not connect: " . mysqli_connect_error());
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $database";
if (!mysqli_query($conn, $sql)) {
    die("Error creating database: " . mysqli_error($conn));
}

// Select the database
mysqli_select_db($conn, $database) or die("Could not select database");

// Settings table
$settings_table = "CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_title VARCHAR(100),
    admin_email VARCHAR(100),
    site_description TEXT,
    smtp_host VARCHAR(100),
    smtp_port VARCHAR(10),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if (!mysqli_query($conn, $settings_table)) {
    die("Error creating settings table: " . mysqli_error($conn));
}

// Insert default settings if not exist
$check_settings = mysqli_query($conn, "SELECT COUNT(*) as count FROM settings");
$settings_count = mysqli_fetch_assoc($check_settings)['count'];

if ($settings_count == 0) {
    $default_settings = "INSERT INTO settings (site_title, admin_email, site_description) 
                        VALUES ('VisualDS', 'admin@visualds.com', 'Visual Data Structures Learning Platform')";
    mysqli_query($conn, $default_settings);
}

// Users table
$users_table = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login DATETIME,
    ip_address VARCHAR(15)
)";

if (!mysqli_query($conn, $users_table)) {
    die("Error creating users table: " . mysqli_error($conn));
}

// Content table
$content_table = "CREATE TABLE IF NOT EXISTS content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('published', 'draft') DEFAULT 'draft',
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    type ENUM('page', 'article', 'resource', 'media') DEFAULT 'page'
)";

if (!mysqli_query($conn, $content_table)) {
    die("Error creating content table: " . mysqli_error($conn));
}

// Activity logs table
$activity_table = "CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";

if (!mysqli_query($conn, $activity_table)) {
    die("Error creating activity logs table: " . mysqli_error($conn));
}

// User progress table
$progress_table = "CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    algorithm_type VARCHAR(50) NOT NULL,
    algorithm_name VARCHAR(50) NOT NULL,
    progress INT DEFAULT 0,
    last_visited DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_algo (user_id, algorithm_type, algorithm_name)
)";

if (!mysqli_query($conn, $progress_table)) {
    die("Error creating progress table: " . mysqli_error($conn));
}

// Don't close the connection here
// Return the connection for use in other files
return $conn;
?>