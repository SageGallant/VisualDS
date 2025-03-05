<?php
class Auth {
    public static function checkLogin() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: /VisualDS/login.php");
            exit();
        }
    }

    public static function doLogin($username, $password) {
        global $conn;
        
        $username = mysqli_real_escape_string($conn, $username);
        $password = mysqli_real_escape_string($conn, $password);
        
        $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $result = mysqli_query($conn, $query);
        
        if (mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            
            if($user['status'] == 'inactive') {
                $_SESSION['error'] = "Account is inactive. Please contact administrator.";
                return false;
            }
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['status'] = $user['status'];
            
            // Set admin flag if user is admin
            if ($user['role'] === 'admin') {
                $_SESSION['is_admin'] = true;
                return 'admin';
            }
            return 'user';
        }
        return false;
    }

    public static function doLogout() {
        session_destroy();
        header("Location: /VisualDS/login.php");
        exit();
    }
    
    public static function checkAdminAccess() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Check both user login and admin status
        if (!isset($_SESSION['user_id']) || !isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
            header("Location: /VisualDS/login.php");
            exit();
        }
    }
}
?>
