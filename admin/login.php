<?php
// File Path: admin/login.php
require_once('includes/config.php');

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: pages/dashboard.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (login($username, $password)) {
        header('Location: pages/dashboard.php');
        exit();
    } else {
        $error = "Invalid username or password";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualDS Admin Login</title>
    <style>
        :root {
            --primary-color: #26A69A;
            --dark-bg: #2C3E50;
            --light-bg: #F5F5F5;
            --error-color: #E74C3C;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: var(--light-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .login-container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
        }

        h1 {
            color: var(--dark-bg);
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--dark-bg);
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        button {
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            width: 100%;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #2196F3;
        }

        .error {
            color: var(--error-color);
            margin-bottom: 1rem;
        }

        .copyright {
            margin-top: 2rem;
            color: #666;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <svg class="logo" viewBox="0 0 100 100">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="#26A69A"/>
            <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="white"/>
        </svg>
        <h1>VisualDS Admin Login</h1>
        
        <?php if (isset($error)): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit">Login</button>
        </form>

        <div class="copyright">
            © 2025 VisualDS Admin Panel
        </div>
    </div>
</body>
</html>