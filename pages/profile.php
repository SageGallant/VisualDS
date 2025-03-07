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

// First check if tables exist
$tables_exist = true;
$required_tables = ['algorithm_types', 'algorithms', 'user_progress'];

foreach ($required_tables as $table) {
    $check = mysqli_query($conn, "SHOW TABLES LIKE '$table'");
    if (mysqli_num_rows($check) == 0) {
        $tables_exist = false;
        die("Table '$table' does not exist. Please run the database setup script first.");
    }
}

// Debug database tables
$table_structure = mysqli_query($conn, "DESCRIBE user_progress");
if (!$table_structure) {
    die("Could not check table structure: " . mysqli_error($conn));
}

// Simpler query to prevent column mismatch
$progress_query = "SELECT 
    at.name as type_name,
    a.name as algorithm_name,
    COALESCE(up.progress, 0) as progress,
    up.last_visited
FROM algorithm_types at
INNER JOIN algorithms a ON at.id = a.type_id
LEFT JOIN (
    SELECT * FROM user_progress WHERE user_id = $user_id
) up ON a.id = up.algorithm_id";

$progress_result = mysqli_query($conn, $progress_query);

if (!$progress_result) {
    echo "Error in query: " . $progress_query . "<br>";
    die("Database error: " . mysqli_error($conn));
}

// Organize progress data by algorithm type
$progress_data = [];
$total_progress = 0;
$total_algorithms = 0;

while ($row = mysqli_fetch_assoc($progress_result)) {
    $type = $row['type_name'];
    if (!isset($progress_data[$type])) {
        $progress_data[$type] = [];
    }
    $progress_data[$type][] = $row;
    $total_progress += $row['progress'] ?? 0;
    $total_algorithms++;
}

$average_progress = $total_algorithms > 0 ? round($total_progress / $total_algorithms) : 0;
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
            <?php foreach ($progress_data as $type => $algorithms): 
                $type_progress = 0;
                $algo_count = count($algorithms);
                
                foreach ($algorithms as $algo) {
                    $type_progress += $algo['progress'] ?? 0;
                }
                
                $avg_type_progress = $algo_count > 0 ? round($type_progress / $algo_count) : 0;
            ?>
            <div class="progress-card">
                <h3><?php echo htmlspecialchars($type); ?></h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: <?php echo $avg_type_progress; ?>%"></div>
                </div>
                <p><?php echo $avg_type_progress; ?>% Complete</p>
                
                <div class="algorithm-list">
                    <?php foreach ($algorithms as $algo): ?>
                        <div class="algorithm-item">
                            <div>
                                <div><?php echo htmlspecialchars($algo['algorithm_name']); ?></div>
                                <?php if ($algo['last_visited']): ?>
                                    <div class="last-visited">
                                        Last visited: <?php echo date('M j, Y', strtotime($algo['last_visited'])); ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div><?php echo $algo['progress'] ?? 0; ?>%</div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
