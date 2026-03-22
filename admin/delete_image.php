<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

include("../config.php");

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    // Get image information
    $result = mysqli_query($conn, "SELECT * FROM project_images WHERE id = $id");
    $row = mysqli_fetch_assoc($result);
    
    if ($row) {
        $image_path = "uploads/" . $row['image'];
        
        // Delete image file from filesystem
        if (file_exists($image_path)) {
            unlink($image_path);
        }
        
        // Delete from database
        mysqli_query($conn, "DELETE FROM project_images WHERE id = $id");
        
        // If this was the main project image, update the project
        $project_id = $row['project_id'];
        $project_result = mysqli_query($conn, "SELECT image FROM projects WHERE id = $project_id");
        $project_row = mysqli_fetch_assoc($project_result);
        
        if ($project_row['image'] == $row['image']) {
            // Find another image to set as main
            $other_image = mysqli_query($conn, "SELECT image FROM project_images WHERE project_id = $project_id LIMIT 1");
            $other_row = mysqli_fetch_assoc($other_image);
            
            if ($other_row) {
                mysqli_query($conn, "UPDATE projects SET image = '{$other_row['image']}' WHERE id = $project_id");
            } else {
                mysqli_query($conn, "UPDATE projects SET image = '' WHERE id = $project_id");
            }
        }
    }
}

// Redirect back to the referring page
if (isset($_SERVER['HTTP_REFERER'])) {
    header("Location: " . $_SERVER['HTTP_REFERER']);
} else {
    header("Location: edit-project.php");
}
exit();
?>