const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Inventory_Minifigs extends Model {}

Inventory_Minifigs.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventories',
        key: 'id',
      },
    },
    fig_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'minifigs',
        key: 'fig_num',
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
    modelName: 'inventory_minifigs',
  }
);

module.exports = Inventory_Minifigs;
