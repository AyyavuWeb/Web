# Supabase Migration & Setup Guide

Your Ayyavu Construction application is **100% on Supabase**! This guide will help you complete the final setup and understand your modern, scalable architecture.

## ✅ What's Already Done

### 1. Database Schema (✅ Complete)
- [x] PostgreSQL database created
- [x] `projects` table with RLS enabled
- [x] `project_images` table with RLS enabled
- [x] Foreign key constraints
- [x] Automatic timestamps (created_at, updated_at)
- [x] Cascade deletes on project removal

### 2. Row Level Security (✅ Configured)
```sql
-- Public can view all projects
CREATE POLICY "Anyone can view projects" ON projects FOR SELECT TO public USING (true);

-- Public can view all images
CREATE POLICY "Anyone can view project images" ON project_images FOR SELECT TO public USING (true);

-- Only authenticated users can modify data
-- (Create, Update, Delete policies in place)
```

### 3. Application Code (✅ Complete)
- [x] React frontend with Vite
- [x] Supabase client library integrated
- [x] Authentication ready (email/password)
- [x] All API calls through Supabase SDK
- [x] Environment variables configured

## ⚠️ What You Need To Do (15 minutes)

### Step 1: Create Supabase Storage Bucket

**Why needed:** Store project images in the cloud

**Steps:**

1. Open your **Supabase Dashboard**
2. Go to **Storage** (sidebar → Storage)
3. Click **"Create a new bucket"**
4. Configure:
   - **Name:** `project-images`
   - **Public bucket:** Toggle ON (green)
   - **File size limit:** Leave default (100 MB)
5. Click **"Create bucket"**

**Verify:**
- Bucket appears in storage list
- Bucket shows as "Public"
- You can access it

### Step 2: Set Up Storage Policies

**Why needed:** Control who can upload/delete images

**Steps:**

1. Click on `project-images` bucket
2. Go to **Policies** tab
3. Click **"New policy"**
4. Select **"For public users"** → **"SELECT"**
5. Edit policy SQL:

```sql
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');
```

6. Click **"Review"** → **"Save policy"**
7. Repeat for authenticated uploads:
   - **"For authenticated users"** → **"INSERT"**

```sql
CREATE POLICY "Authenticated can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-images');
```

8. And for deletions:
   - **"For authenticated users"** → **"DELETE"**

```sql
CREATE POLICY "Authenticated can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'project-images');
```

**Verify:**
- 3 policies appear in Policies tab
- All are "enabled"
- Names match above

### Step 3: Create Admin User

**Why needed:** To access admin panel and manage projects

**Steps:**

1. Open **Supabase Dashboard**
2. Go to **Authentication** (sidebar)
3. Click **"Users"** tab
4. Click **"Add user"**
5. Choose **"Create new user"**
6. Fill in:
   - **Email:** `admin@ayyavuconstruction.com` (or your choice)
   - **Password:** Create a strong password
   - **Auto confirm user:** Toggle ON
7. Click **"Create user"**
8. **Save the password securely!**

**Verify:**
- User appears in Users list
- Email is confirmed (checkmark)
- User shows as active

**Test:**
1. Go to your app at `/admin/login`
2. Enter the email and password
3. Should redirect to dashboard

### Step 4: Migrate Existing Data (If You Have Any)

**If you have existing projects in MySQL:**

1. Export from old database:
```bash
# On your old server with MySQL
mysqldump -u user -p database projects > projects.sql
mysqldump -u user -p database project_images > images.sql
```

2. Import to Supabase:
   - Go to Supabase Dashboard → SQL Editor
   - Create new query
   - Paste your data SQL
   - Run query

Or use the Data Transfer Tool:
   - Supabase Dashboard → Migrations
   - New Migration
   - Follow the wizard

### Step 5: Verify Everything Works

**Test the public site:**
```bash
npm run dev
```

- [ ] Homepage loads without errors
- [ ] All pages accessible
- [ ] No console errors
- [ ] Images load correctly

**Test the admin panel:**
- [ ] Navigate to `/admin/login`
- [ ] Login with your admin credentials
- [ ] Dashboard loads
- [ ] Can add a test project
- [ ] Can upload images
- [ ] Can edit/delete projects

**Test from different devices:**
- [ ] Works on mobile
- [ ] Works on tablet
- [ ] Works on desktop

## 🏗️ Your Supabase Architecture

### Tables

**projects**
```
id (UUID, auto-generated)
title (text) - Project name
description (text) - Short description
details (text) - Full details
status (text) - ongoing | completed | upcoming
location (text) - Project address
price (text) - Budget/price
image (text) - Main image URL
created_at (timestamp) - Auto-generated
updated_at (timestamp) - Auto-updated
```

