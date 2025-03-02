<!-- Place this code in: admin/includes/functions.php -->

<?php
// Database helper functions

function get_all_users() {
    global $conn;
    $query = "SELECT * FROM users";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Error fetching users: " . mysqli_error($conn));
    }
    return $result;
}

function get_all_content() {
    global $conn;
    $query = "SELECT * FROM content WHERE type='page'";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Error fetching content: " . mysqli_error($conn));
    }
    return $result;
}

function get_system_settings() {
    global $conn;
    $query = "SELECT * FROM settings";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Error fetching settings: " . mysqli_error($conn));
    }
    return mysqli_fetch_assoc($result);
}

function handle_user_submission($post_data, $edit_user_id) {
    global $conn;
    $username = mysqli_real_escape_string($conn, $post_data['username']);
    $email = mysqli_real_escape_string($conn, $post_data['email']);
    $password = mysqli_real_escape_string($conn, $post_data['password']);
    $role = mysqli_real_escape_string($conn, $post_data['role']);
    $status = mysqli_real_escape_string($conn, $post_data['status']);

    if ($edit_user_id) {
        $query = "UPDATE users SET username='$username', email='$email'";
        if (!empty($password)) {
            $query .= ", password='$password'";
        }
        $query .= ", role='$role', status='$status' WHERE id='$edit_user_id'";
    } else {
        $query = "INSERT INTO users (username, email, password, role, status) 
                 VALUES ('$username', '$email', '$password', '$role', '$status')";
    }

    return mysqli_query($conn, $query);
}

function handle_content_submission($post_data) {
    global $conn;
    $title = mysqli_real_escape_string($conn, $post_data['title']);
    $content = mysqli_real_escape_string($conn, $post_data['content']);
    $status = mysqli_real_escape_string($conn, $post_data['status']);

    $query = "INSERT INTO content (title, content, status, type) 
             VALUES ('$title', '$content', '$status', 'page')";
    
    return mysqli_query($conn, $query);
}

function handle_content_update($post_data) {
    global $conn;
    $id = mysqli_real_escape_string($conn, $post_data['id']);
    $title = mysqli_real_escape_string($conn, $post_data['title']);
    $content = mysqli_real_escape_string($conn, $post_data['content']);
    $status = mysqli_real_escape_string($conn, $post_data['status']);

    $query = "UPDATE content SET title='$title', content='$content', 
             status='$status' WHERE id='$id'";
    
    return mysqli_query($conn, $query);
}

function handle_settings_update($post_data) {
    global $conn;
    // Add your settings update logic here
    return true;
}

function get_user_activity($user_id) {
    global $conn;
    $query = "SELECT * FROM activity_logs ORDER BY time DESC LIMIT 10";
    $result = mysqli_query($conn, $query);
    if (!$result) {
        die("Error fetching activity: " . mysqli_error($conn));
    }
    return $result;
}

function display_error_message($error) {
    if (!empty($error)) {
        $color = (strpos($error, 'successfully') !== false) ? 'green' : 'red';
        echo "<p style='color: $color;'>$error</p>";
    }
}

function get_content($content_id) {
    include 'config.php';
    
    $conn = mysqli_connect($host, $username, $password, $database);
    if (!$conn) 
        die("Could not connect: " . mysqli_connect_error());
    
    
    $query = "SELECT * FROM content WHERE id='$content_id'";
    $result = mysqli_query($conn, $query) or die("Error: " . mysqli_error($conn));
    $row = mysqli_fetch_assoc($result);
    mysqli_close($conn);
    return $row;
}

function update_content($id, $title, $content, $status) {
    include 'config.php';
    
    $conn = mysqli_connect($host, $username, $password, $database);
    if (!$conn) 
        die("Could not connect: " . mysqli_connect_error());
    
    
    $query = "UPDATE content SET title='$title', content='$content', status='$status', last_updated=NOW() WHERE id='$id'";
    mysqli_query($conn, $query) or die("Error updating content: " . mysqli_error($conn));
    mysqli_close($conn);
}

function display_users_table($users) {
    echo '<table>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>';
    
    while ($user = mysqli_fetch_assoc($users)) {
        echo "<tr>
            <td>{$user['id']}</td>
            <td>{$user['username']}</td>
            <td>{$user['email']}</td>
            <td>{$user['role']}</td>
            <td>{$user['status']}</td>
            <td>
                <a href='?edit={$user['id']}' class='btn-primary'>Edit</a>
                <a href='javascript:void(0)' onclick='if(confirm(\"Delete this user?\")) window.location=\"delete_user.php?id={$user['id']}\"' class='btn-danger'>Delete</a>
            </td>
        </tr>";
    }
    
    echo '</table>';
}

function display_content_table($content_items) {
    echo '<table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
        </tr>';
    
    while ($item = mysqli_fetch_assoc($content_items)) {
        echo "<tr>
            <td>{$item['id']}</td>
            <td>{$item['title']}</td>
            <td>{$item['status']}</td>
            <td>{$item['last_updated']}</td>
            <td>
                <a href='?edit={$item['id']}' class='btn-primary'>Edit</a>
                <a href='javascript:void(0)' onclick='if(confirm(\"Delete this content?\")) window.location=\"delete_content.php?id={$item['id']}\"' class='btn-danger'>Delete</a>
            </td>
        </tr>";
    }
    
    echo '</table>';
}
?>