const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Minifigs extends Model {}

Minifigs.init(
  {
    fig_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(256),
    },
    num_parts: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'minifigs',
  }
);

module.exports = Minifigs;
