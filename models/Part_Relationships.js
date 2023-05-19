const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Part_Relationships extends Model {}

Part_Relationships.init(
  {
    rel_type: {
      type: DataTypes.STRING(1),
    },
    child_part_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'parts',
        key: 'part_num',
      },
    },
    parent_part_num: {
      type: DataTypes.STRING(20),
      references: {
        model: 'parts',
        key: 'part_num',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'part_relationships',
  }
);

module.exports = Part_Relationships;
