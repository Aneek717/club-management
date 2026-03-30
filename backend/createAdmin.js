const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB...');
    
    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@club.com',
      password: 'Admin@123',
      role: 'admin'
    });
    
    await admin.save();
    console.log('✓ Admin created successfully!');
    console.log('-------------------------------------------');
    console.log('Email: admin@club.com');
    console.log('Password: Admin@123');
    console.log('-------------------------------------------');
    console.log('You can now login to the admin dashboard');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createAdmin();
