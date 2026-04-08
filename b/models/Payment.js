module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    method: { type: DataTypes.STRING },
  });
  return Payment;
};
