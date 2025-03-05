<?php
session_start();

$host = "localhost";
$username = "root";
$password = "";
$database = "visualds_admin";

// First connect without database selection
$conn = mysqli_connect($host, $username, $password);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $database";
if (!mysqli_query($conn, $sql)) {
    die("Error creating database: " . mysqli_error($conn));
}

// Select the database
mysqli_select_db($conn, $database) or die("Could not select database");

// Create users table if it doesn't exist
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

// Create user progress tracking table if it doesn't exist
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

// Create activity logs table if it doesn't exist
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

// Create settings table if it doesn't exist
$settings_table = "CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_name VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL
)";

if (!mysqli_query($conn, $settings_table)) {
    die("Error creating settings table: " . mysqli_error($conn));
}

// Insert default settings if not exists
$check_settings = "SELECT * FROM settings WHERE setting_name='site_name'";
$result = mysqli_query($conn, $check_settings);

if (mysqli_num_rows($result) == 0) {
    $default_settings = "INSERT INTO settings (setting_name, setting_value) 
                         VALUES ('site_name', 'VisualDS'), ('admin_email', 'admin@visualds.com')";
    mysqli_query($conn, $default_settings);
}

// Create default admin user if not exists
$check_admin = "SELECT * FROM users WHERE username='admin'";
$result = mysqli_query($conn, $check_admin);

if (mysqli_num_rows($result) == 0) {
    $default_admin = "INSERT INTO users (username, email, password, role, status) 
                     VALUES ('admin', 'admin@visualds.com', 'admin123', 'admin', 'active')";
    mysqli_query($conn, $default_admin);
}

// Set charset
mysqli_set_charset($conn, "utf8mb4");

return $conn;
?>
