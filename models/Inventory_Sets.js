const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Inventory_Sets extends Model {}

Inventory_Sets.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventories',
        key: 'id',
      },
    },
    set_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'sets',
        key: 'set_num',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'inventory_sets',
  }
);

module.exports = Inventory_Sets;
