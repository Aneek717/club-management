# Club Management System - Backend

A Node.js and Express backend for the Club Management System using MongoDB for data persistence and session-based authentication.

## Project Structure

```
backend/
├── models/              # Mongoose schemas
│   ├── Student.js      # Student model
│   ├── Admin.js        # Admin model
│   └── Club.js         # Club model
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── student.js      # Student routes
│   └── admin.js        # Admin routes
├── middleware/         # Custom middleware
│   └── auth.js         # Authentication middleware
├── config/             # Configuration files
│   └── database.js     # MongoDB connection
├── server.js           # Main entry point
├── package.json        # Dependencies
└── .env.example        # Environment variables template
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
MONGODB_URI=mongodb://localhost:27017/club-management
SESSION_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
```

## Running the Server

**Development mode with auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## Database Setup

Make sure MongoDB is running. If using local MongoDB:
```bash
mongod
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup/student` - Student registration
- `POST /login/student` - Student login
- `POST /login/admin` - Admin login
- `POST /logout` - Logout
- `GET /me` - Get current user

### Student Routes (`/api/student`)
- `GET /clubs` - Get all active clubs
- `POST /apply-club` - Apply to a club
- `GET /my-applications` - Get user's applications
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Admin Routes (`/api/admin`)
- `GET /applications` - Get all pending applications
- `GET /applications/:studentId/:clubId` - Get specific application
- `POST /accept-application` - Accept an application
- `POST /reject-application` - Reject an application
- `POST /clubs` - Create a new club
- `GET /clubs` - Get all clubs
- `PUT /clubs/:clubId` - Update club
- `GET /clubs/:clubId/members` - Get club members

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **nodemon** - Development auto-reload

## Notes

- Sessions are stored in MongoDB using `connect-mongo`
- Passwords are hashed using bcryptjs before storage
- Authentication is managed through Express sessions
- CORS is enabled for localhost:3000 (React frontend)
