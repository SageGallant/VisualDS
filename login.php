<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/Auth.php';

// If already logged in, check role and redirect
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] === 'admin') {
        header('Location: admin/pages/dashboard.php');
    } else {
        header('Location: index.php');
    }
    exit();
}

// Clear any existing sessions if not logged in
if (!isset($_SESSION['admin_logged_in'])) {
    session_unset();
}

$error = ''; // Initialize error variable

// Handle signup
if(isset($_POST['signup'])) {
    $username = mysqli_real_escape_string($conn, $_POST['new_username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['new_password']); // Store password as plain text
    
    // Basic validation
    if(empty($username) || empty($email) || empty($password)) {
        $error = "All fields are required";
    } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format";
    } else {
        // Check if username or email exists
        $check_query = "SELECT * FROM users WHERE username='$username' OR email='$email'";
        $result = mysqli_query($conn, $check_query);
        
        if(mysqli_num_rows($result) > 0) {
            $error = "Username or Email already exists";
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
            
            $query = "INSERT INTO users (username, email, password, role, ip_address) 
                     VALUES ('$username', '$email', '$password', 'user', '$ip')";
            
            if(mysqli_query($conn, $query)) {
                $_SESSION['success'] = "Registration successful! Please login.";
                header('Location: login.php');
                exit();
            } else {
                $error = "Registration failed: " . mysqli_error($conn);
            }
        }
    }
}

// Handle login
if(isset($_POST['login'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $query);
    
    if(mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        
        // Update last login
        $update_query = "UPDATE users SET last_login = NOW() WHERE id = " . $user['id'];
        mysqli_query($conn, $update_query);
        
        if($user['role'] === 'admin') {
            header('Location: admin/pages/dashboard.php');
        } else {
            header('Location: index.php');
        }
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
    <title>VisualDS Login/Signup</title>
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
            width: 100px;
            height: 100px;
            margin-bottom: 1rem;
        }

        h1 {
            margin-bottom: 1rem;
            color: var(--dark-bg);
        }

        .form-group {
            margin-bottom: 1rem;
            text-align: left;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--dark-bg);
        }

        .form-group input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            width: 100%;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            background-color: var(--primary-color);
            color: white;
            font-size: 1rem;
            cursor: pointer;
        }

        button:hover {
            background-color: #1E8C7A;
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

        .forms-container {
            position: relative;
            width: 100%;
            height: 400px;
            perspective: 1000px;
        }

        .forms-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }

        .forms-wrapper.flipped {
            transform: rotateY(180deg);
        }

        .login-form, .signup-form {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }

        .signup-form {
            transform: rotateY(180deg);
        }

        .toggle-form {
            margin-top: 1rem;
            color: var(--primary-color);
            text-decoration: underline;
            cursor: pointer;
        }

        .success {
            color: #27AE60;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <svg class="logo" viewBox="0 0 100 100">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="#26A69A"/>
            <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" fill="white"/>
        </svg>
        <h1 id="formTitle">VisualDS Login</h1>
        
        <?php if ($error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <?php if (isset($_SESSION['success'])): ?>
            <div class="success"><?php echo $_SESSION['success']; unset($_SESSION['success']); ?></div>
        <?php endif; ?>

        <div class="forms-container">
            <div class="forms-wrapper">
                <div class="login-form">
                    <form method="POST" action="" onsubmit="return validateForm('loginForm')" id="loginForm">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required>
                        </div>

                        <button type="submit" name="login">Login</button>
                    </form>
                    <div class="toggle-form" onclick="toggleForm()">Need an account? Sign up</div>
                </div>

                <div class="signup-form">
                    <form method="POST" action="" onsubmit="return validateForm('signupForm')" id="signupForm">
                        <div class="form-group">
                            <label for="new_username">Username</label>
                            <input type="text" id="new_username" name="new_username" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>

                        <div class="form-group">
                            <label for="new_password">Password</label>
                            <input type="password" id="new_password" name="new_password" required>
                        </div>

                        <button type="submit" name="signup">Sign Up</button>
                    </form>
                    <div class="toggle-form" onclick="toggleForm()">Already have an account? Sign in</div>
                </div>
            </div>
        </div>

        <div class="copyright">
            © 2025 VisualDS
        </div>
    </div>

    <script>
        function toggleForm() {
            const wrapper = document.querySelector('.forms-wrapper');
            const title = document.getElementById('formTitle');
            wrapper.classList.toggle('flipped');
            title.textContent = wrapper.classList.contains('flipped') ? 
                              'VisualDS Sign Up' : 'VisualDS Login';
        }

        function validateForm(formId) {
            const form = document.getElementById(formId);
            let isValid = true;
            
            // Add your validation logic here
            // This is a basic example
            form.querySelectorAll('input').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
    </script>
</body>
</html>
