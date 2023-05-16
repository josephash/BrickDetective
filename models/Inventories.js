const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventories extends Model {}

Inventories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    version: {
      type: DataTypes.INTEGER,
    },
    set_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'sets',
        key: 'set_num',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inventories',
  }
);

module.exports = Inventories;
