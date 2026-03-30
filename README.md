# Club Management System

A full-stack MERN application for managing student clubs with role-based authentication, club browsing, and admin management features.

## Features

### Student Dashboard
- Browse available clubs with detailed information
- Apply to multiple clubs with one-click signup
- Track application status (pending, accepted, rejected)
- Reapply to clubs after rejection or removal
- View removal dates when removed from accepted clubs
- Responsive design for mobile and desktop

### Admin Dashboard
- Review student applications with complete student information
- Accept or reject applications with custom notifications
- View club members with skills and details
- Remove students from clubs with confirmation dialogs
- Manage club information
- Track membership changes with timestamps

### Authentication
- Session-based authentication with bcryptjs password hashing
- Student signup and login
- Admin login
- Secure password storage
- 24-hour session expiry

### UI/UX Enhancements
- Custom modal popups (no browser alerts) with animations
- Smooth page transitions and entrance animations
- Ripple effects on buttons and hover states
- Gradient-based professional design
- Responsive layout for all device sizes
- Accessibility-friendly components

## Tech Stack

- **Frontend**: React 18, React Router v6, Axios, CSS3 Animations
- **Backend**: Node.js, Express.js, Middleware pattern
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express-session with bcryptjs
- **Session Storage**: MongoDB (connect-mongo)
- **HTTP Client**: Axios with credentials

## Project Structure

```
club-management-system/
├── backend/
│   ├── models/           # Mongoose schemas (Student, Admin, Club)
│   ├── routes/           # API endpoints (auth, student, admin)
│   ├── config/           # Database configuration
│   ├── server.js         # Express server with security settings
│   ├── .env              # Environment variables (production)
│   ├── .env.example      # Template for environment variables
│   ├── package.json
│   ├── createAdmin.js    # Script to create admin account
│   ├── addClubs.js       # Script to seed sample clubs
│   └── clearStudents.js  # Script to clear student data
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Modal, UI components
│   │   ├── pages/        # Auth, StudentDashboard, AdminDashboard
│   │   ├── styles/       # CSS with @keyframes animations
│   │   ├── context/      # AuthContext for state management
│   │   └── App.js        # Main app with routing
│   ├── public/           # Static files
│   └── package.json
│
├── README.md                    # This file
└── PRODUCTION_DEPLOYMENT.md     # Production deployment guide
```

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- MongoDB 4.4+ (local or MongoDB Atlas)
- Modern web browser

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```env
MONGODB_URI=mongodb://localhost:27017/club-management
SESSION_SECRET=your_session_secret_key_2024
NODE_ENV=production
PORT=5000
CORS_ORIGIN=http://localhost:3000
BEHIND_PROXY=false
```

4. Start backend server:
```bash
npm start
```

Backend will be available at `http://localhost:5000/api/health`

#### Initial Setup Scripts

**Create Admin Account:**
```bash
node createAdmin.js
```
**Credentials**: admin@club.com / Admin@123

**Add Sample Clubs:**
```bash
node addClubs.js
```
(Adds 8 sample clubs: Photography, Music, Coding, Sports, Drama, Debate, Environmental, Chess)

**Clear Student Data:**
```bash
node clearStudents.js
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## Database Models

### Student Schema
- Email (unique), password (hashed), full name
- Phone, age, skills (array)
- Applied clubs with status, timestamps, and removal tracking
- Removal dates for tracking when student was removed from club

### Admin Schema
- Email (unique), password (hashed)
- Role identifier

### Club Schema
- Name, category, description
- Requirements, active status
- Current members array
- Max members limit
- Created by (admin reference)

## API Endpoints

### Authentication
- `POST /api/auth/student-signup` - Student registration
- `POST /api/auth/student-login` - Student login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout

### Student
- `GET /api/student/clubs` - Get all clubs
- `POST /api/student/apply-club` - Apply to a club
- `GET /api/student/applications` - Get student's applications

### Admin
- `GET /api/admin/applications` - View all applications
- `POST /api/admin/accept-application` - Accept application
- `POST /api/admin/reject-application` - Reject application
- `GET /api/admin/clubs` - Get all clubs
- `GET /api/admin/club-members` - Get club members
- `POST /api/admin/remove-member` - Remove student from club

## Development

### Available Scripts

**Backend:**
```bash
npm start              # Start development server with nodemon
node createAdmin.js    # Create admin account
node addClubs.js       # Seed sample clubs
node clearStudents.js  # Clear all student data
```

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Create optimized production build
npm test           # Run tests
```

## Production Deployment

### Quick Production Build

**Frontend Build:**
```bash
cd frontend
npm run build
# Output in frontend/build directory
```

**Backend Production:**
```bash
# Update .env for production
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
SESSION_SECRET=your_strong_random_secret
CORS_ORIGIN=https://yourdomain.com

# Start backend
cd backend
npm install --production
npm start
```

### Deployment Platforms Supported

- Heroku (with Procfile)
- AWS EC2, ECS, Lambda
- DigitalOcean App Platform
- Vercel (frontend only)
- Netlify (frontend only)
- Docker deployment
- Traditional VPS/dedicated servers

For detailed deployment guide, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

## Security Features

