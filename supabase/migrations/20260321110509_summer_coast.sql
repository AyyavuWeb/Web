-- Create database
CREATE DATABASE IF NOT EXISTS ayyavu_construction;
USE ayyavu_construction;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    details TEXT,
    location VARCHAR(255),
    price VARCHAR(100),
    status ENUM('ongoing', 'completed', 'upcoming') DEFAULT 'ongoing',
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Insert sample projects
INSERT INTO projects (title, description, details, location, price, status, image) VALUES
('Luxury Villa Complex', 'Modern residential complex with premium amenities and contemporary design.', 'A state-of-the-art residential development featuring 50 luxury villas with modern amenities, landscaped gardens, and premium finishes.', 'Coimbatore, Tamil Nadu', '₹2,50,00,000', 'completed', 'sample1.jpg'),
('Commercial Plaza', 'Multi-story commercial building with retail and office spaces.', 'A 10-story commercial complex featuring retail spaces on ground floor and premium office spaces on upper floors with modern facilities.', 'Chennai, Tamil Nadu', '₹5,00,00,000', 'ongoing', 'sample2.jpg'),
('Industrial Warehouse', 'Large-scale industrial facility for manufacturing and storage.', 'A 50,000 sq ft industrial warehouse with modern loading facilities, climate control, and advanced security systems.', 'Bangalore, Karnataka', '₹3,75,00,000', 'upcoming', 'sample3.jpg');

-- Insert sample images for projects
INSERT INTO project_images (project_id, image) VALUES
(1, 'sample1.jpg'),
(1, 'sample1_2.jpg'),
(2, 'sample2.jpg'),
(2, 'sample2_2.jpg'),
(3, 'sample3.jpg'),
(3, 'sample3_2.jpg');