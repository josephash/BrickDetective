const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Themes extends Model {}

Themes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    parent_id: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'themes',
  }
);

module.exports = Themes;
