# Ayyavu Construction Website

A modern construction company website built with React and Supabase.

## Features

- **Public Website:**
  - Homepage with company overview
  - Projects showcase with filtering
  - About us page
  - Contact form
  - Responsive design

- **Admin Panel:**
  - Secure authentication
  - Add/Edit/Delete projects
  - Image upload and management
  - Project status management

## Tech Stack

- **Frontend:** React 18, Vite
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Routing:** React Router

## Setup Instructions

### 1. Environment Variables

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Setup

1. **Create Storage Bucket:**
   - Go to Supabase Dashboard → Storage
   - Create bucket named `project-images`
   - Make it public

2. **Add Storage Policies:**
   ```sql
   -- Allow public to view images
   CREATE POLICY "Public can view images"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'project-images');

   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated can upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'project-images');

   -- Allow authenticated users to delete
   CREATE POLICY "Authenticated can delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (bucket_id = 'project-images');
   ```

3. **Create Admin User:**
   - Go to Authentication → Users
   - Add user with email/password
   - Auto-confirm the user

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── admin/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── AddProject.jsx
│       ├── EditProjects.jsx
│       └── UpdateProject.jsx
├── lib/
│   └── supabase.js
├── App.jsx
└── main.jsx
```

## Database Schema

The project uses two main tables:

- `projects` - Main project information
- `project_images` - Project image gallery

## Admin Access

Navigate to `/admin/login` and use the credentials you created in Supabase Auth.

## Deployment

This project can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Bolt Hosting

Make sure to set the environment variables in your deployment platform.

## Support

For setup help, refer to the documentation files:
- `START_HERE.md`
- `FINAL_SETUP_STEPS.md`
- `SUPABASE_COMPLETE_GUIDE.md`