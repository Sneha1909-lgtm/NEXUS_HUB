const express = require('express');
const router = express.Router();
const { Student, Course, Subject } = require('../models');

// Get Academic Details
router.get('/:id/academic', async (req, res) => {
  try {
    const student = await Student.findOne({ 
      where: { userId: req.params.id },
      include: [{ model: Course, include: [Subject] }]
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
