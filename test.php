<?php
include("config.php");

// Test database connection
if ($conn) {
    echo "<h2>✅ Database Connected Successfully</h2>";
    
    // Test projects table
    $result = mysqli_query($conn, "SELECT COUNT(*) as count FROM projects");
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo "<p>📊 Projects in database: " . $row['count'] . "</p>";
    }
    
    // Test project_images table
    $result = mysqli_query($conn, "SELECT COUNT(*) as count FROM project_images");
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo "<p>🖼️ Images in database: " . $row['count'] . "</p>";
    }
    
    // Test uploads directory
    if (is_dir('admin/uploads') && is_writable('admin/uploads')) {
        echo "<p>📁 Uploads directory: ✅ Ready</p>";
    } else {
        echo "<p>📁 Uploads directory: ❌ Not writable</p>";
    }
    
    echo "<hr>";
    echo "<h3>🔗 Navigation Links:</h3>";
    echo "<ul>";
    echo "<li><a href='index.php'>🏠 Homepage</a></li>";
    echo "<li><a href='projects.php'>🏗️ Projects</a></li>";
    echo "<li><a href='about.html'>ℹ️ About Us</a></li>";
    echo "<li><a href='contact.html'>📞 Contact</a></li>";
    echo "<li><a href='admin/login.php'>🔐 Admin Login</a></li>";
    echo "</ul>";
    
} else {
    echo "<h2>❌ Database Connection Failed</h2>";
    echo "<p>Error: " . mysqli_connect_error() . "</p>";
}
?>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: #f8fafc;
}

h2 { color: #2563eb; }
h3 { color: #1f2937; }
p { margin: 10px 0; }
ul { margin: 20px 0; }
li { margin: 8px 0; }
a { color: #2563eb; text-decoration: none; }
a:hover { text-decoration: underline; }
hr { margin: 30px 0; border: 1px solid #e5e7eb; }
</style>