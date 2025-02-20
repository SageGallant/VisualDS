<?php
// File Path: admin/includes/database.php

// Database connection settings
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'visualds_admin';

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_pass);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create database if not exists
$sql = "CREATE DATABASE IF NOT EXISTS $db_name";
if (mysqli_query($conn, $sql)) {
    mysqli_select_db($conn, $db_name);
    
    // Create Users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role ENUM('admin', 'editor', 'user') NOT NULL DEFAULT 'user',
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        last_login DATETIME,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    mysqli_query($conn, $sql);

    // Create Pages table
    $sql = "CREATE TABLE IF NOT EXISTS pages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        status ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    mysqli_query($conn, $sql);

    // Create Activity_Log table
    $sql = "CREATE TABLE IF NOT EXISTS activity_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        action VARCHAR(50) NOT NULL,
        details TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )";
    mysqli_query($conn, $sql);

    // Create Settings table
    $sql = "CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(50) UNIQUE NOT NULL,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    mysqli_query($conn, $sql);

    // Insert default admin user if not exists
    $default_admin = "INSERT INTO users (username, password, email, role) 
                     SELECT 'admin', '" . md5('admin123') . "', 'admin@visualds.com', 'admin' 
                     WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin')";
    mysqli_query($conn, $default_admin);

    // Insert default settings
    $default_settings = "INSERT INTO settings (setting_key, setting_value) VALUES 
                        ('site_name', 'VisualDS Admin Panel'),
                        ('theme', 'light')
                        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)";
    mysqli_query($conn, $default_settings);

    // Insert default pages
    $default_pages = "INSERT INTO pages (title, content, slug, status) VALUES 
                     ('Home Page', 'Welcome to VisualDS', 'home', 'published'),
                     ('About Us', 'About VisualDS', 'about', 'published'),
                     ('Contact Page', 'Contact Information', 'contact', 'published')
                     ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP";
    mysqli_query($conn, $default_pages);
    
    // echo "Database setup completed successfully";
} else {
    echo "Error creating database: " . mysqli_error($conn);
}

mysqli_close($conn);
?>