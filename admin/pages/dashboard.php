<?php
require_once '../../includes/config.php';
require_once '../../includes/auth.php';
require_once '../includes/functions.php';

// Simple admin check
if (!isset($_SESSION['user_id']) || !isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /VisualDS/login.php');
    exit();
}

// Get user ID from session
$user_id = $_SESSION['user_id'];

$total_users = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users"))['count'];
$total_content = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM content"))['count'];
$active_sessions = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(DISTINCT ip_address) as count FROM users WHERE last_login IS NOT NULL"))['count'];

$recent_activity = get_user_activity($user_id);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisualDS Admin Panel</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
</head>
<body>
    <div class="container">
        <?php include '../includes/header.php'; ?>
        <?php include '../includes/sidebar.php'; ?>
        
        <main class="main-content">
            <div class="content">
                <!-- Stats Cards -->
                <div class="card">
                    <h2>Dashboard Overview</h2>
                    <p>Welcome back, <?php echo $_SESSION['username']; ?></p>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1; text-align: center;">
                            <h3>Total Users</h3>
                            <p><?php echo $total_users; ?></p>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <h3>Total Content Items</h3>
                            <p><?php echo $total_content; ?></p>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <h3>Active Sessions</h3>
                            <p><?php echo $active_sessions; ?></p>
                        </div>
                    </div>
                </div>

                <!-- Activity Table -->
                <div class="card">
                    <h2>Recent Activity</h2>
                    <table>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>Time</th>
                        </tr>
                        <?php while ($activity = mysqli_fetch_assoc($recent_activity)) { ?>
                            <tr>
                                <td><?php echo $activity['user_id']; ?></td>
                                <td><?php echo $activity['action']; ?></td>
                                <td><?php echo $activity['details']; ?></td>
                                <td><?php echo $activity['time']; ?></td>
                            </tr>
                        <?php } ?>
                    </table>
                </div>
            </div>
        </main>
        
        <?php include '../includes/footer.php'; ?>
    </div>
    <script src="../assets/js/validation.js"></script>
</body>
</html>