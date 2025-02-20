<?php
// File Path: admin/pages/dashboard.php

require_once('../includes/config.php');
checkLogin();

// Get statistics
$total_users = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users"))['count'];
$total_content = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM pages"))['count'];
$active_sessions = mysqli_fetch_assoc(mysqli_query($conn, 
    "SELECT COUNT(DISTINCT user_id) as count FROM activity_log 
     WHERE created_at >= NOW() - INTERVAL 30 MINUTE"))['count'];

// Get recent activity
$recent_activity = mysqli_query($conn, 
    "SELECT a.*, u.username 
     FROM activity_log a 
     LEFT JOIN users u ON a.user_id = u.id 
     ORDER BY a.created_at DESC 
     LIMIT 5");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
<?include('../includes/header.php');?>
<?include('../includes/sidebar.php');?>
<div class="main-content">
    <div class="card">
        <h1>Dashboard Overview</h1>
        <p class="welcome-text">Welcome back, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></p>
    </div>

    <div class="stats-container">
        <div class="stat-card">
            <h3>Total Users</h3>
            <div class="stat-value"><?php echo number_format($total_users); ?></div>
        </div>
        <div class="stat-card">
            <h3>Total Content Items</h3>
            <div class="stat-value"><?php echo number_format($total_content); ?></div>
        </div>
        <div class="stat-card">
            <h3>Active Sessions</h3>
            <div class="stat-value"><?php echo number_format($active_sessions); ?></div>
        </div>
    </div>

    <div class="card activity-log">
        <h2>Recent Activity</h2>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($activity = mysqli_fetch_assoc($recent_activity)): ?>
                <tr>
                    <td><?php echo htmlspecialchars($activity['username']); ?></td>
                    <td><?php echo htmlspecialchars($activity['action']); ?></td>
                    <td><?php echo htmlspecialchars($activity['details']); ?></td>
                    <td><?php echo getTimeAgo($activity['created_at']); ?></td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
</div>

</body>
<?php include('../includes/footer.php'); ?>
</html>