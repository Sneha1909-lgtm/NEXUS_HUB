module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    enrollmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    progress: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: 'ENROLLED' },
  });
  return Enrollment;
};
