<?php
$conn = mysqli_connect("localhost", "root", "", "visualds_admin");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
