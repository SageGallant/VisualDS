<!-- Place this code in: admin/pages/content-management.php -->

<?php
session_start();
require_once '../includes/config.php';
require_once '../includes/functions.php';

// Check login
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: ../login.php");
    exit();
}

// Get user ID from session
$user_id = $_SESSION['user_id'] ?? null;

// Handle content operations
if (isset($_POST['add_content'])) {
    handle_content_submission($_POST);
} elseif (isset($_POST['update_content'])) {
    handle_content_update($_POST);
}

// Fetch content items
$content_items = get_all_content();
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
                <!-- Content Form Card -->
                <div class="card">
                    <h2>Manage Website Content and Resources</h2>
                    <div class="form-container">
                        <form method="POST" onsubmit="return validateForm('contentForm')" id="contentForm">
                            <div class="form-group">
                                <label for="title">Content Title</label>
                                <input type="text" id="title" name="title" placeholder="Content Title" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="content">Content Body</label>
                                <textarea id="content" name="content" placeholder="Content Body" required rows="5" style="width: 100%; max-width: 800px;"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="status">Status</label>
                                <select id="status" name="status" required>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            
                            <div class="form-actions">
                                <input type="submit" name="add_content" value="Add Content" class="btn-primary">
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Content Table Card -->
                <div class="card">
                    <?php display_content_table($content_items); ?>
                </div>
            </div>
        </main>
        
        <?php include '../includes/footer.php'; ?>
    </div>
    <script src="../assets/js/modal.js"></script>
    <script src="../assets/js/validation.js"></script>
</body>
</html>