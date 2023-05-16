const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory_Parts extends Model { }

Inventory_Parts.init(
	{
		inventory_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'inventories',
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
		is_spare: {
			type: DataTypes.BOOLEAN,
			default: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'inventory_parts',
	}
);

module.exports = Inventory_Parts;
