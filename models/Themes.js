const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Themes extends Model {}

Themes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'themes',
        key: 'id',
      },
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
