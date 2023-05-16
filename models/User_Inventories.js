const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User_Inventories extends Model {}

User_Inventories.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
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
    modelName: 'user_inventories',
  }
);

module.exports = User_Inventories;