**project_images**
```
id (UUID, auto-generated)
project_id (UUID) - Reference to projects
image (text) - Image URL
created_at (timestamp) - Auto-generated
```

### Storage

**project-images bucket**
- Stores all project photos
- Public read access
- Authenticated write/delete access
- CDN delivery for fast loading

### Authentication

**Supabase Auth**
- Email/password authentication
- Session management via JWT
- Row Level Security integration
- Admin user management

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled:
- **Public users:** Can only READ projects
- **Authenticated users:** Can CREATE, UPDATE, DELETE
- **Everyone:** Cannot access data they shouldn't

### Authentication
- Passwords hashed securely
- JWT tokens for sessions
- Environment variables protect API keys
- No credentials exposed to frontend

### Data Protection
- Cascade deletes (delete project → delete images)
- Foreign key constraints
- Type safety (PostgreSQL)
- Automatic backups (Supabase)

## 📊 Monitoring & Analytics

### View Database Activity
1. Supabase Dashboard → Database
2. Check table sizes and row counts
3. Monitor storage usage

### Check Authentication
1. Supabase Dashboard → Authentication → Users
2. See login history
3. Monitor user activity

### Review API Usage
1. Supabase Dashboard → Project Settings
2. See API call statistics
3. Monitor bandwidth usage

## 🚀 Scaling Considerations

### What's Included (Supabase Free Tier)
- ✅ 500 MB database space
- ✅ 1 GB bandwidth/month
- ✅ 100 concurrent connections
- ✅ 5 concurrent functions
- ✅ Unlimited API calls

### When to Upgrade
- Database grows > 500 MB
- Project images > 1 GB/month
- More than 100 users
- Need 24/7 support

### Scaling Steps
1. Go to Supabase Dashboard
2. Click "Upgrade plan"
3. Choose Pro or Team plan
4. No code changes needed!

## 💾 Backup & Disaster Recovery

### Automatic Backups
- Supabase auto-backups daily
- Kept for 7 days (Pro: 30 days)
- Point-in-time recovery available

### Manual Backups
1. Go to Supabase Dashboard → Settings → Backups
2. Click "Request backup"
3. Download backup file when ready
4. Keep in secure location

### Restore from Backup
1. Contact Supabase Support if needed
2. Or restore locally and migrate data

## 📝 Common Tasks

### Add a New Project (Admin)
1. Login to `/admin/login`
2. Click "Add Property"
3. Fill form details
4. Upload images
5. Submit

### Update Project Data
1. Go to `/admin/edit-projects`
2. Click project "Edit"
3. Modify fields
4. Update images
5. Save

### Delete Images
1. Edit project
2. Click X on image
3. Confirm deletion
4. Image removed from storage + database

### View Database Content
1. Supabase Dashboard → Table Editor
2. Select `projects` table
3. Browse all projects
4. View/edit directly (advanced)

### Export Data
1. Supabase Dashboard → Table Editor
2. Select table
3. Click menu → Export as CSV/JSON
4. Save file

## 🔧 Troubleshooting

### "Storage bucket not found" error
- Verify bucket exists in Storage
- Check bucket name is `project-images`
- Verify bucket is public

### "Unauthorized to upload images" error
- Check authenticated user is logged in
- Verify storage policies are set
- Clear browser cache and try again

### "Cannot login to admin panel"
- Verify admin user exists in Auth → Users
- Check email/password are correct
- Verify user is "confirmed"

### "Projects not displaying"
- Check RLS policy allows SELECT
- Verify projects exist in database
- Check Network tab for API errors
- Look at browser console for errors

### "Slow image loading"
- Images should load from CDN (fast)
- Check if bucket is public
- Verify image URLs are correct
- Try in incognito mode

## 📚 Useful Links

**Supabase Documentation:**
- [Database Guide](https://supabase.com/docs/guides/database)
- [Authentication](https://supabase.com/docs/guides/auth)
- [Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

**JavaScript Client:**
- [@supabase/supabase-js](https://supabase.com/docs/reference/javascript)

## ✨ Next Steps

1. ✅ Create storage bucket
2. ✅ Set up storage policies
3. ✅ Create admin user
4. ✅ Test the application
5. ✅ Add your projects
6. 🚀 Deploy to production

## 📞 Support

**Supabase Issues:**
- Dashboard → Help & Support
- Community forums
- Email support (paid plans)

**Application Issues:**
- Check browser console
- Review Supabase logs
- Check documentation files
- Test locally with `npm run dev`

---

**Your Supabase setup is production-ready!** 🎉

All your data is secure, scalable, and backed up automatically. You can now focus on managing your projects through the admin panel.
