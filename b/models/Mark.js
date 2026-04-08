module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    marks: { type: DataTypes.INTEGER, allowNull: false },
    grade: { type: DataTypes.STRING },
  });
  return Mark;
};
