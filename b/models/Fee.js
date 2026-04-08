module.exports = (sequelize, DataTypes) => {
  const Fee = sequelize.define('Fee', {
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'UNPAID' },
  });
  return Fee;
};
