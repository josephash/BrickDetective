const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Part_Categories extends Model {}

Part_Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'part_categories',
  }
);

module.exports = Part_Categories;
