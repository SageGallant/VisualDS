<?php
// Enable error reporting (for debugging purposes - remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Clear cache
header("Cache-Control: no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");

// Ensure config.php exists and includes necessary functions (like login() and getTheme())
require_once('includes/config.php');

// Uncomment the block below if you want to redirect users who are already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: ' . ADMIN_URL . '/pages/dashboard.php');
    exit();
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password';
    } else if (login($username, $password)) {
        // Optionally, set a session variable upon successful login
        $_SESSION['admin_logged_in'] = true;
        header('Location: ' . ADMIN_URL . '/pages/dashboard.php');
        exit();
    } else {
        $error = 'Invalid username or password';
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="<?php echo getTheme(); ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - VisualDS Admin Panel</title>
    <link rel="stylesheet" href="<?php echo ADMIN_URL; ?>/assets/css/main.css">
</head>
<body class="login-page">
    <div class="login-container">
        <div class="login-box">
            <div class="login-logo">
                <img src="<?php echo ADMIN_URL; ?>/assets/images/logo.svg" alt="VisualDS">
                <h1>VisualDS Admin Login</h1>
            </div>
            
            <?php if ($error): ?>
                <div class="alert alert-error"><?php echo $error; ?></div>
            <?php endif; ?>

            <form method="POST" action="" class="login-form" onsubmit="return validateLoginForm()">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="login-btn">Login</button>
            </form>
        </div>
        <p class="copyright">© <?php echo date('Y'); ?> VisualDS Admin Panel</p>
    </div>
    <script src="<?php echo ADMIN_URL; ?>/assets/js/validation.js"></script>
</body>
</html>
