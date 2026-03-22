<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

include("../config.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $status = mysqli_real_escape_string($conn, $_POST['status']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $details = isset($_POST['details']) ? mysqli_real_escape_string($conn, $_POST['details']) : '';

    // Insert project
    $query = "INSERT INTO projects (title, description, details, status, location, price) 
              VALUES ('$title', '$description', '$details', '$status', '$location', '$price')";
    
    if (mysqli_query($conn, $query)) {
        // Get project id
        $project_id = mysqli_insert_id($conn);

        // Handle image uploads
        if (isset($_FILES['images']) && !empty($_FILES['images']['name'][0])) {
            $upload_dir = "uploads/";
            
            // Create uploads directory if it doesn't exist
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            $uploaded_images = [];
            
            foreach ($_FILES['images']['name'] as $key => $image_name) {
                if (!empty($image_name)) {
                    $tmp_name = $_FILES['images']['tmp_name'][$key];
                    $file_extension = pathinfo($image_name, PATHINFO_EXTENSION);
                    $new_filename = time() . '_' . $key . '.' . $file_extension;
                    $target_path = $upload_dir . $new_filename;

                    if (move_uploaded_file($tmp_name, $target_path)) {
                        $uploaded_images[] = $new_filename;
                        
                        // Insert image record
                        mysqli_query($conn, "INSERT INTO project_images (project_id, image) VALUES ('$project_id', '$new_filename')");
                    }
                }
            }

            // Set first image as main project image
            if (!empty($uploaded_images)) {
                mysqli_query($conn, "UPDATE projects SET image = '{$uploaded_images[0]}' WHERE id = $project_id");
            }
        }

        echo "<script>
            alert('Project Added Successfully');
            window.location.href='dashboard.php';
        </script>";
    } else {
        echo "<script>
            alert('Error adding project: " . mysqli_error($conn) . "');
            window.location.href='add-project.php';
        </script>";
    }
}
?>