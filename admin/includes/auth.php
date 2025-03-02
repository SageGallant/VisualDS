<?php
function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function login($login_username, $login_password) {
    include 'config.php';
    
    // Create connection with error handling
    $conn = mysqli_connect($host, $username, $password, $database);
    if (!$conn) {
        error_log("Connection failed: " . mysqli_connect_error());
        return false;
    }

    // Sanitize inputs
    $login_username = mysqli_real_escape_string($conn, $login_username);
    $login_password = mysqli_real_escape_string($conn, $login_password);
    
    $query = "SELECT * FROM users WHERE username='$login_username' AND password='$login_password'";
    $result = mysqli_query($conn, $query);
    
    if (!$result) {
        error_log("Query failed: " . mysqli_error($conn));
        mysqli_close($conn);
        return false;
    }

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Set all required session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['admin_logged_in'] = true;
        
        // Update last login
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $update_query = "UPDATE users SET last_login=NOW(), ip_address='$ip_address' WHERE id=" . $user['id'];
        mysqli_query($conn, $update_query);
        
        mysqli_close($conn);
        return true;
    }
    
    mysqli_close($conn);
    return false;
}

function logout() {
    session_destroy();
    header("Location: ../login.php");
    exit();
}
?>