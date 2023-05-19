const { Model, DataTypes } = require('sequelize');
const { sequelize, connection } = require('../config/connection');

class Colors extends Model { }

Colors.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(200),
		},
		rgb: {
			type: DataTypes.STRING(6),
		},
		is_trans: {
			type: DataTypes.BOOLEAN,
			default: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'colors',
	}
);

module.exports = Colors;
