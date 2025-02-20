<?php
function getTimeAgo($datetime) {
    $time = strtotime($datetime);
    $current = time();
    $diff = $current - $time;
    
    if ($diff < 60) {
        return "Just now";
    } else if ($diff < 3600) {
        return floor($diff / 60) . " minutes ago";
    } else if ($diff < 86400) {
        return floor($diff / 3600) . " hours ago";
    } else {
        return date('M j, Y', $time);
    }
}

function logActivity($user_id, $action, $details) {
    global $conn;
    $user_id = (int)$user_id;
    $action = mysqli_real_escape_string($conn, $action);
    $details = mysqli_real_escape_string($conn, $details);
    
    mysqli_query($conn, "INSERT INTO activity_log (user_id, action, details) 
                        VALUES ($user_id, '$action', '$details')");
}
