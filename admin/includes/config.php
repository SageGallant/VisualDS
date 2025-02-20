<?php
// File Path: admin/includes/config.php

// session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', realpath(dirname(__FILE__) . '/..'));
define('ADMIN_URL', 'http://localhost/admin'); // Change this according to your setup

require_once('database.php');
require_once('functions.php');
require_once('auth.php');

// Database configuration
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'visualds_admin';

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Define constants
// define('ADMIN_URL', '/VisualDS/admin');
define('SITE_URL', '/VisualDS');
?>