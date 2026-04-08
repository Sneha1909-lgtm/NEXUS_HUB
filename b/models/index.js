const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

let sequelize;

const isLocal = process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1' || !process.env.DATABASE_URL;

if (isLocal) {
  // 100% Reliable Local Connection
  sequelize = new Sequelize(
    process.env.DB_NAME || 'nexus_erp',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        // Explicitly ensuring NO SSL for local development
      }
    }
  );
  console.log('✅ Connecting to Local PostgreSQL (SSL: Disabled)');
} else {
  // Cloud (Railway) Connection
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
  console.log('✅ Connecting to Cloud PostgreSQL (SSL: Enabled)');
}







const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, DataTypes);
db.Course = require('./Course')(sequelize, DataTypes);
db.Student = require('./Student')(sequelize, DataTypes);
db.Subject = require('./Subject')(sequelize, DataTypes);
db.Attendance = require('./Attendance')(sequelize, DataTypes);
db.Mark = require('./Mark')(sequelize, DataTypes);
db.Timetable = require('./Timetable')(sequelize, DataTypes);
db.Fee = require('./Fee')(sequelize, DataTypes);
db.Payment = require('./Payment')(sequelize, DataTypes);
db.Document = require('./Document')(sequelize, DataTypes);
db.Complaint = require('./Complaint')(sequelize, DataTypes);
db.Announcement = require('./Announcement')(sequelize, DataTypes);

db.Lesson = require('./Lesson')(sequelize, DataTypes);
db.Enrollment = require('./Enrollment')(sequelize, DataTypes);
db.Assignment = require('./Assignment')(sequelize, DataTypes);
db.Submission = require('./Submission')(sequelize, DataTypes);


// Relationships
db.User.hasOne(db.Student, { foreignKey: 'userId' });
db.Student.belongsTo(db.User, { foreignKey: 'userId' });

db.Course.hasMany(db.Student, { foreignKey: 'courseId' });
db.Student.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Course.hasMany(db.Subject, { foreignKey: 'courseId' });
db.Subject.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Student.hasMany(db.Attendance, { foreignKey: 'studentId' });
db.Attendance.belongsTo(db.Student, { foreignKey: 'studentId' });

db.Subject.hasMany(db.Attendance, { foreignKey: 'subjectId' });
db.Attendance.belongsTo(db.Subject, { foreignKey: 'subjectId' });

// LMS Integration
db.Course.hasMany(db.Lesson, { foreignKey: 'courseId' });
db.Lesson.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Student.hasMany(db.Enrollment, { foreignKey: 'studentId' });
db.Enrollment.belongsTo(db.Student, { foreignKey: 'studentId' });

db.Course.hasMany(db.Enrollment, { foreignKey: 'courseId' });
db.Enrollment.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Student.hasMany(db.Submission, { foreignKey: 'studentId' });
db.Submission.belongsTo(db.Student, { foreignKey: 'studentId' });

db.Lesson.hasMany(db.Submission, { foreignKey: 'lessonId' });
db.Submission.belongsTo(db.Lesson, { foreignKey: 'lessonId' });

db.Course.hasMany(db.Assignment, { foreignKey: 'courseId' });
db.Assignment.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Assignment.hasMany(db.Submission, { foreignKey: 'assignmentId' });
db.Submission.belongsTo(db.Assignment, { foreignKey: 'assignmentId' });

// Mark & Timetable
db.Student.hasMany(db.Mark, { foreignKey: 'studentId' });
db.Mark.belongsTo(db.Student, { foreignKey: 'studentId' });

db.Subject.hasMany(db.Mark, { foreignKey: 'subjectId' });
db.Mark.belongsTo(db.Subject, { foreignKey: 'subjectId' });

db.Course.hasMany(db.Timetable, { foreignKey: 'courseId' });
db.Timetable.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Subject.hasMany(db.Timetable, { foreignKey: 'subjectId' });
db.Timetable.belongsTo(db.Subject, { foreignKey: 'subjectId' });

db.Student.hasOne(db.Fee, { foreignKey: 'studentId' });
db.Fee.belongsTo(db.Student, { foreignKey: 'studentId' });

db.Fee.hasMany(db.Payment, { foreignKey: 'feeId' });
db.Payment.belongsTo(db.Fee, { foreignKey: 'feeId' });

db.Student.hasMany(db.Document, { foreignKey: 'studentId' });
db.Document.belongsTo(db.Student, { foreignKey: 'studentId' });

db.User.hasMany(db.Complaint, { foreignKey: 'userId' });
db.Complaint.belongsTo(db.User, { foreignKey: 'userId' });

db.Announcement.belongsTo(db.User, { foreignKey: 'authorId' });

module.exports = db;

