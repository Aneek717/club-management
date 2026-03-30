const express = require('express');
const Club = require('../models/Club');
const Student = require('../models/Student');
const { adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all pending applications
router.get('/applications', adminMiddleware, async (req, res) => {
  try {
    const students = await Student.find({ 'appliedClubs.status': 'pending' }).select('-password');
    
    // Format response to show pending applications
    const applications = [];
    students.forEach((student) => {
      student.appliedClubs.forEach((app) => {
        if (app.status === 'pending') {
          applications.push({
            applicationId: app._id,
            studentId: student._id,
            studentName: student.name,
            studentEmail: student.email,
            dateOfBirth: student.dateOfBirth,
            phone: student.phone,
            skills: student.skills,
            bio: student.bio,
            clubId: app.clubId,
            appliedAt: app.appliedAt,
          });
        }
      });
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get single application details
router.get('/applications/:studentId/:clubId', adminMiddleware, async (req, res) => {
  try {
    const { studentId, clubId } = req.params;
    const student = await Student.findById(studentId).populate('appliedClubs.clubId');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const application = student.appliedClubs.find(
      (app) => app.clubId._id.toString() === clubId
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        phone: student.phone,
        skills: student.skills,
        bio: student.bio,
      },
      club: application.clubId,
      status: application.status,
      appliedAt: application.appliedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

// Accept application
router.post('/accept-application', adminMiddleware, async (req, res) => {
  try {
    const { studentId, clubId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update application status
    const application = student.appliedClubs.find(
      (app) => app.clubId.toString() === clubId
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'accepted';
    await student.save();

    // Add student to club's members
    await Club.findByIdAndUpdate(
      clubId,
      { $addToSet: { currentMembers: studentId } },
      { new: true }
    );

    res.json({ message: 'Application accepted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting application', error: error.message });
  }
});

// Reject application
router.post('/reject-application', adminMiddleware, async (req, res) => {
  try {
    const { studentId, clubId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update application status
    const application = student.appliedClubs.find(
      (app) => app.clubId.toString() === clubId
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'rejected';
    await student.save();

    res.json({ message: 'Application rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting application', error: error.message });
  }
});

// Create a new club
router.post('/clubs', adminMiddleware, async (req, res) => {
  try {
    const { name, description, category, requiredSkills, maxMembers, image } = req.body;

    const club = new Club({
      name,
      description,
      category,
      requiredSkills: requiredSkills || [],
      maxMembers: maxMembers || null,
      image: image || '',
      createdBy: req.session.user.id,
    });

    await club.save();

    res.status(201).json({
      message: 'Club created successfully',
      club,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating club', error: error.message });
  }
});

// Get all clubs
router.get('/clubs', adminMiddleware, async (req, res) => {
  try {
    const clubs = await Club.find().populate('createdBy', 'name email').populate('currentMembers', 'name email');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error: error.message });
  }
});

// Update club
router.put('/clubs/:clubId', adminMiddleware, async (req, res) => {
  try {
    const { name, description, category, requiredSkills, maxMembers, image, isActive } = req.body;

    const club = await Club.findByIdAndUpdate(
      req.params.clubId,
      { name, description, category, requiredSkills, maxMembers, image, isActive },
      { new: true }
    );

    res.json({ message: 'Club updated successfully', club });
  } catch (error) {
    res.status(500).json({ message: 'Error updating club', error: error.message });
  }
});

// Get club members
router.get('/clubs/:clubId/members', adminMiddleware, async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId).populate('currentMembers');
    res.json(club.currentMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club members', error: error.message });
  }
});

// Remove student from club
router.post('/remove-member', adminMiddleware, async (req, res) => {
  try {
    const { clubId, studentId } = req.body;

    // Remove student from club's currentMembers
    await Club.findByIdAndUpdate(
      clubId,
      { $pull: { currentMembers: studentId } },
      { new: true }
    );

    // Update student's application to track removal
    const student = await Student.findById(studentId);
    if (student) {
      const applicationIndex = student.appliedClubs.findIndex(
        (app) => app.clubId.toString() === clubId
      );
      if (applicationIndex !== -1) {
        // Set removedAt timestamp but keep status as "accepted"
        student.appliedClubs[applicationIndex].removedAt = new Date();
        await student.save();
      }
    }

    res.json({ message: 'Student removed from club successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing student', error: error.message });
  }
});

module.exports = router;