✅ Passwords hashed with bcryptjs (10 salt rounds)
✅ Session-based authentication with httpOnly cookies
✅ CORS restricted to configured origin
✅ Secure session storage in MongoDB
✅ XSS prevention through React
✅ CSRF protection via SameSite cookies
✅ SQL injection prevention through Mongoose
✅ Environment variables for sensitive data
✅ Proxy support for reverse proxy setups
✅ Error handling without exposing stack traces in production

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Chrome
- Mobile Safari

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change PORT in .env or terminate existing process
```

**MongoDB connection fails:**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env is correct
- For MongoDB Atlas, verify network access rules

**CORS errors:**
- Check frontend URL matches CORS_ORIGIN in .env
- Ensure backend is running

### Frontend Issues

**Blank page or won't load:**
- Check browser console for errors (F12)
- Verify backend is running on port 5000
- Clear browser cache: Ctrl+Shift+Delete

**Cannot login:**
- Run `node createAdmin.js` to create admin account
- Check password is correct (case-sensitive)
- Verify MongoDB has data

**No clubs showing:**
- Run `node addClubs.js` to seed clubs
- Check MongoDB connection

## Performance Optimization

### Frontend
- ✅ Production build with minification
- ✅ Code splitting with React Router
- ✅ CSS animations use GPU acceleration
- ✅ Images optimized
- ✅ Lazy loading routes

### Backend
- ✅ Gzip compression
- ✅ MongoDB indexing on frequently queried fields
- ✅ Efficient query selection
- ✅ Session caching

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Make changes and test
4. Commit: `git commit -m 'Add YourFeature'`
5. Push: `git push origin feature/YourFeature`
6. Open Pull Request

## License

MIT License - Free for personal and commercial use

## Author

Built with ❤️ for club management

---

**Version**: 1.0.0 Production Ready  
**Last Updated**: March 2026  
**Status**: ✅ Production Ready
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation & Setup

#### 1. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and preferences
# MONGODB_URI=mongodb://localhost:27017/club-management
# SESSION_SECRET=your_secret_key
# PORT=5000
```

#### 2. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install
```

### Running the Application

**Terminal 1 - Start MongoDB:**
```bash
mongod
```

**Terminal 2 - Start Backend Server:**
```bash
cd backend
npm run dev
```

Backend will be running on `http://localhost:5000`

**Terminal 3 - Start Frontend Development Server:**
```bash
cd frontend
npm start
```

Frontend will open at `http://localhost:3000`

## 📝 Database Schema

### Student Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  dateOfBirth: Date,
  phone: String,
  skills: [String],
  bio: String,
  appliedClubs: [
    {
      clubId: ObjectId (ref: Club),
      status: enum['pending', 'accepted', 'rejected'],
      appliedAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: enum['admin', 'super_admin'],
  createdAt: Date,
  updatedAt: Date
}
```

### Club Model
```javascript
{
  name: String,
  description: String,
  category: String,
  requiredSkills: [String],
  maxMembers: Number (optional),
  currentMembers: [ObjectId] (ref: Student),
  createdBy: ObjectId (ref: Admin),
  image: String (optional),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

1. User selects role (Student/Admin) on home page
2. Routes to appropriate login or signup page
3. Credentials sent to backend for verification
4. Session created and stored in MongoDB
5. Session cookie sent to frontend
6. User redirected to dashboard
7. All subsequent requests include session cookie automatically

## 🌐 API Endpoints Overview

### Authentication
- `POST /api/auth/signup/student` - Student registration
- `POST /api/auth/login/student` - Student login
- `POST /api/auth/login/admin` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Student APIs
- `GET /api/student/clubs` - Get all clubs
- `POST /api/student/apply-club` - Apply to club
- `GET /api/student/my-applications` - Get applications
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile

### Admin APIs
- `GET /api/admin/applications` - Get pending applications
- `POST /api/admin/accept-application` - Accept application
- `POST /api/admin/reject-application` - Reject application
- `GET /api/admin/clubs` - Get all clubs
- `POST /api/admin/clubs` - Create club
- `PUT /api/admin/clubs/:clubId` - Update club

## 🎨 UI Features

- Clean, modern gradient-based design
- Responsive grid layouts for clubs and applications
- Real-time status updates
- Intuitive navigation between dashboards
- Status badges for application tracking
- Skill tags display

## 📋 Sample Workflow

### Student
1. Sign up with profile details
2. View available clubs
3. Apply to interested clubs
4. Check application status
5. Update profile if needed

### Admin
1. Login to dashboard
2. View pending applications with student details
3. Review applicant's information
4. Accept or reject application
5. View club members and details

## 🔧 Configuration

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/club-management
SESSION_SECRET=your_session_secret_key_here
NODE_ENV=development
PORT=5000
```

### Frontend
Proxy is set in `package.json` to `http://localhost:5000`

## 🐛 Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running
- **CORS Error**: Verify backend is running on port 5000
- **Session Not Persisting**: Check MongoDB connection and session store
- **Port Already in Use**: Change port in .env or kill process on that port

## 📚 Future Enhancements

- Email notifications for application updates
- File uploads for profile pictures and documents
- Club calendar and events management
- Student ratings and reviews
- Advanced search and filtering
- Payment integration for premium clubs
- Real-time notifications
- Admin analytics dashboard

## 📄 License

MIT

## 👥 Support

For issues or questions, please check the README files in individual folder (backend/README.md and frontend/README.md)
