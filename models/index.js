const Themes = require('./Themes');
const Sets = require('./Sets');
const Inventories = require('./Inventories');
const Part_Categories = require('./Part_Categories');
const Parts = require('./Parts');
const Colors = require('./Colors');
const Inventory_Parts = require('./Inventory_Parts');
const Part_Relationships = require('./Part_Relationships');
const Elements = require('./Elements');
const Minifigs = require('./Minifigs');
const Inventory_Minifigs = require('./Inventory_Minifigs');
const Inventory_Sets = require('./Inventory_Sets');
const Users = require('./Users');
const User_Inventories = require('./User_Inventories');

// Themes
Themes.hasMany(Sets, {
	foreignKey: 'id',
	onDelete: 'CASCADE',
});
Themes.hasMany(Themes, {
	foreignKey: 'id',
	onDelete: 'CASCADE',
});
Themes.belongsTo(Themes, {
	foreignKey: 'id'
});

// Sets
Sets.hasOne(Inventory_Sets, {
	foreignKey: 'set_num',
	onDelete: 'CASCADE'
});
Sets.hasMany(Inventories, {
	foreignKey: 'set_num',
	onDelete: 'CASCADE'
});
Sets.belongsTo(Themes, {
	foreignKey: 'id'
});

// Inventories
Inventories.hasMany(Inventory_Sets, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
});
Inventories.hasMany(Inventory_Minifigs, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
});
Inventories.hasMany(Inventory_Parts, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
});
Inventories.belongsTo(Sets, {
	foreignKey: 'set_num'
});

// Part_Categories
Part_Categories.hasMany(Parts, {
	foreignKey: 'id'
});

// Parts
Parts.hasMany(Inventory_Parts, {
	foreignKey: 'part_num',
	onDelete: 'CASCADE'
});
Parts.hasMany(Elements, {
	foreignKey: 'part_num',
	onDelete: 'CASCADE'
});
Parts.hasMany(Part_Relationships, {
	foreignKey: 'part_num',
	onDelete: 'CASCADE'
});
Parts.belongsTo(Part_Categories, {
	foreignKey: 'id'
});

// Colors
Colors.hasMany(Inventory_Parts, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
});
Colors.hasMany(Elements, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
});

// Inventory_Parts
Inventory_Parts.belongsTo(Inventories, {
	foreignKey: 'id'
});
Inventory_Parts.belongsTo(Colors, {
	foreignKey: 'id'
});
Inventory_Parts.belongsTo(Parts, {
	foreignKey: 'part_num'
});

// Part_Relationships
Part_Relationships.belongsTo(Parts, {
	foreignKey: 'part_num'
});

// Elements
Elements.belongsTo(Parts, {
	foreignKey: 'part_num'
});
Elements.belongsTo(Colors, {
	foreignKey: 'id'
});

// Minifigs
Minifigs.hasMany(Inventory_Minifigs, {
	foreignKey: 'fig_num',
	onDelete: 'CASCADE'
});

// Inventory_Minifigs
Inventory_Minifigs.belongsTo(Inventories, {
	foreignKey: 'id'
});
Inventory_Minifigs.belongsTo(Minifigs, {
	foreignKey: 'fig_num'
});

// Inventory_Sets
Inventory_Sets.belongsTo(Inventories, {
	foreignKey: 'id'
});
Inventory_Sets.belongsTo(Sets, {
	foreignKey: 'set_num'
});

// Users
Users.hasMany(User_Inventories, {
	foreignKey: 'id',
	onDelete: 'CASCADE'
})

// User_Inventories
User_Inventories.belongsTo(Users, {
	foreignKey: 'id'
});
User_Inventories.belongsTo(Parts, {
	foreignKey: 'part_num'
});
User_Inventories.belongsTo(Colors, {
	foreignKey: 'id'
});

module.exports = {
	Themes, Sets, Inventories, Part_Categories, Parts, Colors,
	Inventory_Parts, Part_Relationships, Elements, Minifigs,
	Inventory_Minifigs, Inventory_Sets, Users, User_Inventories
};
