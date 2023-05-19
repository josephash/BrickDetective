const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Parts extends Model {}

Parts.init(
  {
    part_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(250),
    },
    part_cat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'part_categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'parts',
  }
);

module.exports = Parts;
