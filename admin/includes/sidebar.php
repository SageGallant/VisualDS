<!-- Place this code in: admin/includes/sidebar.php -->

<nav class="sidebar">
    <ul>
        <li><a href="../pages/dashboard.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'dashboard.php' ? 'active' : ''; ?>">Dashboard</a></li>
        <li><a href="../pages/user-management.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'user-management.php' ? 'active' : ''; ?>">User Management</a></li>
        <li><a href="../pages/content-management.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'content-management.php' ? 'active' : ''; ?>">Content Management</a></li>
        <li><a href="../pages/settings.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'settings.php' ? 'active' : ''; ?>">Settings</a></li>
    </ul>
</nav>