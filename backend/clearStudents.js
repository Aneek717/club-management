// Script to clear all student data from database
const mongoose = require('mongoose');
require('dotenv').config();
const Student = require('./models/Student');

async function clearStudentData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/club_management');
    console.log('✓ Connected to MongoDB');

    const result = await Student.deleteMany({});
    console.log(`\n✓ Successfully deleted ${result.deletedCount} student records`);
    console.log('✓ Student database cleared');

    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing student data:', error.message);
    process.exit(1);
  }
}

clearStudentData();
