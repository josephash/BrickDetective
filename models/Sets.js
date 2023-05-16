const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sets extends Model {}

Sets.init(
  {
    set_num: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    theme_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'themes',
        key: 'id',
      },
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
    modelName: 'sets',
  }
);

module.exports = Sets;
