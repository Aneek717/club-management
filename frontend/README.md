# Club Management System - Frontend

A React-based frontend for the Club Management System with role-based routing for student and admin dashboards.

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Auth.js        # Authentication pages
│   │   ├── StudentDashboard.js
│   │   └── AdminDashboard.js
│   ├── components/        # Reusable components
│   │   └── PrivateRoute.js
│   ├── context/           # React context
│   │   └── AuthContext.js
│   ├── styles/            # CSS files
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Auth.css
│   │   ├── StudentDashboard.css
│   │   └── AdminDashboard.css
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

**Development mode:**
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

### Role Selection
- Choose between Student or Admin role on the landing page
- Routes to appropriate login/signup page based on selection

### Student Dashboard
- **View Available Clubs**: Browse all active clubs with descriptions and required skills
- **Apply to Clubs**: Submit applications to join clubs
- **View Applications**: Check application status (pending, accepted, rejected)
- **Manage Profile**: Update name, phone, skills, and bio

### Admin Dashboard
- **Review Applications**: View pending student applications with full details
- **Accept/Reject**: Make decisions on student applications
- **Manage Clubs**: View and manage club information
- **Track Members**: See current club membership

## Authentication Flow

1. User lands on role selection page
2. Chooses Student or Admin
3. Routes to login/signup page
4. Session-based authentication via backend
5. Redirected to appropriate dashboard on successful login
6. Can logout which clears session

## API Integration

The frontend communicates with the backend at `http://localhost:5000`. Make sure:
- Backend is running on port 5000
- CORS is properly configured
- Credentials are included in requests

## Environment Setup

The `package.json` includes a `proxy` field set to `http://localhost:5000`, which automatically forwards API requests to the backend during development.

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Routing
- **axios** - HTTP requests
- **react-scripts** - Build tools

## Notes

- All API requests include credentials for session management
- PrivateRoute component protects authenticated routes
- Role-based access control is enforced via AuthContext
- Sessions persist across page refreshes (until logout)
