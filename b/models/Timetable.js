module.exports = (sequelize, DataTypes) => {
  const Timetable = sequelize.define('Timetable', {
    day: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    room: { type: DataTypes.STRING },
  });
  return Timetable;
};
