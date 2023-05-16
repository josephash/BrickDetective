const sequelize = require('../config/connection');
const { promises: fs } = require('fs');
const {
	Themes, Sets, Inventories, Part_Categories, Parts, Colors,
	Inventory_Parts, Part_Relationships, Elements, Minifigs,
	Inventory_Minifigs, Inventory_Sets, Users, User_Inventories
} = require('../models');


const getData = async (csv) => {
	const file = await fs.readFile(`./db/seeds/${csv}.csv`, 'utf8');
	let [fields, ...data] = toString(file).split('\n');
	fields = fields.split(',');
	let objlist = [];
	for (const line of data) {
		let newobj = {};
		let cells = line.split(',');
		for (const i in cells) {
			newobj[fields[i]] = cells[i];
		}
		objlist.push(newobj);
	}
	console.log(objlist);
	return objlist;
}

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	for (const i of await Themes.bulkCreate(await getData('themes'))) {
		await Themes.create({
			...i
		});
	}
	for (const i of await Sets.bulkCreate(await getData('sets'))) {
		await Sets.create({
			...i
		});
	}
	for (const i of await Inventories.bulkCreate(await getData('inventories'))) {
		await Inventories.create({
			...i
		});
	}
	for (const i of await Part_Categories.bulkCreate(await getData('part_categories'))) {
		await Part_Categories.create({
			...i
		});
	}
	for (const i of await Parts.bulkCreate(await getData('parts'))) {
		await Parts.create({
			...i
		});
	}
	for (const i of await Colors.bulkCreate(await getData('colors'))) {
		await Colors.create({
			...i
		});
	}
	for (const i of await Inventory_Parts.bulkCreate(await getData('inventory_parts'))) {
		await Inventory_Parts.create({
			...i
		});
	}
	for (const i of await Part_Relationships.bulkCreate(await getData('part_relationships'))) {
		await Part_Relationships.create({
			...i
		});
	}
	for (const i of await Elements.bulkCreate(await getData('elements'))) {
		await Elements.create({
			...i
		});
	}
	for (const i of await Minifigs.bulkCreate(await getData('minifigs'))) {
		await Minifigs.create({
			...i
		});
	}
	for (const i of await Inventory_Minifigs.bulkCreate(await getData('inventory_minifigs'))) {
		await Inventory_Minifigs.create({
			...i
		});
	}
	for (const i of await Inventory_Sets.bulkCreate(await getData('inventory_sets'))) {
		await Inventory_Sets.create({
			...i
		});
	}
	console.log('-------------DONE-------------');
	// Users.create();
	// User_Inventories.create();

	process.exit(0);
};

seedDatabase();
