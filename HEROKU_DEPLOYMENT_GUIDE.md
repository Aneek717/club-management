# Deploy to Heroku - Step by Step Guide

## Prerequisites
- GitHub account (for code hosting)
- Heroku account (free at heroku.com)
- Git installed on your computer
- Your MongoDB Atlas connection string ready

---

## STEP 1: Create Heroku Account & Install Heroku CLI

### 1a. Sign Up on Heroku
1. Go to https://www.heroku.com
2. Click "Sign Up"
3. Enter email, choose Node.js as primary language
4. Verify email

### 1b. Install Heroku CLI
**Windows:**
- Download from: https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-x64.exe
- Run the installer
- Restart your terminal/PowerShell

**Verify installation:**
```bash
heroku --version
```

Should show: `heroku/7.x.x ...`

---

## STEP 2: Initialize Git Repository

Open PowerShell in your project root folder:

```bash
cd "c:\Users\aneek\OneDrive\Desktop\New folder (3)"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Club Management System"
```

---

## STEP 3: Login to Heroku

```bash
heroku login
```

This will open your browser to log in. Authorize and return to terminal.

---

## STEP 4: Create Heroku Backend App

```bash
cd backend

# Create backend app on Heroku
heroku create your-app-name-backend

# Or let Heroku generate a name
heroku create
```

**Note:** Replace `your-app-name-backend` with something unique like `club-mgmt-backend` or `aneek-club-backend`

You'll see output like:
```
Creating app... done, ⬢ club-mgmt-backend
https://club-mgmt-backend.herokuapp.com/ | https://git.heroku.com/club-mgmt-backend.git
```

---

## STEP 5: Add Procfile for Backend

Create file `backend/Procfile`:

```
web: npm start
```

(This tells Heroku how to start your backend)

---

## STEP 6: Set Environment Variables on Heroku

```bash
# Make sure you're in backend folder
cd backend

# Set production environment
heroku config:set NODE_ENV=production

# Set MongoDB Atlas URI
heroku config:set MONGODB_URI="mongodb+srv://aneekdestiny_db_user:HMLbjcpuo3fy0D0h@cluster0.3yhufbe.mongodb.net/club-management?retryWrites=true&w=majority&appName=Cluster0"

# Set session secret (change this to something random!)
heroku config:set SESSION_SECRET="your-super-secret-random-string-here-min-32-chars"

# Set CORS origin (we'll update after frontend deployed)
heroku config:set CORS_ORIGIN="*"

# Set port to use Heroku's dynamic port
heroku config:set PORT="5000"

# Enable proxy
heroku config:set BEHIND_PROXY="true"
```

**Verify variables set:**
```bash
heroku config
```

---

## STEP 7: Deploy Backend to Heroku

Make sure you're in `backend` folder:

```bash
# Push to Heroku
git push heroku main

# Note: If your branch is 'master', use: git push heroku master
```

**First deploy takes 2-3 minutes.** Latest lines should show:

```
remote: Pushed to https://club-mgmt-backend.herokuapp.com/
remote: ▁ ▂ ▃ ▄ ▅ ▆ ▇ █ Done in 45.2s
```

**Verify backend is live:**
```bash
heroku open /api/health
```

Should show: `{ "message": "Server is running", "environment": "production", "timestamp": "..." }`

Get your backend URL. Example:
```
https://club-mgmt-backend.herokuapp.com
```

**Copy this URL - you need it for frontend!**

---

## STEP 8: Deploy Frontend to Heroku

Navigate to frontend folder:

```bash
cd ../frontend

# Create frontend Heroku app
heroku create your-app-name-frontend

# Or let Heroku generate a name
heroku create
```

You'll get a URL like: `https://club-mgmt-frontend.herokuapp.com`

---

## STEP 9: Add Heroku Postbuild Script

The frontend needs to build production bundle on Heroku.

Update `frontend/package.json` - find the `"scripts"` section and add `heroku-postbuild`:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "heroku-postbuild": "npm run build"
}
```

---

## STEP 10: Create server.js for Frontend

Create `frontend/server.js`:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
```

---

## STEP 11: Update frontend package.json

Add `express` to start script:

Find `"start"` in `frontend/package.json` and update it:

```json
"start": "node server.js",
```

---

## STEP 12: Add Express to Frontend

```bash
cd frontend

npm install express
```

---

## STEP 13: Create Procfile for Frontend

Create `frontend/Procfile`:

```
web: npm start
```

---

## STEP 14: Update API URL in Frontend

Update `frontend/src/App.js` to use the backend URL:

Find where axios is configured (usually at top of App.js or in a config file) and add:

