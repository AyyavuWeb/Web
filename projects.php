<?php
include('config.php');

// PAGINATION
$limit = 6;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$start = ($page - 1) * $limit;

// FILTER
$filter = "";
if (isset($_GET['status']) && $_GET['status'] != "All") {
    $status = mysqli_real_escape_string($conn, $_GET['status']);
    $filter = "WHERE status = '$status'";
}

// TOTAL
$total_query = "SELECT COUNT(*) as total FROM projects $filter";
$total_result = mysqli_query($conn, $total_query);
$total_row = mysqli_fetch_assoc($total_result);
$total_pages = ceil($total_row['total'] / $limit);

// GET PROJECTS
$query = "SELECT * FROM projects $filter ORDER BY id DESC LIMIT $start, $limit";
$result = mysqli_query($conn, $query);
?>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayyavu Construction - Projects</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Segoe UI", sans-serif;
        }

        body {
            background-color: #ffffff;
            color: #1f2937;
        }

        /* NAVBAR */
        header {
            width: 100%;
            padding: 16px 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e7eb;
        }

        .logo {
            margin-bottom: -10px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 18px;
        }

        .logo img {
            width: 28px;
            height: 28px;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 28px;
            font-size: 14px;
        }

        nav ul li {
            cursor: pointer;
            transition: color 0.3s ease;
        }

        nav ul li:hover {
            color: #2563eb;
        }

        .quote-btn {
            background-color: #2563eb;
            color: #ffffff;
            padding: 10px 18px;
            border-radius: 8px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .quote-btn:hover {
            background-color: #1e4ed8;
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(37, 99, 235, 0.35);
        }

        /* PROJECT SECTION */
        .project-section {
            padding: 50px 60px;
        }

        .project-header {
            text-align: center;
            max-width: 720px;
            margin: 0 auto 60px;
        }

        .project-label {
            font-size: 12px;
            font-weight: 600;
            color: #2563eb;
            letter-spacing: 1.4px;
            display: inline-block;
            margin-bottom: 12px;
        }

        .project-title {
            font-size: 36px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 14px;
        }

        .project-subtitle {
            font-size: 15px;
            line-height: 1.7;
            color: #6b7280;
        }

        /* FILTER BUTTONS */
        .filter-btns {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }

        .filter-btns button {
            padding: 8px 18px;
            border: 1px solid #ccc;
            background: #fff;
            cursor: pointer;
            border-radius: 25px;
            font-size: 14px;
            transition: 0.3s;
        }

        .filter-btns button:hover,
        .filter-btns button.active {
            background: #2563eb;
            color: #fff;
            border-color: #2563eb;
        }

        /* PROJECT GRID */
        .project-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 36px;
            margin-bottom: 40px;
        }

        .project-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 22px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 26px 38px -22px rgba(17, 24, 39, 0.28);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 36px 48px -22px rgba(17, 24, 39, 0.35);
        }

        .project-image {
            height: 200px;
            border-radius: 14px;
            background-size: cover;
            background-position: center;
            margin-bottom: 18px;
            background-color: #f3f4f6;
        }

        .project-status {
            font-size: 11px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .status {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: white;
        }

        .completed {
            background: #22c55e;
        }

        .ongoing {
            background: #f97316;
        }

        .upcoming {
            background: #3b82f6;
        }

        .project-card h3 {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 10px;
        }

        .project-card p {
            font-size: 14px;
            line-height: 1.6;
            color: #6b7280;
            margin-bottom: 10px;
        }

        .project-card .view-btn {
            font-size: 14px;
            font-weight: 600;
            color: #2563eb;
            text-decoration: none;
            margin-top: auto;
            padding: 8px 16px;
            border: 1px solid #2563eb;
            border-radius: 6px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .project-card .view-btn:hover {
            background: #2563eb;
            color: white;
        }

        /* PAGINATION */
        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 40px;
        }

        .pagination a {
            padding: 8px 16px;
            background: #f3f4f6;
            color: #374151;
            text-decoration: none;
            border-radius: 6px;
            transition: all 0.3s ease;
        }

        .pagination a:hover,
        .pagination a.active {
            background: #2563eb;
            color: white;
        }

        /* MODAL */
        #propertyModal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .modal-box {
            background: #ffffff;
            color: #1f2937;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            border-radius: 14px;
            padding: 30px;
            overflow-y: auto;
            position: relative;
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 25px;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
        }

        .modal-close:hover {
            color: #1f2937;
        }

        .modal-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }

        .modal-images img {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .modal-details h2 {
            margin-bottom: 15px;
            color: #111827;
        }

        .modal-details .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 15px;
            color: white;
        }

        .modal-details p {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .modal-details strong {
            color: #111827;
        }

        /* FOOTER */
        .footer-section {
            background: linear-gradient(180deg, #0b1220, #020617);
            color: #cbd5e1;
            padding: 70px 80px 30px;
            margin-top: 80px;
        }

        .footer-container {
            display: grid;
            grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
            gap: 60px;
            margin-bottom: 50px;
        }

        .footer-text {
            font-size: 14px;
            line-height: 1.7;
            margin: 18px 0 24px;
            color: #94a3b8;
        }

        .social-links {
            display: flex;
            gap: 12px;
        }

        .social-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #111827;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .social-icon:hover {
            background: #2563eb;
            transform: translateY(-3px);
        }

        .footer-column h4 {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 18px;
        }

        .footer-column ul {
            list-style: none;
            padding: 0;
        }

        .footer-column li {
            margin-bottom: 12px;
        }

        .footer-column a {
            text-decoration: none;
            font-size: 14px;
            color: #94a3b8;
            transition: color 0.3s ease;
        }

        .footer-column a:hover {
            color: #ffffff;
        }

        .footer-column p {
            font-size: 14px;
            margin-bottom: 14px;
            color: #94a3b8;
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #64748b;
        }

        .footer-legal a {
            margin-left: 18px;
            text-decoration: none;
            color: #64748b;
            transition: color 0.3s ease;
        }

        .footer-legal a:hover {
            color: #ffffff;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            .project-cards {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                grid-template-columns: 1fr;
            }
            
            .footer-container {
                grid-template-columns: 1fr;
                gap: 30px;
            }
        }
    </style>
