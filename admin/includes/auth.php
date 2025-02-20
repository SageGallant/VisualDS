<?// File Path: admin/includes/auth.php

function checkLogin() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header('Location: ' . ADMIN_URL . '/login.php');
        exit();
    }
}

function login($username, $password) {
    global $conn;
    
    $username = mysqli_real_escape_string($conn, $username);
    $password = md5($password); // Using MD5 as per requirement for simple authentication
    
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' AND status = 'active'";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user_id'] = $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        $_SESSION['admin_role'] = $user['role'];
        
        // Update last login and IP
        $ip = $_SERVER['REMOTE_ADDR'];
        mysqli_query($conn, "UPDATE users SET last_login = NOW(), ip_address = '$ip' WHERE id = " . $user['id']);
        
        // Log activity
        logActivity($user['id'], 'Login', 'Successful login from ' . $ip);
        
        return true;
    }
    return false;
}

function logout() {
    session_destroy();
    header('Location: ' . ADMIN_URL . '/login.php');
    exit();
}
?>