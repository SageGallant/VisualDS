<?php
// File Path: admin/includes/sidebar.php
?>
<aside class="admin-sidebar">
    <nav>
        <ul>
            <li class="<?php echo (basename($_SERVER['PHP_SELF']) == 'dashboard.php') ? 'active' : ''; ?>">
                <a href="<?php echo ADMIN_URL; ?>/pages/dashboard.php">
                    Dashboard
                </a>
            </li>
            <li class="<?php echo (basename($_SERVER['PHP_SELF']) == 'user-management.php') ? 'active' : ''; ?>">
                <a href="<?php echo ADMIN_URL; ?>/pages/user-management.php">
                    User Management
                </a>
            </li>
            <li class="<?php echo (basename($_SERVER['PHP_SELF']) == 'content-management.php') ? 'active' : ''; ?>">
                <a href="<?php echo ADMIN_URL; ?>/pages/content-management.php">
                    Content Management
                </a>
            </li>
            <li class="<?php echo (basename($_SERVER['PHP_SELF']) == 'settings.php') ? 'active' : ''; ?>">
                <a href="<?php echo ADMIN_URL; ?>/pages/settings.php">
                    Settings
                </a>
            </li>
        </ul>
    </nav>
</aside>