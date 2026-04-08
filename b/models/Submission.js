module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    marks: { type: DataTypes.INTEGER },
    feedback: { type: DataTypes.TEXT },
    submittedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
  return Submission;
};
