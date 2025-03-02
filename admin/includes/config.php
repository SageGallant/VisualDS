<?php
// Only start session if it hasn't been started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "visualds_admin";

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>