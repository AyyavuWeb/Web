<?php
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit();
}

include("../config.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id == 0) {
    header("Location: edit-project.php");
    exit();
}

$result = mysqli_query($conn, "SELECT * FROM projects WHERE id = $id");
$row = mysqli_fetch_assoc($result);

if (!$row) {
    header("Location: edit-project.php");
    exit();
}

// Handle form submission
if (isset($_POST['update'])) {
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $status = mysqli_real_escape_string($conn, $_POST['status']);
    $location = isset($_POST['location']) ? mysqli_real_escape_string($conn, $_POST['location']) : '';
    $price = isset($_POST['price']) ? mysqli_real_escape_string($conn, $_POST['price']) : '';

    // Update project
    $sql = "UPDATE projects SET 
            title = '$title',
            description = '$description',
            status = '$status',
            location = '$location',
            price = '$price'
            WHERE id = $id";

    if (mysqli_query($conn, $sql)) {
        // Handle new image uploads
        if (isset($_FILES['images']) && !empty($_FILES['images']['name'][0])) {
            $upload_dir = "uploads/";
            
            foreach ($_FILES['images']['name'] as $key => $image_name) {
                if (!empty($image_name)) {
                    $tmp_name = $_FILES['images']['tmp_name'][$key];
                    $file_extension = pathinfo($image_name, PATHINFO_EXTENSION);
                    $new_filename = time() . '_' . $key . '.' . $file_extension;
                    $target_path = $upload_dir . $new_filename;

                    if (move_uploaded_file($tmp_name, $target_path)) {
                        mysqli_query($conn, "INSERT INTO project_images (project_id, image) VALUES ('$id', '$new_filename')");
                        
                        // Set as main image if no main image exists
                        if (empty($row['image'])) {
                            mysqli_query($conn, "UPDATE projects SET image = '$new_filename' WHERE id = $id");
                        }
                    }
                }
            }
        }

        echo "<script>
            alert('Project Updated Successfully');
            window.location.href='edit-project.php';
        </script>";
    } else {
        echo "<script>
            alert('Error updating project');
        </script>";
    }
}

// Handle project deletion
if (isset($_POST['delete_project'])) {
    // Delete images from filesystem
    $images_result = mysqli_query($conn, "SELECT image FROM project_images WHERE project_id = $id");
    while ($img_row = mysqli_fetch_assoc($images_result)) {
        $image_path = "uploads/" . $img_row['image'];
        if (file_exists($image_path)) {
            unlink($image_path);
        }
    }

    // Delete main project image
    if (!empty($row['image']) && file_exists("uploads/" . $row['image'])) {
        unlink("uploads/" . $row['image']);
    }

    // Delete from database
    mysqli_query($conn, "DELETE FROM project_images WHERE project_id = $id");
    mysqli_query($conn, "DELETE FROM projects WHERE id = $id");

    echo "<script>
        alert('Project Deleted Successfully');
        window.location.href='edit-project.php';
    </script>";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Project</title>
    <style>
        body {
            background: #0f172a;
            font-family: Arial;
            color: white;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        .form-box {
            background: #1e293b;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .form-box h2 {
            margin-top: 0;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input, textarea, select {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: none;
            background: #0f172a;
            color: white;
            font-size: 14px;
        }

        textarea {
            min-height: 80px;
            resize: vertical;
        }

        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-right: 10px;
            margin-top: 10px;
        }

        button:hover {
            background: #1e4ed8;
        }

        .delete-btn {
            background: #dc2626;
        }

        .delete-btn:hover {
            background: #b91c1c;
        }

        .back-btn {
            background: #6b7280;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 20px;
        }

        .back-btn:hover {
            background: #4b5563;
        }

        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 12px;
            margin-top: 15px;
        }

        .image-box {
            position: relative;
        }

        .image-box img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 6px;
        }

        .delete-icon {
            position: absolute;
            top: 5px;
            right: 5px;
            background: red;
            color: white;
            font-size: 12px;
            padding: 3px 6px;
            border-radius: 50%;
            text-decoration: none;
            cursor: pointer;
        }

        .delete-icon:hover {
            background: darkred;
        }
    </style>
</head>

<body>
    <div class="container">
        <a href="edit-project.php" class="back-btn">← Back to Projects</a>

        <div class="form-box">
            <h2>Edit Project</h2>

            <form method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" name="title" value="<?php echo htmlspecialchars($row['title']); ?>" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" required><?php echo htmlspecialchars($row['description']); ?></textarea>
                </div>

                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value="<?php echo htmlspecialchars($row['location']); ?>">
                </div>

                <div class="form-group">
                    <label>Price</label>
                    <input type="text" name="price" value="<?php echo htmlspecialchars($row['price']); ?>">
                </div>

                <div class="form-group">
                    <label>Status</label>
                    <select name="status">
                        <option value="ongoing" <?php if($row['status'] == 'ongoing') echo 'selected'; ?>>Ongoing</option>
                        <option value="completed" <?php if($row['status'] == 'completed') echo 'selected'; ?>>Completed</option>
                        <option value="upcoming" <?php if($row['status'] == 'upcoming') echo 'selected'; ?>>Upcoming</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Current Images</label>
                    <div class="image-gallery">
                        <?php
                        $images = mysqli_query($conn, "SELECT * FROM project_images WHERE project_id = $id");
                        while ($img = mysqli_fetch_assoc($images)) {
                            if (!empty($img['image']) && file_exists("uploads/" . $img['image'])) {
                        ?>
                            <div class="image-box">
                                <img src="uploads/<?php echo $img['image']; ?>" alt="Project Image">
                                <a class="delete-icon" 
                                   href="delete_image.php?id=<?php echo $img['id']; ?>" 
                                   onclick="return confirm('Delete this image?')">✖</a>
                            </div>
                        <?php
                            }
                        }
                        ?>
                    </div>
                </div>

                <div class="form-group">
                    <label>Add More Images</label>
                    <input type="file" name="images[]" multiple accept="image/*">
                </div>

                <button type="submit" name="update">Update Project</button>
                <button type="submit" name="delete_project" class="delete-btn"
                        onclick="return confirm('Are you sure you want to delete this project?')">
                    Delete Project
                </button>
            </form>
        </div>
    </div>
</body>
</html>