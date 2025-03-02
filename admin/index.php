<!-- Place this code in: admin/index.php -->

<?php
session_start();
include 'includes/auth.php';

if (is_logged_in()) {
    header("Location: pages/dashboard.php");
    exit();
} else {
    header("Location: login.php");
    exit();
}
?>