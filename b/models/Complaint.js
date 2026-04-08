module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('OPEN', 'CLOSED'), defaultValue: 'OPEN' },
  });
  return Complaint;
};
