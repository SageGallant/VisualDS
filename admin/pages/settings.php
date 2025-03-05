<!-- Place this code in: admin/pages/settings.php -->

<?php
require_once '../../includes/config.php';
require_once '../includes/functions.php';

// Start the session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || !isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /VisualDS/login.php');
    exit();
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

// Handle settings updates
if (isset($_POST['update_settings'])) {
    handle_settings_update($_POST);
}

// Get current settings
$settings = get_system_settings();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualDS Admin Panel</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
    <div class="container">
        <?php include '../includes/header.php'; ?>
        <?php include '../includes/sidebar.php'; ?>
        
        <main class="main-content">
            <div class="content">
                <div class="card">
                    <h2>System Settings</h2>
                    <form method="POST" onsubmit="return validateForm('settingsForm')" id="settingsForm">
                        <h3>General Settings</h3>
                        <input type="text" name="site_title" value="<?php echo htmlspecialchars($settings['site_title'] ?? ''); ?>" placeholder="Site Title" required>
                        <input type="email" name="admin_email" value="<?php echo htmlspecialchars($settings['admin_email'] ?? ''); ?>" placeholder="Admin Email" required>
                        <textarea name="site_description" placeholder="Site Description" rows="3"><?php echo htmlspecialchars($settings['site_description'] ?? ''); ?></textarea>
                        
                        <h3>Email Settings</h3>
                        <input type="text" name="smtp_host" value="<?php echo htmlspecialchars($settings['smtp_host'] ?? ''); ?>" placeholder="SMTP Host">
                        <input type="text" name="smtp_port" value="<?php echo htmlspecialchars($settings['smtp_port'] ?? ''); ?>" placeholder="SMTP Port">
                        
                        <input type="submit" name="update_settings" value="Save Settings" class="btn-primary">
                    </form>
                </div>
            </div>
        </main>
        
        <?php include '../includes/footer.php'; ?>
    </div>
    <script src="../assets/js/validation.js"></script>
</body>
</html>