</head>

<body>
    <header>
        <div class="logo">
            <span><img src="assets/images/Logo.png" alt="Logo"></span>
            <b>Ayyavu Construction</b>
        </div>

        <nav>
            <ul>
                <li><a href="index.php" style="color: inherit; text-decoration: none;">Home</a></li>
                <li><a href="about.html" style="color: inherit; text-decoration: none;">About Us</a></li>
                <li><a href="projects.php" style="color: inherit; text-decoration: none;">Projects</a></li>
                <li><a href="contact.html" style="color: inherit; text-decoration: none;">Contact Us</a></li>
            </ul>
        </nav>

        <a href="admin/login.php" class="quote-btn">Admin</a>
    </header>

    <section class="project-section">
        <div class="project-header">
            <span class="project-label">PROJECT PIPELINE</span>
            <h2 class="project-title">Our Project Journey</h2>
            <p class="project-subtitle">
                A transparent look into our active portfolio showcasing construction excellence.
            </p>
        </div>

        <div class="filter-btns">
            <button onclick="filterStatus('All')" <?php echo (!isset($_GET['status']) || $_GET['status'] == 'All') ? 'class="active"' : ''; ?>>All</button>
            <button onclick="filterStatus('ongoing')" <?php echo (isset($_GET['status']) && $_GET['status'] == 'ongoing') ? 'class="active"' : ''; ?>>Ongoing</button>
            <button onclick="filterStatus('completed')" <?php echo (isset($_GET['status']) && $_GET['status'] == 'completed') ? 'class="active"' : ''; ?>>Completed</button>
            <button onclick="filterStatus('upcoming')" <?php echo (isset($_GET['status']) && $_GET['status'] == 'upcoming') ? 'class="active"' : ''; ?>>Upcoming</button>
        </div>

        <div class="project-cards">
            <?php 
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) { 
                    // Get first image for the project
                    $img_query = mysqli_query($conn, "SELECT image FROM project_images WHERE project_id = {$row['id']} LIMIT 1");
                    $img_row = mysqli_fetch_assoc($img_query);
                    $image_src = $img_row ? "admin/uploads/" . $img_row['image'] : "assets/images/placeholder.jpg";
            ?>
                <div class="project-card">
                    <div class="project-image" style="background-image: url('<?php echo $image_src; ?>');"></div>
                    
                    <div class="project-status">
                        <span class="status <?php echo strtolower($row['status']); ?>">
                            <?php echo ucfirst($row['status']); ?>
                        </span>
                    </div>

                    <h3><?php echo htmlspecialchars($row['title']); ?></h3>
                    <p><?php echo htmlspecialchars(substr($row['description'], 0, 100)) . '...'; ?></p>
                    
                    <?php if (!empty($row['location'])) { ?>
                        <p><strong>Location:</strong> <?php echo htmlspecialchars($row['location']); ?></p>
                    <?php } ?>
                    
                    <?php if (!empty($row['price'])) { ?>
                        <p><strong>Price:</strong> <?php echo htmlspecialchars($row['price']); ?></p>
                    <?php } ?>

                    <a href="#" class="view-btn" onclick="openModal(<?php echo $row['id']; ?>)">View Details</a>
                </div>
            <?php 
                    fill: #ffffff;
                }
            } else {
                echo "<p style='text-align: center; grid-column: 1/-1;'>No projects found.</p>";
            }
            ?>
        </div>

        <!-- PAGINATION -->
        <?php if ($total_pages > 1) { ?>
            <div class="pagination">
                <?php for ($i = 1; $i <= $total_pages; $i++) { ?>
                    <a href="?page=<?php echo $i; ?><?php echo isset($_GET['status']) ? '&status=' . $_GET['status'] : ''; ?>" 
                       <?php echo ($i == $page) ? 'class="active"' : ''; ?>>
                        <?php echo $i; ?>
                    </a>
                <?php } ?>
            </div>
        <?php } ?>
    </section>

    <!-- MODAL -->
    <div id="propertyModal">
        <div class="modal-box">
            <span class="modal-close" onclick="closeModal()">✖</span>
            
            <div class="modal-content">
                <div class="modal-images">
                    <img id="mainImage" src="" alt="Project Image">
                    <div id="imageThumbs"></div>
                </div>
                
                <div class="modal-details">
                    <h2 id="modalTitle"></h2>
                    <span id="modalStatus" class="status-badge"></span>
                    <p><strong>Location:</strong> <span id="modalLocation"></span></p>
                    <p><strong>Price:</strong> <span id="modalPrice"></span></p>
                    <p><strong>Description:</strong></p>
                    <p id="modalDescription"></p>
                </div>
            </div>
        </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer-section">
        <div class="footer-container">
            <div class="footer-brand">
                <h3 class="logo">
                    <span style="margin-left: -205px;"><img src="assets/images/Logo.png" alt="Logo"></span> Ayyavu Construction
                </h3>
                <p class="footer-text">
                    Leading the industry with high-quality architectural solutions and
                    sustainable building practices since 2003.
                </p>
                <div class="social-links">
                    <a href="#" class="social-icon">📘</a>
                    <a href="#" class="social-icon">🐦</a>
                    <a href="#" class="social-icon">💼</a>
                </div>
            </div>

            <div class="footer-column">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.php">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="projects.php">Projects</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h4>Projects</h4>
                <ul>
                    <li><a href="projects.php?status=completed">Completed Projects</a></li>
                    <li><a href="projects.php?status=ongoing">Ongoing Projects</a></li>
                    <li><a href="projects.php?status=upcoming">Upcoming Projects</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h4>Contact Us</h4>
                <p>📍 No-17, Vidhya Colony 5th cross, Thadagam rd<br>TVS Nagar, Coimbatore - 641025</p>
                <p>📞 <a href="tel:+919360493616">+91 93604 93616</a></p>
                <p>📞 <a href="tel:+919345770330">+91 93457 70330</a></p>
                <p>✉️ <a href="mailto:ayyavu.ayyavupromoters@gmail.com">ayyavu.ayyavupromoters@gmail.com</a></p>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2026 Ayyavu Construction. All rights reserved.</p>
            <div class="footer-legal">
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
            </div>
        </div>
    </footer>

    <script>
        function openModal(id) {
            fetch("get_project.php?id=" + id)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                        return;
                    }

                    document.getElementById("modalTitle").innerText = data.title;
                    document.getElementById("modalLocation").innerText = data.location || 'Not specified';
                    document.getElementById("modalPrice").innerText = data.price || 'Contact for price';
                    document.getElementById("modalDescription").innerText = data.description;
                    
                    // Set status
                    const statusElement = document.getElementById("modalStatus");
                    statusElement.innerText = data.status.charAt(0).toUpperCase() + data.status.slice(1);
                    statusElement.className = "status-badge status-" + data.status;

                    // Set main image
                    if (data.images && data.images.length > 0) {
                        document.getElementById("mainImage").src = "admin/uploads/" + data.images[0];
                        
                        // Set thumbnails
                        const thumbsContainer = document.getElementById("imageThumbs");
                        thumbsContainer.innerHTML = "";
                        
                        data.images.forEach(image => {
                            const thumb = document.createElement("img");
                            thumb.src = "admin/uploads/" + image;
                            thumb.onclick = () => changeMainImage("admin/uploads/" + image);
                            thumb.style.cursor = "pointer";
                            thumb.style.width = "60px";
                            thumb.style.height = "60px";
                            thumb.style.objectFit = "cover";
                            thumb.style.borderRadius = "6px";
                            thumb.style.margin = "5px";
                            thumbsContainer.appendChild(thumb);
                        });
                    } else {
                        document.getElementById("mainImage").src = "assets/images/placeholder.jpg";
                        document.getElementById("imageThumbs").innerHTML = "";
                    }

                    document.getElementById("propertyModal").style.display = "flex";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error loading project details");
                });
        }

        function changeMainImage(src) {
            document.getElementById("mainImage").src = src;
        }

        function closeModal() {
            document.getElementById("propertyModal").style.display = "none";
        }

        function filterStatus(status) {
            if (status == "All") {
                window.location = "projects.php";
            } else {
                window.location = "projects.php?status=" + status;
            }
        }

        // Close modal when clicking outside
        document.getElementById("propertyModal").addEventListener("click", function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>