# Push Your Code to GitHub - Step by Step

## Important: This is the First Step!

Everything starts with getting your code on GitHub. Render will pull from there.

---

## Step 1: Create GitHub Account & Repository

### Create Account (if you don't have one)
1. Go to https://github.com/signup
2. Sign up with email
3. Verify email
4. Confirm you can log in

### Create New Repository
1. Go to https://github.com/new
2. Repository name: **`club-management`**
3. Description: "Club Management System - MERN"
4. Visibility: **PUBLIC** (very important!)
5. Click **"Create repository"**

You'll see a page with commands. Keep this open.

---

## Step 2: Install Git (Windows)

If Git isn't installed:
1. Go to https://git-scm.com/download/win
2. Download and run installer
3. Use default options
4. Close and reopen PowerShell

Test: Run `git --version` in PowerShell

---

## Step 3: Configure Git (First Time Only)

Run in PowerShell:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
```

(Use your real name and email)

---

## Step 4: Navigate to Your Project

```powershell
cd "c:\Users\aneek\OneDrive\Desktop\New folder (3)"
```

Verify you see `backend` and `frontend` folders:
```powershell
ls
```

---

## Step 5: Initialize Git Repo

```powershell
git init
```

This creates a hidden `.git` folder.

---

## Step 6: Add All Files

```powershell
git add .
```

This stages all files for commit.

---

## Step 7: Make First Commit

```powershell
git commit -m "Initial commit - club management system ready for production"
```

You should see output like:
```
[main (root-commit) abc123de] Initial commit
 X files changed, Y insertions(+)
```

---

## Step 8: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/club-management.git
```

Example: If your GitHub username is "john_doe":
```powershell
git remote add origin https://github.com/john_doe/club-management.git
```

---

## Step 9: Set Main Branch

```powershell
git branch -M main
```

---

## Step 10: Push to GitHub

```powershell
git push -u origin main
```

It will ask for authentication:
- Username: Your GitHub username
- Password: **NOT your GitHub password!** Generate a token:

### Generate Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Token name: `deployment-token`
4. Check: `repo` checkbox
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Paste as password in PowerShell

After authentication, you should see:
```
✓ Uploading files...
branch 'main' set up to track 'origin/main'.
```

---

## Verify It Worked

1. Go to https://github.com/YOUR_USERNAME/club-management
2. Verify you see:
   - `backend` folder
   - `frontend` folder
   - `README.md`
   - All other files

If you see them: ✅ **Success!**

---

## If You Get Errors

### Error: "directory not empty"
- Make sure you're in the right folder (has `backend` and `frontend`)
- Run: `ls` to verify

### Error: "Permission denied"
- Reopen PowerShell as Administrator
- Run commands again

### Error: "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/club-management.git
```

### Error: "nothing to commit"
```powershell
git status
# See what files are there
git add .
git commit -m "First commit"
```

---

## Now You're Ready for Render!

Once you see your files on GitHub, proceed to:
1. **RENDER_DEPLOYMENT_GUIDE.md** - Follow the backend/frontend deployment steps

---

## Troubleshooting Commands

```powershell
# Check git status
git status

# View all commits
git log --oneline

# Check remote URL
git remote -v

# See what's staged
git diff --cached
```

---

## After First Push

For future updates (after making code changes):

```powershell
git add .
git commit -m "Update description of what changed"
git push origin main
```

Render will automatically detect the new push and redeploy!

---

**You're ready! 🚀 Push your code to GitHub now!**
