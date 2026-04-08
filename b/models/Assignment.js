module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    deadline: { type: DataTypes.DATE, allowNull: false },
    priority: { type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'), defaultValue: 'Medium' },
    status: { type: DataTypes.ENUM('ACTIVE', 'ARCHIVED', 'DRAFT'), defaultValue: 'ACTIVE' },
  });
  return Assignment;
};
