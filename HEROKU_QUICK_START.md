# Heroku Deployment - Quick Reference

## 🚀 Summary of What I've Already Prepared

✅ **Backend:**
- `Procfile` created
- MongoDB Atlas connection configured
- Environment variables ready

✅ **Frontend:**
- `Procfile` created
- `server.js` created to serve production build
- `package.json` updated with express
- Build script ready

✅ **Database:**
- MongoDB Atlas URI configured in `.env`

---

## ⏱️ Quick Deployment (5 Steps)

### Step 1: Initialize Git
```bash
cd "c:\Users\aneek\OneDrive\Desktop\New folder (3)"
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Install Heroku CLI & Login
- Download: https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-x64.exe
- Run installer
- Restart PowerShell
```bash
heroku login
```

### Step 3: Create Backend App
```bash
cd backend
heroku create your-backend-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://aneekdestiny_db_user:HMLbjcpuo3fy0D0h@cluster0.3yhufbe.mongodb.net/club-management?retryWrites=true&w=majority&appName=Cluster0"
heroku config:set SESSION_SECRET="generate-random-string-here-32-chars-min"
heroku config:set CORS_ORIGIN="*"
git push heroku main
```

### Step 4: Create Frontend App
```bash
cd ../frontend
heroku create your-frontend-name
heroku config:set REACT_APP_API_URL="https://your-backend-name.herokuapp.com"
git push heroku main
```

### Step 5: Setup Admin & Clubs
```bash
cd ../backend
heroku run "node createAdmin.js"
heroku run "node addClubs.js"
```

---

## 📋 After Deployment

**Frontend URL:** `https://your-frontend-name.herokuapp.com`
**Backend URL:** `https://your-backend-name.herokuapp.com`

**Default Admin:**
- Email: `admin@club.com`
- Password: `Admin@123`

---

## 🐛 Troubleshooting Commands

```bash
# View logs (shows errors)
heroku logs --tail -a your-app-name

# Check if running
curl https://your-backend.herokuapp.com/api/health

# Restart app
heroku restart -a your-app-name

# View all config variables
heroku config -a your-app-name
```

---

## 📚 Full Guide
See: `HEROKU_DEPLOYMENT_GUIDE.md` for step-by-step details

