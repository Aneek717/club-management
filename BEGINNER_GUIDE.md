# 🚀 Complete Beginner Setup Guide

## Step 1: Install MongoDB (Database)

MongoDB is the database where all data (students, clubs, admins) will be stored.

### On Windows:
1. Go to https://www.mongodb.com/try/download/community
2. Choose "Windows" and download the `.msi` file
3. Run the installer and follow the default steps (just click Next → Install)
4. MongoDB will be installed and should start automatically

**To verify MongoDB is running:**
- Open PowerShell and type: `mongosh`
- If you see a `>` prompt, MongoDB is running ✓
- Type `exit` to quit

---

## Step 2: Setup Environment File (.env)

The `.env` file tells your app where the database is and other important settings.

1. Navigate to the backend folder:
```
cd "c:\Users\aneek\OneDrive\Desktop\New folder (3)\backend"
```

2. You'll see a file called `.env.example` - we need to create `.env` from it
3. In PowerShell, run:
```
Copy-Item .env.example .env
```

This creates a `.env` file with default settings. You don't need to change anything if MongoDB is running locally.

---

## Step 3: Create Admin Account

An admin account lets you login to the admin dashboard.

1. In the backend folder, create a new file called `createAdmin.js`
2. Paste this code:

```javascript
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');
    
    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@club.com',
      password: 'Admin@123', // Change this to something secure
      role: 'admin'
    });
    
    await admin.save();
    console.log('✓ Admin created successfully!');
    console.log('Email: admin@club.com');
    console.log('Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
```

3. In PowerShell (in backend folder), run:
```
node createAdmin.js
```

If successful, you'll see: `✓ Admin created successfully!`

---

## Step 4: Start the Backend Server

The backend is the "brain" of your app - it handles all the logic and database operations.

1. Make sure you're in the backend folder
2. In PowerShell, run:
```
npm run dev
```

You should see:
```
Server is running on http://localhost:5000
MongoDB connected successfully
```

**Leave this PowerShell window OPEN** - the server needs to keep running.

---

## Step 5: Install Frontend Dependencies

Open a NEW PowerShell window (don't close the previous one):

1. Navigate to frontend folder:
```
cd "c:\Users\aneek\OneDrive\Desktop\New folder (3)\frontend"
```

2. Install dependencies:
```
npm install
```

Wait for it to complete (this takes a few minutes).

---

## Step 6: Start the Frontend

In the same PowerShell window (frontend folder), run:
```
npm start
```

After a moment, your browser should automatically open showing the app at `http://localhost:3000`

---

## ✓ You're Done! Here's What You Can Do:

### Test Student Account:
1. Click "Student" button
2. Click "Sign up here"
3. Fill in the form with any details (can use fake data)
4. Click "Sign Up"
5. You'll see the Student Dashboard with clubs

### Test Admin Account:
1. Go back (refresh page)
2. Click "Admin" button
3. Use these credentials:
   - Email: `admin@club.com`
   - Password: `Admin@123`
4. You'll see the Admin Dashboard

---

## 🛑 If Something Goes Wrong:

**"MongoDB connection error"**
- Make sure MongoDB is running (open new PowerShell and type `mongosh`)

**"Port 5000 already in use"**
- Close any existing backend server and run again

**"npm: command not found"**
- You need to install Node.js from https://nodejs.org

**"Page won't load at localhost:3000"**
- Make sure backend is running first (should say "Server is running on http://localhost:5000")

---

## 📝 Important Files You Created:

- `backend/.env` - Configuration file (database settings)
- `backend/createAdmin.js` - Admin creation script
- The app automatically creates a MongoDB database called "club-management"

---

## 🎯 Next Steps (Once Everything Works):

- Test creating a student account
- Create multiple clubs (through MongoDB or admin panel)
- Try applying to clubs as a student
- Check applications as an admin
- Accept/reject applications

You can now ask me for help with any specific feature or create test data!
