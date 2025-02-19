<?php
include 'config.php';
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: admin_login.php');
    exit();
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add':
                $title = mysqli_real_escape_string($conn, $_POST['title']);
                $description = mysqli_real_escape_string($conn, $_POST['description']);
                
                // Handle image upload
                $target_dir = "../assets/images/";
                $target_file = $target_dir . basename($_FILES["image"]["name"]);
                move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
                
                $sql = "INSERT INTO algorithms (title, description, image_path) 
                        VALUES ('$title', '$description', '$target_file')";
                mysqli_query($conn, $sql);
                break;
                
            case 'edit':
                $id = mysqli_real_escape_string($conn, $_POST['id']);
                $title = mysqli_real_escape_string($conn, $_POST['title']);
                $description = mysqli_real_escape_string($conn, $_POST['description']);
                
                $sql = "UPDATE algorithms SET title='$title', description='$description' 
                        WHERE id=$id";
                mysqli_query($conn, $sql);
                break;
                
            case 'delete':
                $id = mysqli_real_escape_string($conn, $_POST['id']);
                mysqli_query($conn, "DELETE FROM algorithms WHERE id=$id");
                break;
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Manage Algorithms</title>
    <link rel="stylesheet" href="admin_style.css">
</head>
<body>
    <div class="admin-container">
        <!-- Include navigation -->
        <?php include 'admin_nav.php'; ?>
        
        <main class="admin-content">
            <h2>Manage Algorithms</h2>
            
            <!-- Add New Algorithm Form -->
            <div class="admin-form">
                <h3>Add New Algorithm</h3>
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="action" value="add">
                    <input type="text" name="title" placeholder="Algorithm Title" required>
                    <textarea name="description" placeholder="Description" required></textarea>
                    <input type="file" name="image" required>
                    <button type="submit">Add Algorithm</button>
                </form>
            </div>
            
            <!-- List of Existing Algorithms -->
            <div class="admin-list">
                <h3>Existing Algorithms</h3>
                <?php
                $result = mysqli_query($conn, "SELECT * FROM algorithms ORDER BY title");
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<div class='admin-item'>";
                    echo "<img src='" . $row['image_path'] . "' alt='" . $row['title'] . "' width='100'>";
                    echo "<h4>" . $row['title'] . "</h4>";
                    echo "<div class='admin-actions'>";
                    echo "<button onclick='editAlgorithm(" . $row['id'] . ")'>Edit</button>";
                    echo "<button onclick='deleteAlgorithm(" . $row['id'] . ")'>Delete</button>";
                    echo "</div>";
                    echo "</div>";
                }
                ?>
            </div>
        </main>
    </div>
    
    <script>
    function editAlgorithm(id) {
        // Simple JavaScript to handle edit operation
        if (confirm('Edit this algorithm?')) {
            // You can implement a modal or form here
            console.log('Editing algorithm ' + id);
        }
    }
    
    function deleteAlgorithm(id) {
        if (confirm('Are you sure you want to delete this algorithm?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.innerHTML = `
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="${id}">
            `;
            document.body.appendChild(form);
            form.submit();
        }
    }
    </script>
</body>
</html>