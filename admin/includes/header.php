<?php
// File Path: admin/includes/header.php
?>
<!DOCTYPE html>
<html lang="en" data-theme="<?php echo getTheme(); ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualDS Admin Panel</title>
    <link rel="stylesheet" href="<?php echo ADMIN_URL; ?>/assets/css/main.css">
    <link rel="stylesheet" href="<?php echo ADMIN_URL; ?>/assets/css/responsive.css">
</head>
<body>
    <div class="admin-wrapper">
        <header class="admin-header">
            <div class="logo">
                <img src="<?php echo ADMIN_URL; ?>/assets/images/logo.svg" alt="VisualDS">
                <span>VisualDS Admin Panel</span>
            </div>
            <div class="header-actions">
                <button id="themeToggle" class="theme-toggle">
                    Dark Mode
                </button>
                <a href="<?php echo ADMIN_URL; ?>/includes/auth.php?action=logout" class="logout-btn">Logout</a>
            </div>
        </header>