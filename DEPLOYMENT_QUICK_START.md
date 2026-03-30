# Render Deployment Checklist

## Pre-Deployment (Do This First)

- [ ] **Have GitHub account** (sign up at https://github.com if needed)
- [ ] **Have Render account** (sign up at https://render.com if needed)
- [ ] **MongoDB Atlas configured** (already done - verified with 8 clubs in database)
- [ ] **Local testing complete** (website works on localhost:3001)
- [ ] **Admin account created** (admin@club.com / Admin@123)

## Step 1: Push Code to GitHub (5 minutes)

**Your Project Root:** `C:\Users\aneek\OneDrive\Desktop\New folder (3)`

Run in PowerShell at that location:

```powershell
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Club management system - ready for production"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/club-management.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:** Visit https://github.com/YOUR_USERNAME/club-management and confirm files appear

---

## Step 2: Deploy Backend (10 minutes)

On **Render.com**:

1. Click **"New Web Service"** → **"Connect Repository"**
2. Select **"club-management"** repository
3. Fill form:
   - Name: `club-mgmt-backend`
   - Environment: `Node`
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm start`
   - Instance: `Free`
4. Click **"Create Web Service"**
5. Go to **Environment** tab and add variables:

```
MONGODB_URI=mongodb+srv://aneekdestiny_db_user:HMLbjcpuo3fy0D0h@cluster0.3yhufbe.mongodb.net/club-management?retryWrites=true&w=majority&appName=Cluster0

SESSION_SECRET=club_management_session_secret_production_2024

NODE_ENV=production

PORT=10000

CORS_ORIGIN=https://YOUR_FRONTEND_URL.onrender.com

BEHIND_PROXY=true
```

6. **Save Changes**
7. ⏳ **Wait 5-10 minutes** for deployment
8. **Copy the URL** when it says "Live" (looks like: `https://club-mgmt-backend.onrender.com`)

---

## Step 3: Deploy Frontend (15 minutes)

On **Render.com**:

1. Click **"New Web Service"** → **"Connect Repository"** (same repo)
2. Fill form:
   - Name: `club-mgmt-frontend`
   - Environment: `Node`
   - Build: `cd frontend && npm install && npm run build`
   - Start: `cd frontend && npm start`
   - Instance: `Free`
3. Click **"Create Web Service"**
4. Go to **Environment** tab and add:

```
REACT_APP_API_URL=https://club-mgmt-backend.onrender.com
```

(Use backend URL from Step 2)

5. **Save Changes**
6. ⏳ **Wait 10-15 minutes** for deployment

---

## Step 4: Testing (5 minutes)

When frontend shows "Live":

1. Visit your frontend URL (check Render dashboard)
2. **Test Student Flow:**
   - [ ] Sign up with new email
   - [ ] See 8 clubs displayed ✓
   - [ ] Apply to a club ✓
   - [ ] See application in "My Applications" ✓
   - [ ] Logout ✓

3. **Test Admin Flow:**
   - [ ] Login: `admin@club.com` / `Admin@123` ✓
   - [ ] See Applications tab ✓
   - [ ] Accept/reject application ✓
   - [ ] see accepted student in Applications ✓
   - [ ] See "Members" tab with student list ✓

If all work: ✅ **DEPLOYMENT COMPLETE!**

---

## Emergency Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't deploy | Check Logs tab for errors; verify MONGODB_URI is correct |
| Frontend shows blank | Hard refresh (Ctrl+Shift+R); check browser console (F12) |
| "Cannot reach API" | Verify REACT_APP_API_URL matches backend URL exactly |
| Admin login fails | Verify admin@club.com exists (should be in database) |
| Long load times | Normal for free tier (cold start = 20-30 seconds) |
| "Service unavailable" | Free tier spins down after 15min inactivity; first request wakes it up |

---

## Important URLs to Save

**Backend:** `https://club-mgmt-backend.onrender.com`
**Frontend:** `https://club-mgmt-frontend.onrender.com`
**Database:** Connected to MongoDB Atlas (no changes needed)

---

## Next Steps (Optional)

- **Upgrade for Always-On:** Pay $7/month per service to prevent cold starts
- **Add Custom Domain:** Settings → Custom Domain (requires DNS configuration)
- **Invite Users:** Share your frontend URL with others to start using the system
- **Monitor:** Check Logs tab weekly for errors

---

## Files Already Ready for Deployment

✓ Backend has `server.js` configured for production
✓ Frontend has `server.js` configured for production
✓ `.env` files with all configuration
✓ Docker files (bonus, not needed for Render)
✓ Environment variables documented

**You're all set! 🚀**

Good luck with your deployment! Ask if you hit any issues.
