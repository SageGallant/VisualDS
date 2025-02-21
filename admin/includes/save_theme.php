<?php
// File Path: admin/includes/save_theme.php
require_once('config.php');
checkLogin();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['theme'])) {
    $theme = $_POST['theme'] === 'dark' ? 'dark' : 'light';
    
    $query = "UPDATE settings SET setting_value = '$theme' WHERE setting_key = 'theme'";
    mysqli_query($conn, $query);
    
    $_SESSION['theme'] = $theme;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>