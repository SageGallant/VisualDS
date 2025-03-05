<?php
require_once '../includes/config.php';
require_once '../includes/header.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: ../login.php');
    exit();
}

// Get user info
$user_id = $_SESSION['user_id'];
$user_query = "SELECT * FROM users WHERE id = '$user_id'";
$user_result = mysqli_query($conn, $user_query);
$user = mysqli_fetch_assoc($user_result);

// Get progress data
$progress_query = "SELECT * FROM user_progress WHERE user_id = '$user_id'";
$progress_result = mysqli_query($conn, $progress_query);

// Calculate overall progress
$total_progress = 0;
$progress_count = 0;
$progress_data = [];

while ($row = mysqli_fetch_assoc($progress_result)) {
    $progress_data[$row['algorithm_type']][] = $row;
    $total_progress += $row['progress'];
    $progress_count++;
}

$average_progress = $progress_count > 0 ? round($total_progress / $progress_count) : 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile - VisualDS</title>
    <style>
        .profile-container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .profile-header {
            background: var(--card-bg, white);
            border-radius: 8px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .profile-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #666;
        }

        .profile-info h1 {
            margin: 0 0 0.5rem 0;
            color: var(--text-dark);
        }

        .profile-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--card-bg, white);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .progress-sections {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .progress-card {
            background: var(--card-bg, white);
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .progress-bar {
            height: 8px;
            background: #eee;
            border-radius: 4px;
            margin: 0.5rem 0;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: var(--primary-color, #26A69A);
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        .algorithm-list {
            margin-top: 1rem;
        }

        .algorithm-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }

        .last-visited {
            font-size: 0.8rem;
            color: #666;
        }

        .admin-button {
            background-color: #26A69A;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
        }
        .admin-button:hover {
            background-color: #1E8C7A;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <div class="profile-header">
            <div class="profile-avatar">
                <?php echo strtoupper(substr($user['username'], 0, 1)); ?>
            </div>
            <div class="profile-info">
                <h1><?php echo htmlspecialchars($user['username']); ?></h1>
                <p><?php echo htmlspecialchars($user['email']); ?></p>
                <?php if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true): ?>
                    <a href="/VisualDS/admin/pages/dashboard.php" class="admin-button">
                        Admin Panel
                    </a>
                <?php endif; ?>
            </div>
        </div>

        <div class="profile-stats">
            <div class="stat-card">
                <h3>Overall Progress</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: <?php echo $average_progress; ?>%"></div>
                </div>
                <p><?php echo $average_progress; ?>% Complete</p>
            </div>
            <div class="stat-card">
                <h3>Last Login</h3>
                <p><?php echo $user['last_login'] ? date('F j, Y, g:i a', strtotime($user['last_login'])) : 'Never'; ?></p>
            </div>
        </div>

        <div class="progress-sections">
            <?php
            $algorithm_types = ['Sorting', 'Searching', 'Linked Lists', 'Trees'];
            foreach ($algorithm_types as $type) {
                $type_progress = isset($progress_data[$type]) ? $progress_data[$type] : [];
                $avg_progress = 0;
                if (count($type_progress) > 0) {
                    $avg_progress = array_reduce($type_progress, function($carry, $item) {
                        return $carry + $item['progress'];
                    }, 0) / count($type_progress);
                }
            ?>
            <div class="progress-card">
                <h3><?php echo $type; ?></h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: <?php echo $avg_progress; ?>%"></div>
                </div>
                <p><?php echo round($avg_progress); ?>% Complete</p>
                
                <div class="algorithm-list">
                    <?php
                    if (!empty($type_progress)) {
                        foreach ($type_progress as $algo) {
                            echo '<div class="algorithm-item">';
                            echo '<div>';
                            echo '<div>' . htmlspecialchars($algo['algorithm_name']) . '</div>';
                            echo '<div class="last-visited">Last visited: ' . date('M j, Y', strtotime($algo['last_visited'])) . '</div>';
                            echo '</div>';
                            echo '<div>' . $algo['progress'] . '%</div>';
                            echo '</div>';
                        }
                    } else {
                        echo '<p>No progress yet</p>';
                    }
                    ?>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</body>
</html>
