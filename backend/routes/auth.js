const express = require('express');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const router = express.Router();

// Student Signup
router.post('/signup/student', async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, phone, skills, bio } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const student = new Student({
      name,
      email,
      password,
      dateOfBirth,
      phone,
      skills: skills || [],
      bio: bio || '',
    });

    await student.save();

    // Store user info in session
    req.session.user = {
      id: student._id,
      email: student.email,
      name: student.name,
      role: 'student',
    };

    res.status(201).json({
      message: 'Student registered successfully',
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
});

// Student Login
router.post('/login/student', async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store user info in session
    req.session.user = {
      id: student._id,
      email: student.email,
      name: student.name,
      role: 'student',
    };

    res.json({
      message: 'Login successful',
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Admin Login
router.post('/login/admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store user info in session
    req.session.user = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: 'admin',
    };

    res.json({
      message: 'Login successful',
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