```javascript
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Or if using Axios instance:

```javascript
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true
});
```

---

## STEP 15: Set Frontend Environment Variables

Make sure you're in `frontend` folder:

```bash
# Set backend API URL (replace with YOUR backend URL)
heroku config:set REACT_APP_API_URL="https://club-mgmt-backend.herokuapp.com"
```

---

## STEP 16: Deploy Frontend

```bash
# Make sure in frontend folder
cd frontend

# Deploy to Heroku
git push heroku main

# Or if branch is master:
# git push heroku master
```

**Wait 3-5 minutes for deployment.**

Latest output should show:
```
remote: Pushed to https://club-mgmt-frontend.herokuapp.com/
```

---

## STEP 17: Verify Deployment

```bash
# Open frontend in browser
heroku open
```

This will open your live app! 🎉

---

## STEP 18: Update Backend CORS

Now that frontend is deployed, update backend CORS to only allow your frontend:

```bash
cd ../backend

# Update CORS origin to your frontend URL
heroku config:set CORS_ORIGIN="https://club-mgmt-frontend.herokuapp.com"
```

Restart backend:
```bash
heroku restart
```

---

## STEP 19: Create Initial Admin Account

You need to create an admin account. Run the script:

```bash
# Navigate to backend
cd backend

# Run admin creation
heroku run "node createAdmin.js"
```

Should output:
```
✓ Admin account created successfully!
Email: admin@club.com
Password: Admin@123
```

---

## STEP 20: Seed Sample Clubs

```bash
heroku run "node addClubs.js"
```

Should output:
```
✓ 8 sample clubs added successfully!
```

---

## Testing Your Live App

1. **Go to:** `https://your-frontend.herokuapp.com`
2. **Login as Student:**
   - Create new account OR
   - See if there's a test student
3. **Login as Admin:**
   - Email: `admin@club.com`
   - Password: `Admin@123`
4. **Test features:**
   - Browse clubs ✓
   - Apply to club ✓
   - Check admin dashboard ✓
   - Accept/reject applications ✓

---

## Useful Heroku Commands

```bash
# View logs
heroku logs --tail

# View specific app logs
heroku logs --tail -a club-mgmt-backend

# View recent logs (last 50 lines)
heroku logs -n 50 -a club-mgmt-backend

# Run one-off command
heroku run "node clearStudents.js"

# Restart app
heroku restart

# List all apps
heroku apps

# Scale dynos (if paid)
heroku scale web=2

# Check app status
heroku status
```

---

## Troubleshooting

### App Won't Start
```bash
heroku logs -a your-app-name
```
Look for error message

### Cannot Connect to Database
- Check MONGODB_URI is correct
- Verify MongoDB Atlas network access allows Heroku IPs
- Go to MongoDB Atlas → Security → Network Access
- Add: `0.0.0.0/0` (opens to all - for testing only)

### CORS Errors in Frontend
- Make sure `CORS_ORIGIN` matches your frontend URL exactly
- Restart backend: `heroku restart -a your-backend-name`

### Frontend Shows Blank Page
- Check browser console (F12) for errors
- Verify `REACT_APP_API_URL` points to correct backend
- Check backend is running: `https://your-backend.herokuapp.com/api/health`

### Admin Login Not Working
Run this again:
```bash
cd backend
heroku run "node createAdmin.js"
```

---

## Your URLs After Deployment

**Backend:** `https://club-mgmt-backend.herokuapp.com`
**Frontend:** `https://club-mgmt-frontend.herokuapp.com`

**Database:** MongoDB Atlas (in the cloud)

---

## Next Steps (After Live)

1. ✅ Test all features
2. ✅ Share your app URL with friends
3. ✅ Monitor logs with `heroku logs --tail`
4. ✅ Consider upgrading to paid dyno if traffic increases (free tier sleeps after 30 min inactivity)

---

## Free Heroku Limitations

- App sleeps after 30 min inactivity
- Limited to 1000 free dyno hours/month
- Slower performance than paid

**For production, upgrade to paid dyno ($7/month)**

---

## Git Push Issues (Common)

If you see "failed to push some refs":

```bash
# Force update (only if you're sure)
git push -f heroku main

# Or add all changes first
git add .
git commit -m "Updates"
git push heroku main
```

---

## Your Project Structure (After Deploy)

```
Your Project/
├── backend/           → Deployed to Heroku Backend App
│   ├── Procfile       ✓ Added
│   ├── .env           ✓ Updated with Atlas URI
│   └── server.js      ✓ Ready
│
├── frontend/          → Deployed to Heroku Frontend App
│   ├── Procfile       ✓ Added
│   ├── server.js      ✓ Added
│   ├── package.json   ✓ Updated
│   └── build/         ✓ Auto-built on deploy
│
└── .git/              ✓ Git repository initialized
```

---

**Status:** ✅ **YOUR APP IS LIVE!**

Congratulations! Your club management system is now live on the internet! 🚀

