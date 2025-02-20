<?// File Path: admin/includes/functions.php

function logActivity($user_id, $action, $details) {
    global $conn;
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_id = (int)$user_id;
    $action = mysqli_real_escape_string($conn, $action);
    $details = mysqli_real_escape_string($conn, $details);
    
    $query = "INSERT INTO activity_log (user_id, action, details, ip_address) 
              VALUES ($user_id, '$action', '$details', '$ip')";
    mysqli_query($conn, $query);
}

function getTheme() {
    global $conn;
    $result = mysqli_query($conn, "SELECT setting_value FROM settings WHERE setting_key = 'theme'");
    $theme = mysqli_fetch_assoc($result);
    return $theme['setting_value'] ?? 'light';
}
?>