<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "visualds_admin";

$conn = mysqli_connect($host, $username, $password);
if (!$conn) 
        die("Could not connect: " . mysqli_connect_error());
// Create database if it doesn’t exist
mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS $database") or die("Error creating database: " . mysqli_error($conn));
mysqli_select_db($conn, $database) or die("Could not select database: " . mysqli_error($conn));

// Create users table
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

mysqli_query($conn, $users_table) or die("Error creating users table: " . mysqli_error($conn));

// Create content table (for pages like Home, About Us, Contact)
$content_table = "CREATE TABLE IF NOT EXISTS content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status ENUM('published', 'draft') DEFAULT 'draft',
    last_updated DATETIME,
    type ENUM('page', 'article', 'resource', 'media') DEFAULT 'page'
)";

mysqli_query($conn, $content_table) or die("Error creating content table: " . mysqli_error($conn));

// Create activity logs table
$activity_table = "CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";

mysqli_query($conn, $activity_table) or die("Error creating activity logs table: " . mysqli_error($conn));

// Create user progress tracking table
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

mysqli_query($conn, $progress_table) or die("Error creating progress table: " . mysqli_error($conn));

// Close connection
mysqli_close($conn);
?>