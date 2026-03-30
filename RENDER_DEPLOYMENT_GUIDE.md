# Complete Render Deployment Guide for MERN Club Management System

## Prerequisites
- GitHub account (free)
- Render account (free at render.com)
- Your project code pushed to GitHub
- MongoDB Atlas account (already have - cloud database)

---

## PHASE 1: GitHub Setup (Required for Render)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create repository name: `club-management`
3. Make it **Public** (Render needs to access it)
4. Click "Create repository"

### Step 2: Push Your Code to GitHub

Run these commands in your project root (`New folder (3)`):

```bash
# Initialize git and add remote
git init
git add .
git commit -m "Initial club management system commit"
git remote add origin https://github.com/YOUR_USERNAME/club-management.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

Verify: Go to your GitHub repo and confirm all files are uploaded.

---

## PHASE 2: Deploy Backend to Render

### Step 3: Create Backend Service on Render

1. Go to https://render.com and sign up (free)
2. Click **"New+"** → **"Web Service"**
3. Select **"Connect a repository"**
4. Search for `club-management` and connect it
5. Fill in the form:

   | Field | Value |
   |-------|-------|
   | **Name** | `club-mgmt-backend` |
   | **Environment** | `Node` |
   | **Region** | `Singapore` (or closest to you) |
   | **Branch** | `main` |
   | **Build Command** | `cd backend && npm install` |
   | **Start Command** | `cd backend && npm start` |
   | **Instance Type** | `Free` |

6. Click **"Create Web Service"**

### Step 4: Configure Backend Environment Variables

1. On the Render dashboard, go to your backend service
2. Click **"Environment"** tab
3. Add these variables:

   ```
   MONGODB_URI=mongodb+srv://aneekdestiny_db_user:HMLbjcpuo3fy0D0h@cluster0.3yhufbe.mongodb.net/club-management?retryWrites=true&w=majority&appName=Cluster0
   
   SESSION_SECRET=club_management_session_secret_production_2024
   
   NODE_ENV=production
   
   PORT=10000
   
   CORS_ORIGIN=https://YOUR_FRONTEND_URL.onrender.com
   
   BEHIND_PROXY=true
   ```

4. Click **"Save Changes"**

⏳ **Wait 5-10 minutes** for the backend to build and deploy.

### Step 5: Get Your Backend URL

After deployment, you'll see a URL like:
```
https://club-mgmt-backend.onrender.com
```

**Save this URL** - you'll need it for the frontend.

---

## PHASE 3: Deploy Frontend to Render

### Step 6: Create Frontend Service on Render

1. Click **"New+"** → **"Web Service"**
2. Connect to the same `club-management` repository
3. Fill in the form:

   | Field | Value |
   |-------|-------|
   | **Name** | `club-mgmt-frontend` |
   | **Environment** | `Node` |
   | **Region** | `Singapore` (same as backend) |
   | **Branch** | `main` |
   | **Build Command** | `cd frontend && npm install && npm run build` |
   | **Start Command** | `cd frontend && npm start` |
   | **Instance Type** | `Free` |

4. Click **"Create Web Service"**

### Step 7: Configure Frontend Environment Variables

1. Go to your frontend service
2. Click **"Environment"** tab
3. Add this variable:

   ```
   REACT_APP_API_URL=https://club-mgmt-backend.onrender.com
   ```

   (Use the backend URL you got from Step 5)

4. Click **"Save Changes"**

⏳ **Wait 10-15 minutes** for the frontend to build and deploy.

---

## PHASE 4: Verify Deployment

### Step 8: Test Your Live Website

1. Go to your Render dashboard
2. Find your frontend service
3. Click on the URL (something like `https://club-mgmt-frontend.onrender.com`)

**Test these steps:**

✓ Can you see the role selection page?
✓ Can you sign up as a student?
✓ Can you log in?
✓ Can you see the 8 clubs?
✓ Can you apply to clubs?

### Step 9: Admin Testing

1. Try logging in as **Admin**:
   - Email: `admin@club.com`
   - Password: `Admin@123`

2. Can you see Applications tab?
3. Can you accept/reject applications?

---

## PHASE 5: Troubleshooting

### Backend Won't Deploy

Check these in order:
1. Click backend service → "Logs" tab
2. Look for red error messages
3. Common issues:
   - MongoDB URI wrong → Update in Environment variables
   - PORT mismatch → Should be 10000 for Render free tier
   - Node version → Render uses latest by default (fine)

### Frontend Shows "API Error"

1. Open browser DevTools (F12)
2. Check Console for error messages
3. Most common: `REACT_APP_API_URL` not set correctly
   - Should match your backend URL exactly
4. Re-deploy frontend after fixing (Render will auto-redeploy)

### Redirect Issues / 404 Pages

The frontend `server.js` handles this. It's already configured.

### Stuck on "Pages loading..."

1. Hard refresh: **Ctrl+Shift+R** (or Cmd+Shift+R)
2. Clear browser cache and cookies
3. Check backend is running (visit health endpoint)

---

## PHASE 6: Custom Domain (Optional)

### Add Your Own Domain

1. Go to frontend service → Settings
2. Look for "Custom Domain"
3. Add your domain (requires DNS configuration)
4. Follow Render's instructions

---

## PHASE 7: Monitor Your Deployment

### View Logs

1. Click any service → "Logs" tab
2. Scroll to see real-time errors
3. Check daily to spot issues

### Set Up Auto-Deploy

Render auto-deploys when you push to GitHub. To test:
1. Make a small change to your code
2. Commit and push: `git push origin main`
3. Watch Render dashboard auto-rebuild

---

## Important Information

### Backend URL Format
```
https://club-mgmt-backend.onrender.com
```

### Frontend URL Format
```
https://club-mgmt-frontend.onrender.com
```

### Database
✓ Already in MongoDB Atlas (no changes needed)

### Session Storage
✓ Automatically stored in MongoDB (configured)

### CORS
✓ Backend CORS_ORIGIN points to frontend URL

### SSL/HTTPS
✓ Automatic with Render (free)

---

## Summary Checklist

- [ ] Push code to GitHub
- [ ] Create backend service on Render
- [ ] Set backend environment variables
- [ ] Wait for backend to deploy
- [ ] Create frontend service on Render
- [ ] Set frontend environment variables (with backend URL)
- [ ] Wait for frontend to deploy
- [ ] Test all features on live URL
- [ ] Test admin login and functionality
- [ ] Bookmark your live URLs
- [ ] Share with team/users!

---

## Support

**If something goes wrong:**
1. Check Render Logs (Logs tab on each service)
2. Verify all environment variables are set
3. Confirm GitHub repo has latest code
4. Try redeploying: Settings → "Redeploy latest commit"

**Backend URL needed for frontend:** Copy from Render dashboard after backend deploys
**Frontend URL needed for CORS:** Copy from Render dashboard after frontend deploys

---

## Final Notes

- Free tier on Render: Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- For production use: Upgrade to paid tier ($7/month per service)
- MongoDB Atlas free tier: Supports up to 3 clusters, perfect for this project

**Your website is now LIVE!** 🚀
