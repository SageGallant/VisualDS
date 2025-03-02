<?php
class Auth {
    public static function checkLogin() {
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
            
            // Check if user is active
            if($user['status'] == 'inactive') {
                $_SESSION['error'] = "Account is inactive. Please contact administrator.";
                return false;
            }
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['status'] = $user['status'];
            
            if ($user['role'] === 'admin') {
                $_SESSION['admin_logged_in'] = true;
                header("Location: /VisualDS/admin/pages/dashboard.php");
            } else {
                header("Location: /VisualDS/index.php");
            }
            return true;
        }
        return false;
    }

    public static function doLogout() {
        session_destroy();
        header("Location: /VisualDS/login.php");
        exit();
    }
    
    public static function checkAdminAccess() {
        if (!isset($_SESSION['admin_logged_in']) || $_SESSION['role'] !== 'admin') {
            header("Location: /VisualDS/login.php");
            exit();
        }
    }
}
?>
