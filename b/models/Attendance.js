module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    status: { type: DataTypes.ENUM('PRESENT', 'ABSENT'), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  });
  return Attendance;
};
