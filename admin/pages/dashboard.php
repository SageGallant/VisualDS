<?php
// File Path: admin/pages/dashboard.php
// require_once('../includes/config.php');
// checkLogin();

// // Get dashboard statistics
// $stats = array(
//     'total_users' => mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users"))['count'],
//     'total_content' => mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM pages"))['count'],
//     'active_sessions' => mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(DISTINCT user_id) as count FROM activity_log WHERE created_at >= NOW() - INTERVAL 1 HOUR"))['count']
// );

// // Get recent activity
// $recent_activity = mysqli_query($conn, "
//     SELECT a.*, u.username 
//     FROM activity_log a 
//     LEFT JOIN users u ON a.user_id = u.id 
//     ORDER BY a.created_at DESC 
//     LIMIT 5
// ");
?>

<?php include('../includes/header.php'); ?>

<div class="main-content">
    <div class="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></p>
    </div>

    <div class="stats-container">
        <div class="stat-card">
            <h3>Total Users</h3>
            <div class="stat-value"><?php echo number_format($stats['total_users']); ?></div>
        </div>

        <div class="stat-card">
            <h3>Total Content Items</h3>
            <div class="stat-value"><?php echo number_format($stats['total_content']); ?></div>
        </div>

        <div class="stat-card">
            <h3>Active Sessions</h3>
            <div class="stat-value"><?php echo number_format($stats['active_sessions']); ?></div>
        </div>
    </div>

    <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
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
                            <td><?php echo date('Y-m-d H:i', strtotime($activity['created_at'])); ?></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include('../includes/footer.php'); ?>