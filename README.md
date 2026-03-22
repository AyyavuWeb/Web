# Ayyavu Construction Website

A professional construction company website with admin panel for project management.

## Features

- **Frontend:**
  - Responsive design
  - Project showcase with filtering
  - About us page
  - Contact page
  - Project details modal

- **Admin Panel:**
  - Secure login (password: 12345)
  - Add/Edit/Delete projects
  - Image upload and management
  - Project status management

## Setup Instructions

1. **Database Setup:**
   - Import the `database.sql` file into your MySQL database
   - Update database credentials in `config.php` if needed

2. **File Permissions:**
   - Ensure `admin/uploads/` directory has write permissions (755 or 777)

3. **Admin Access:**
   - Navigate to `/admin/login.php`
   - Password: `12345`

## File Structure

```
/
├── index.php              # Homepage
├── projects.php           # Projects listing
├── about.html            # About page
├── contact.html          # Contact page
├── config.php            # Database configuration
├── get_project.php       # API for project details
├── database.sql          # Database schema and sample data
├── admin/
│   ├── login.php         # Admin login
│   ├── dashboard.php     # Admin dashboard
│   ├── add-project.php   # Add new project
│   ├── edit-project.php  # Edit projects list
│   ├── update-project.php # Update specific project
│   ├── insert_project.php # Handle project insertion
│   ├── delete_image.php  # Delete project images
│   └── uploads/          # Image upload directory
└── assets/
    └── images/           # Static images
```

## Security Features

- SQL injection protection with prepared statements
- File upload validation
- Admin session management
- Secure image upload handling

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For technical support, contact the development team.