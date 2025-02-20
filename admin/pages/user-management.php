
<?php
// File Path: admin/pages/user-management.php

require_once('../includes/config.php');
checkLogin();

// Handle user actions
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add':
                $username = mysqli_real_escape_string($conn, $_POST['username']);
                $email = mysqli_real_escape_string($conn, $_POST['email']);
                $password = md5($_POST['password']); // Using MD5 as requested
                $role = mysqli_real_escape_string($conn, $_POST['role']);
                
                mysqli_query($conn, "INSERT INTO users (username, email, password, role) 
                                   VALUES ('$username', '$email', '$password', '$role')");
                logActivity($_SESSION['admin_user_id'], 'User Created', "Created user: $username");
                break;
                
            case 'edit':
                $id = (int)$_POST['user_id'];
                $email = mysqli_real_escape_string($conn, $_POST['email']);
                $status = mysqli_real_escape_string($conn, $_POST['status']);
                $role = mysqli_real_escape_string($conn, $_POST['role']);
                
                $query = "UPDATE users SET email = '$email', status = '$status', role = '$role'";
                if (!empty($_POST['password'])) {
                    $password = md5($_POST['password']);
                    $query .= ", password = '$password'";
                }
                $query .= " WHERE id = $id";
                
                mysqli_query($conn, $query);
                logActivity($_SESSION['admin_user_id'], 'User Updated', "Updated user ID: $id");
                break;
                
            case 'delete':
                $id = (int)$_POST['user_id'];
                mysqli_query($conn, "DELETE FROM users WHERE id = $id AND username != 'admin'");
                logActivity($_SESSION['admin_user_id'], 'User Deleted', "Deleted user ID: $id");
                break;
        }
    }
}

// Get users with pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

$search = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
$filter = isset($_GET['filter']) ? mysqli_real_escape_string($conn, $_GET['filter']) : 'All';

$where = "1=1";
if ($search) {
    $where .= " AND (username LIKE '%$search%' OR email LIKE '%$search%')";
}
if ($filter != 'All') {
    $where .= " AND status = '$filter'";
}

$users = mysqli_query($conn, "SELECT * FROM users WHERE $where ORDER BY id DESC LIMIT $offset, $limit");
$total = mysqli_fetch_assoc(mysqli_query($conn, "SELECT COUNT(*) as count FROM users WHERE $where"))['count'];
$total_pages = ceil($total / $limit);

include('../includes/header.php');
include('../includes/sidebar.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
<div class="main-content">
    <div class="card">
        <div class="card-header">
            <h1>User Management</h1>
            <div class="actions">
                <button class="btn btn-primary" onclick="showModal('addUserModal')">Add User</button>
                <button class="btn btn-secondary" onclick="exportUsers()">Export</button>
            </div>
        </div>
        
        <div class="filters">
            <input type="text" id="searchInput" placeholder="Search users..." 
                   value="<?php echo htmlspecialchars($search); ?>" onkeyup="searchUsers()">
            <select id="filterSelect" onchange="filterUsers()">
                <option value="All" <?php echo $filter == 'All' ? 'selected' : ''; ?>>All</option>
                <option value="active" <?php echo $filter == 'active' ? 'selected' : ''; ?>>Active</option>
                <option value="inactive" <?php echo $filter == 'inactive' ? 'selected' : ''; ?>>Inactive</option>
            </select>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($user = mysqli_fetch_assoc($users)): ?>
                <tr>
                    <td><?php echo $user['id']; ?></td>
                    <td><?php echo htmlspecialchars($user['username']); ?></td>
                    <td><?php echo htmlspecialchars($user['email']); ?></td>
                    <td>
                        <span class="status-badge <?php echo $user['status']; ?>">
                            <?php echo ucfirst($user['status']); ?>
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-small btn-edit" 
                                onclick="editUser(<?php echo $user['id']; ?>)">Edit</button>
                        <?php if ($user['username'] != 'admin'): ?>
                        <button class="btn btn-small btn-delete" 
                                onclick="deleteUser(<?php echo $user['id']; ?>)">Delete</button>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>

        <?php if ($total_pages > 1): ?>
        <div class="pagination">
            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <a href="?page=<?php echo $i; ?>&search=<?php echo urlencode($search); ?>&filter=<?php echo urlencode($filter); ?>" 
                   class="<?php echo $page == $i ? 'active' : ''; ?>"><?php echo $i; ?></a>
            <?php endfor; ?>
        </div>
        <?php endif; ?>
    </div>
</div>

<!-- Add User Modal -->
<div id="addUserModal" class="modal">
    <div class="modal-content">
        <h2>Add New User</h2>
        <form id="addUserForm" method="POST">
            <input type="hidden" name="action" value="add">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select name="role">
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Add User</button>
                <button type="button" class="btn btn-secondary" onclick="hideModal('addUserModal')">Cancel</button>
            </div>
        </form>
    </div>
</div>

<!-- Edit User Modal -->
<div id="editUserModal" class="modal">
    <div class="modal-content">
        <h2>Edit User</h2>
        <form id="editUserForm" method="POST">
            <input type="hidden" name="action" value="edit">
            <input type="hidden" name="user_id" id="editUserId">
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" id="editUserEmail" required>
            </div>
            <div class="form-group">
                <label>New Password (leave blank to keep current)</label>
                <input type="password" name="password">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="status" id="editUserStatus">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select name="role" id="editUserRole">
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary" onclick="hideModal('editUserModal')">Cancel</button>
            </div>
        </form>
    </div>
</div>

</body>
<?php include('../includes/footer.php'); ?>
</html>