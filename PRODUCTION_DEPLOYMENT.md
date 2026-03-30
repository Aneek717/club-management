# Club Management System - Production Deployment Guide

## Overview
This guide outlines how to deploy the Club Management System to production.

---

## Prerequisites
- Node.js 14+ and npm
- MongoDB instance (MongoDB Atlas or self-hosted)
- A server/hosting platform (Heroku, AWS, Azure, DigitalOcean, etc.)
- SSL certificate for HTTPS

---

## Backend Production Setup

### 1. Environment Variables
Create a `.env` file in the backend directory with production values:

```env
# Database - Use production MongoDB URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/club-management

# Strong session secret (generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=your_very_strong_random_32_character_string_here

# Production mode
NODE_ENV=production

# Server Port
PORT=5000

# CORS - Your frontend domain
CORS_ORIGIN=https://yourdomain.com

# Proxy settings
BEHIND_PROXY=true
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Start Backend Server
```bash
npm start
```

Server will run on the port specified in .env (default: 5000)

---

## Frontend Production Setup

### 1. Build Optimized Production Bundle
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

### 2. Serve Production Build
Option A: Using serve package:
```bash
npm install -g serve
serve -s build -l 3000
```

Option B: Using Express to serve:
```bash
npm install express
# Add server.js in frontend root with content below:
```

**server.js** (if using Express):
```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Frontend server running on port 3000');
});
```

---

## Nginx Configuration (Reverse Proxy)

If using Nginx to proxy both frontend and backend:

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  
  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  # SSL certificates
  ssl_certificate /path/to/certificate.crt;
  ssl_certificate_key /path/to/private.key;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;

  # Frontend
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # API Backend
  location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## Deployment to Popular Platforms

### Heroku Deployment

1. **Install Heroku CLI** and login
2. **Create Procfile** in backend root:
```
web: npm start
```

3. **Deploy**:
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### AWS EC2 Deployment

1. Launch Ubuntu EC2 instance
2. SSH into instance and setup:
```bash
sudo apt update
sudo apt install nodejs npm mongodb-org

# Clone your repo
git clone your-repo-url
cd your-repo/backend
npm install
npm start
```

3. For frontend, deploy to S3 + CloudFront or use EC2

### Docker Deployment

**Dockerfile (backend)**:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://mongodb:27017/club-management
      NODE_ENV: production

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## Security Checklist

- [ ] Use HTTPS/SSL in production
- [ ] Set strong SESSION_SECRET (32+ characters)
- [ ] Configure CORS to only allow your frontend domain
- [ ] Use environment variables for all sensitive data
- [ ] Enable MongoDB authentication with strong passwords
- [ ] Set NODE_ENV=production
- [ ] Disable debug logging in production
- [ ] Use HTTPS for database connections
- [ ] Implement rate limiting on API endpoints
- [ ] Set secure cookies (httpOnly, secure, sameSite)
- [ ] Regularly update dependencies: `npm audit fix`
- [ ] Monitor error logs and performance

---

## Performance Optimization

### Backend
- Use CDN for static assets
- Enable gzip compression
- Set up database indexing
- Implement caching strategies
- Monitor API response times

### Frontend
- Create production build (done with `npm run build`)
- Enable Gzip compression
- Minimize and uglify code (automatic with build)
- Cache static assets
- Lazy load routes and components
- Use CDN for distribution

---

## Monitoring & Maintenance

1. **Logs**: Check application logs regularly
2. **Database**: Monitor MongoDB storage and performance
3. **Uptime**: Use monitoring services (UptimeRobot, New Relic)
4. **Performance**: Track response times and error rates
5. **Updates**: Keep dependencies updated (`npm outdated`)
6. **Backups**: Regular MongoDB backups

---

## Troubleshooting

### Connection Refused
- Check if backend is running on correct port
- Verify CORS_ORIGIN matches frontend URL
- Check firewall rules

### Database Connection Failed
- Verify MONGODB_URI is correct
- Check MongoDB service is running
- Verify network access rules (MongoDB Atlas)

### Build Fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 14+)
- Check for syntax errors in code

---

## Next Steps

1. Set up monitoring and alerting
2. Plan database backup strategy
3. Set up CI/CD pipeline for automated deployments
4. Implement analytics
5. Plan scaling strategy

