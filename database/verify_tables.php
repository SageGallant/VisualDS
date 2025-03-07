<?php
require_once '../includes/config.php';

echo "<h2>Verifying Database Tables</h2>";

// Check algorithm_types
$query = "SELECT * FROM algorithm_types";
$result = mysqli_query($conn, $query);
if ($result) {
    echo "<p>algorithm_types table exists with " . mysqli_num_rows($result) . " records</p>";
    while ($row = mysqli_fetch_assoc($result)) {
        echo "Type: " . $row['name'] . "<br>";
    }
} else {
    echo "<p>Error: algorithm_types table not found</p>";
}

// Check algorithms
$query = "SELECT a.*, at.name as type_name 
          FROM algorithms a 
          JOIN algorithm_types at ON a.type_id = at.id";
$result = mysqli_query($conn, $query);
if ($result) {
    echo "<p>algorithms table exists with " . mysqli_num_rows($result) . " records</p>";
    while ($row = mysqli_fetch_assoc($result)) {
        echo "Algorithm: " . $row['name'] . " (Type: " . $row['type_name'] . ")<br>";
    }
} else {
    echo "<p>Error: algorithms table not found</p>";
}

// Check user_progress
$query = "SELECT * FROM user_progress";
$result = mysqli_query($conn, $query);
if ($result) {
    echo "<p>user_progress table exists with " . mysqli_num_rows($result) . " records</p>";
} else {
    echo "<p>Error: user_progress table not found</p>";
}
?>
