const express = require('express');
const router = express.Router();
const { Student, Course, Enrollment, Attendance } = require('../models');

// Mock Data Synthesis for Institutional DTO
router.get('/student', (req, res) => {
  res.json({
    attendancePercentage: 88,
    feeDue: 15400,
    coursesEnrolled: 6,
    completionPercentage: 65,

    erp: {
      attendanceSummary: [
        { subject: 'DBMS', percentage: 92 },
        { subject: 'Java Synth', percentage: 85 },
        { subject: 'Logic Ops', percentage: 78 },
        { subject: 'Structural Math', percentage: 95 }
      ],
      recentResults: [
        { subject: 'System Arch', marks: 88, grade: 'A' },
        { subject: 'Data Flow', marks: 92, grade: 'A+' },
        { subject: 'Neural Nets', marks: 75, grade: 'B' }
      ],
      timetable: [
        { time: '09:00 - 10:00', subject: 'DBMS Lab', room: 'L-401' },
        { time: '10:00 - 11:00', subject: 'Java Synth', room: 'A-202' },
        { time: '11:15 - 12:15', subject: 'Structural Math', room: 'H-105' }
      ]
    },

    lms: {
      courses: [
        { name: 'Fullstack Node Synthesis', progress: 80, color: '#ef4444' },
        { name: 'Advanced React Logic', progress: 45, color: '#6366f1' },
        { name: 'PostgreSQL Architecture', progress: 60, color: '#10b981' }
      ],
      pendingAssignments: [
        { title: 'Database Normalization Hub', due: '2 Days', priority: 'High' },
        { title: 'React Performance Audit', due: '4 Days', priority: 'Medium' }
      ]
    },

    notifications: [
      { id: 1, text: 'Tuition Fee Seq-02 Deadline: Tomorrow', type: 'URGENT' },
      { id: 2, text: 'New Course: AI Ethics available in Global Node', type: 'INFO' },
      { id: 3, text: 'Attendance below threshold in Logic Ops', type: 'ALARM' }
    ]
  });
});

// Student Dashboard Endpoint
router.get('/student', async (req, res) => {
  try {
    const student = await Student.findOne({ 
        where: { userId: 3 }, // Hardcoded for demo/student1, normally from req.user
        include: [{ model: Enrollment, include: [Course] }, { model: Attendance }] 
    });

    if (!student) return res.status(404).json({ error: 'Student not found' });

    const coursesEnrolled = student.Enrollments.length;
    const attendancePercentage = student.Attendances.length > 0 
        ? Math.round((student.Attendances.filter(a => a.status === 'PRESENT').length / student.Attendances.length) * 100)
        : 85;

    res.json({
      attendancePercentage,
      completionPercentage: 65, // Needs actual calculation logic
      coursesEnrolled,
      cgpa: 8.42, // Mocked for now, needs Mark calculation
      mastery: student.Enrollments.map(e => ({
        name: e.Course.name,
        progress: e.progress
      })),
      results: [
        { subject: 'React Sync', grade: 'A+', marks: '94/100' },
        { subject: 'DBMS Logic', grade: 'A', marks: '88/100' }
      ],
      timeline: [
        { time: '09:00 - 10:00', title: 'React Performance Lab', location: 'L-401', active: true },
        { time: '11:00 - 12:00', title: 'DBMS Schema Workshop', location: 'A-202', active: false }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Faculty Dashboard Endpoint
router.get('/faculty', (req, res) => {
  res.json({
    totalStudents: 156,
    activeCourses: 4,
    averageAttendance: 82,
    pendingGrades: 12,
    performance: [
      { course: 'Adv Web Systems', presence: 84, assignments: '12/14' },
      { course: 'Node Architecture', presence: 76, assignments: '10/12' }
    ],
    metrics: {
      feedback: '4.85/5',
      authored: 18,
      citations: 142,
      industrySync: '98%'
    }
  });
});

// Admin Dashboard Endpoint
router.get('/admin', (req, res) => {
  res.json({
    totalUsers: 2450,
    systemUptime: '99.9%',
    activeLogins: 420,
    pendingRequests: 8,
    topology: [
      { name: 'ERP Hub Alpha', load: '12%', status: 'Optimal' },
      { name: 'LMS Knowledge Stream', load: '84%', status: 'Load Warning' },
      { node: 'Auth Gateway Secure', load: '05%', status: 'Optimal' }
    ],
    auditLogs: [
      { event: 'New Admin Identification: ADMIN_SEC_01', time: '4m ago' },
      { event: 'LMS Storage Matrix expansion success', time: '1h ago' },
      { event: 'Security block: Attempted intrusion', time: '5h ago' }
    ]
  });
});

module.exports = router;
