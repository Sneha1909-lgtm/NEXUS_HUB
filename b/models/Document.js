module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    name: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
  });
  return Document;
};
