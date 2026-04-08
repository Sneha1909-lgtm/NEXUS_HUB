const express = require('express');
const router = express.Router();
const { Attendance, Subject } = require('../models');

// Get Attendance for Student
router.get('/student/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      where: { studentId: req.params.id },
      include: [Subject]
    });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark Attendance (Faculty)
router.post('/', async (req, res) => {
  const { studentId, subjectId, status, date } = req.body;
  try {
    const record = await Attendance.create({ studentId, subjectId, status, date });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
