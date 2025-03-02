<?php
require_once '../includes/config.php';
require_once '../includes/functions.php';

// Check login
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: ../login.php");
    exit();
}

// Get user ID from session
$user_id = $_SESSION['user_id'] ?? null;

// Handle form submissions
$error = '';
$edit_user_id = isset($_GET['edit']) ? $_GET['edit'] : null;

if (isset($_POST['submit_user'])) {
    handle_user_submission($_POST, $edit_user_id);
}

// Fetch users for display
$users = get_all_users();
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
                <!-- User Form Card -->
                <div class="card">
                    <h2>Manage Website Users</h2>
                    <?php display_error_message($error); ?>
                    
                    <?php if ($edit_user_id): 
                        $user = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM users WHERE id='$edit_user_id'")); ?>
                        <form method="POST" onsubmit="return validateForm('userForm')" id="userForm">
                            <input type="hidden" name="id" value="<?php echo $edit_user_id; ?>">
                            <h3>Edit User</h3>
                            <input type="text" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
                            <input type="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
                            <input type="password" name="password" placeholder="Leave blank to keep current password">
                            <select name="role" required>
                                <option value="admin" <?php echo $user['role'] == 'admin' ? 'selected' : ''; ?>>Administrator</option>
                                <option value="user" <?php echo $user['role'] == 'user' ? 'selected' : ''; ?>>User</option>
                            </select>
                            <select name="status" required>
                                <option value="active" <?php echo $user['status'] == 'active' ? 'selected' : ''; ?>>Active</option>
                                <option value="inactive" <?php echo $user['status'] == 'inactive' ? 'selected' : ''; ?>>Inactive</option>
                            </select>
                            <input type="submit" name="submit_user" value="Update User" class="btn-primary">
                            <a href="user-management.php" class="btn-secondary">Cancel</a>
                        </form>
                    <?php else: ?>
                        <form method="POST" onsubmit="return validateForm('userForm')" id="userForm">
                            <h3>Add New User</h3>
                            <input type="text" name="username" placeholder="Username" required>
                            <input type="email" name="email" placeholder="Email" required>
                            <input type="password" name="password" placeholder="Password" required>
                            <select name="role" required>
                                <option value="admin">Administrator</option>
                                <option value="user">User</option>
                            </select>
                            <select name="status" required>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <input type="submit" name="submit_user" value="Add User" class="btn-primary">
                        </form>
                    <?php endif; ?>
                </div>

                <!-- Users Table Card -->
                <div class="card">
                    <?php display_users_table($users); ?>
                </div>
            </div>
        </main>
        
        <?php include '../includes/footer.php'; ?>
    </div>
    <script src="../assets/js/validation.js"></script>
</body>
</html>