<?php
function updateAlgorithmProgress($user_id, $algorithm_name, $progress) {
    global $conn;
    
    // Get algorithm ID
    $algo_query = "SELECT id FROM algorithms WHERE name = '$algorithm_name' LIMIT 1";
    $algo_result = mysqli_query($conn, $algo_query);
    $algo = mysqli_fetch_assoc($algo_result);
    
    if (!$algo) {
        return false;
    }
    
    $algorithm_id = $algo['id'];
    
    // Check if progress entry exists
    $check_query = "SELECT id FROM user_progress 
                   WHERE user_id = '$user_id' 
                   AND algorithm_id = '$algorithm_id'";
    $check_result = mysqli_query($conn, $check_query);
    
    if (mysqli_num_rows($check_result) > 0) {
        // Update existing progress
        $update = "UPDATE user_progress 
                  SET progress = '$progress', 
                      last_visited = CURRENT_TIMESTAMP 
                  WHERE user_id = '$user_id' 
                  AND algorithm_id = '$algorithm_id'";
        return mysqli_query($conn, $update);
    } else {
        // Insert new progress
        $insert = "INSERT INTO user_progress (user_id, algorithm_id, progress) 
                  VALUES ('$user_id', '$algorithm_id', '$progress')";
        return mysqli_query($conn, $insert);
    }
}
?>
