const express = require('express');
const router = express.Router();
const { Course, Assignment, Enrollment, Student, Submission, Attendance, Subject } = require('../models');

// 1. Global Knowledge Registry (Course Explorer)
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course registry' });
  }
});

// 2. Personal Asset Registry (My Courses)
router.get('/my-courses/:studentId', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { studentId: req.params.studentId },
      include: [Course]
    });
    
    const courses = enrollments.map(e => ({
      ...e.Course.toJSON(),
      progress: e.progress,
      status: e.status
    }));
    
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personal assets' });
  }
});

// 3. Task Vault (Assignments)
router.get('/assignments/:studentId', async (req, res) => {
  try {
    // Fetch all assignments for courses the student is enrolled in
    const enrollments = await Enrollment.findAll({
        where: { studentId: req.params.studentId },
        attributes: ['courseId']
    });
    const courseIds = enrollments.map(e => e.courseId);

    const assignments = await Assignment.findAll({
      where: { courseId: courseIds },
      include: [Course]
    });
    
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task vault' });
  }
});

// 4. Presence Telemetry (Attendance)
router.get('/attendance/:studentId', async (req, res) => {
    try {
        const attendance = await Attendance.findAll({
            where: { studentId: req.params.studentId },
            include: [Subject]
        });
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch presence telemetry' });
    }
});

module.exports = router;
