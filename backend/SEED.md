# Admin Seed Script

This script can be used to create an admin account in the database (optional).

Run this in Node.js to create your first admin:

```javascript
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Change these details
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', // Will be hashed automatically
      role: 'admin'
    });
    
    await admin.save();
    console.log('Admin created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
```

Steps to use:
1. Create a file `seed.js` in backend folder
2. Copy the code above
3. Update admin details
4. Run: `node seed.js`
5. Your admin account is ready to use
