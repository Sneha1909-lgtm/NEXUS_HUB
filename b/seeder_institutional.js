const bcrypt = require('bcryptjs');
const { 
  sequelize, User, Course, Student, Subject, 
  Assignment, Enrollment, Attendance 
} = require('./models');

const institutionalSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create Identity Nodes
    const admin = await User.create({ username: 'admin', password: hashedPassword, role: 'ADMIN' });
    const faculty = await User.create({ username: 'faculty1', password: hashedPassword, role: 'FACULTY' });
    const studentUser = await User.create({ username: 'student1', password: hashedPassword, role: 'STUDENT' });
    
    // 2. Create Global Knowledge Registry (9 Courses)
    const coursesData = [
      { id: 1, name: 'Full-Stack Web Synthesis', instructor: 'Dr. John Doe', category: 'Computer Science', complexity: 'Core', rating: 4.8, studentsCount: 1200, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80', description: 'Advanced web architecture and neural state propagation.' },
      { id: 2, name: 'Machine Learning Fundamentals', instructor: 'Sarah Smith', category: 'Data Flow', complexity: 'Advanced', rating: 4.9, studentsCount: 850, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', description: 'Deep dive into gradient descent and neural cluster optimization.' },
      { id: 3, name: 'Modern UI/UX Principles', instructor: 'Alex Vance', category: 'Neural Design', complexity: 'Standard', rating: 4.7, studentsCount: 2300, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', description: 'Psychology of haptic feedback and cinematic design systems.' },
      { id: 4, name: 'Ethical Hacking & Sec-Ops', instructor: 'Mark Specter', category: 'Computer Science', complexity: 'Advanced', rating: 4.9, studentsCount: 1500, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', description: 'Institutional penetration testing and security audit protocols.' },
      { id: 5, name: 'Neural Network Architectures', instructor: 'Dr. John Doe', category: 'Neural Design', complexity: 'Experimental', rating: 5.0, studentsCount: 920, image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80', description: 'Experimental backpropagation loops and cognitive node trees.' },
      { id: 6, name: 'Enterprise ERP Management', instructor: 'Prof. Miller', category: 'Management', complexity: 'Core', rating: 4.6, studentsCount: 3100, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', description: 'Logistics matrix routing and ledger synchronization logic.' },
      { id: 7, name: 'Big Data Pipeline Logic', instructor: 'Sarah Smith', category: 'Data Flow', complexity: 'Advanced', rating: 4.8, studentsCount: 640, image: 'https://images.unsplash.com/photo-1558494949-ef010bfccf83?w=800&q=80', description: 'ETL processing clusters and distributed data lake synchronization.' },
      { id: 8, name: 'Global Supply Chain Sync', instructor: 'Alex Rivera', category: 'Management', complexity: 'Standard', rating: 4.7, studentsCount: 1800, image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&q=80', description: 'Optimal pathfinding algorithms for global asset movement.' },
      { id: 9, name: 'Quantum Logic Systems', instructor: 'Dr. Elena Rossi', category: 'Computer Science', complexity: 'Experimental', rating: 5.0, studentsCount: 420, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', description: 'Qubit superposition and Hadamard gate synchronization.' },
    ];

    const courses = await Promise.all(coursesData.map(c => Course.create(c)));

    // 3. Initialize Student Profile
    const student = await Student.create({ 
      name: 'Alpha Tech', 
      branch: 'Computer Science', 
      userId: studentUser.id, 
      courseId: courses[0].id 
    });

    // 4. Personal Asset Registry (Enrolling Student in 6 Courses)
    const enrollmentIds = [1, 2, 3, 4, 5, 6];
    await Promise.all(enrollmentIds.map(cid => 
      Enrollment.create({ studentId: student.id, courseId: cid, status: 'ACTIVE', progress: Math.floor(Math.random() * 80) + 10 })
    ));

    // 5. Task Vault Initializaton (Assignments)
    const assignmentsData = [
      { title: 'Project Sync: Neural Hooks', courseId: 1, deadline: new Date('2024-04-24'), priority: 'High', description: 'Implement NSP in React components.' },
      { title: 'Schema Normalization Protocol', courseId: 2, deadline: new Date('2024-04-20'), priority: 'Normal', description: 'Database design exercise.' },
      { title: 'Cloud Infrastructure Audit', courseId: 3, deadline: new Date('2024-04-28'), priority: 'Medium', description: 'AWS architecting task.' },
      { title: 'Backpropagation Loops Lab', courseId: 4, deadline: new Date('2024-05-02'), priority: 'High', description: 'Neural net training exercise.' },
      { title: 'Penetration Vector Analysis', courseId: 5, deadline: new Date('2024-04-30'), priority: 'Medium', description: 'System security audit.' },
      { title: 'Ledger Synchronization Logic', courseId: 6, deadline: new Date('2024-05-05'), priority: 'Normal', description: 'ERP core sync task.' },
    ];
    await Promise.all(assignmentsData.map(a => Assignment.create(a)));

    // 6. Presence Telemetry (Attendance)
    const subjectsData = [
      { name: 'React Architecture', courseId: 1 },
      { name: 'DBMS Logic', courseId: 2 },
      { name: 'Cloud Arch', courseId: 3 },
      { name: 'Neural Net', courseId: 4 },
      { name: 'Sec-Ops Hub', courseId: 5 },
      { name: 'ERP Master', courseId: 6 },
    ];
    const subjects = await Promise.all(subjectsData.map(s => Subject.create(s)));

    await Promise.all(subjects.map(sub => 
      Attendance.create({ studentId: student.id, subjectId: sub.id, status: 'PRESENT', date: new Date() })
    ));

    console.log('✅ Institutional Database Successfully Synchronized');
    process.exit();
  } catch (err) {
    console.error('❌ Synchronization Failed:', err);
    process.exit(1);
  }
};

institutionalSeed();
