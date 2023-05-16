const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Elements extends Model {}

Elements.init(
  {
    element_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    part_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'parts',
        key: 'part_num',
      },
    },
    color_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'colors',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'elements',
  }
);

module.exports = Elements;
