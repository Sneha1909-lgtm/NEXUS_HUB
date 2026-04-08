const bcrypt = require('bcryptjs');
const { sequelize, User, Course, Student, Subject } = require('./models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin
    await User.create({ username: 'admin', password: hashedPassword, role: 'ADMIN' });

    // Create Course
    const course = await Course.create({ name: 'Computer Science & Engineering' });

    // Create Subjects
    await Subject.create({ name: 'Operating Systems', courseId: course.id });
    await Subject.create({ name: 'Database Systems', courseId: course.id });

    // Create Student User
    const studentUser = await User.create({ username: 'student1', password: hashedPassword, role: 'STUDENT' });
    await Student.create({ name: 'John Doe', branch: 'CSE', userId: studentUser.id, courseId: course.id });

    // Create Faculty User
    await User.create({ username: 'faculty1', password: hashedPassword, role: 'FACULTY' });

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
