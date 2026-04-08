module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: { type: DataTypes.STRING, allowNull: false },
    instructor: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    complexity: { type: DataTypes.ENUM('Core', 'Standard', 'Advanced', 'Experimental'), defaultValue: 'Core' },
    image: { type: DataTypes.STRING },
    rating: { type: DataTypes.FLOAT, defaultValue: 4.5 },
    studentsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT },
  });
  return Course;
};
