<!-- Place this code in: admin/includes/header.php -->
<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualDS Admin Panel</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>
    <div class="container"> -->
        <header>
            <div class="logo">
                <!-- Embedded SVG Logo (Triangle) -->
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5 L25 25 L5 25 Z" fill="#1abc9c"/>
                </svg>
                VisualDS Admin Panel
            </div>
            <div class="theme-toggle">
                <button id="themeToggle" onclick="toggleTheme()">Toggle Theme</button>
            </div>
            <a href="../logout.php" class="logout-btn">Logout</a>
        </header>