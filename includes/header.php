<?php
function getAuthButton() {
    if (isset($_SESSION['user_id'])) {
        return '<a href="/VisualDS/logout.php" class="auth-btn">Logout</a>';
    } else {
        return '<a href="/VisualDS/login.php" class="auth-btn">Login</a>';
    }
}
?>