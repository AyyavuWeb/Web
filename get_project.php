<?php
include "config.php";

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    
    $query = "SELECT * FROM projects WHERE id = $id";
    $result = mysqli_query($conn, $query);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        
        // Get project images
        $images_query = "SELECT image FROM project_images WHERE project_id = $id";
        $images_result = mysqli_query($conn, $images_query);
        $images = [];
        
        while ($img_row = mysqli_fetch_assoc($images_result)) {
            $images[] = $img_row['image'];
        }
        
        $row['images'] = $images;
        
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "Project not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>