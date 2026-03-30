const express = require('express');
const Student = require('../models/Student');
const Club = require('../models/Club');
const { studentMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all clubs
router.get('/clubs', studentMiddleware, async (req, res) => {
  try {
    const clubs = await Club.find({ isActive: true }).populate('createdBy', 'name email');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error: error.message });
  }
});

// Apply to a club
router.post('/apply-club', studentMiddleware, async (req, res) => {
  try {
    const { clubId } = req.body;
    const studentId = req.session.user.id;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if already applied with pending or accepted status (and not removed)
    const existingApplication = student.appliedClubs.find(
      (application) => application.clubId.toString() === clubId
    );

    // Prevent applying if pending or accepted and NOT removed
    if (existingApplication && (existingApplication.status === 'pending' || (existingApplication.status === 'accepted' && !existingApplication.removedAt))) {
      return res.status(400).json({ message: 'Already applied to this club' });
    }

    // If previously rejected, update the status to pending
    if (existingApplication && existingApplication.status === 'rejected') {
      existingApplication.status = 'pending';
      await student.save();
      return res.json({ message: 'Reapplied to club successfully' });
    }

    // If removed from club (accepted but has removedAt), allow reapplication
    if (existingApplication && existingApplication.status === 'accepted' && existingApplication.removedAt) {
      existingApplication.status = 'pending';
      existingApplication.removedAt = null;
      await student.save();
      return res.json({ message: 'Reapplied to club successfully' });
    }

    // New application
    student.appliedClubs.push({
      clubId,
      status: 'pending',
    });

    await student.save();

    res.json({ message: 'Applied to club successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error applying to club', error: error.message });
  }
});

// Get student applications
router.get('/my-applications', studentMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.session.user.id).populate('appliedClubs.clubId');
    res.json(student.appliedClubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get student profile
router.get('/profile', studentMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.session.user.id).select('-password');
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update student profile
router.put('/profile', studentMiddleware, async (req, res) => {
  try {
    const { name, phone, skills, bio } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.session.user.id,
      { name, phone, skills, bio },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
