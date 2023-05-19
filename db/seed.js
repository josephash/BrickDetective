const { sequelize, connection } = require('../config/connection');
const mysql = require('mysql2/promise');
const { promises: fs } = require('fs');
const {
	Themes, Sets, Inventories, Part_Categories, Parts, Colors,
	Inventory_Parts, Part_Relationships, Elements, Minifigs,
	Inventory_Minifigs, Inventory_Sets, Users, User_Inventories
} = require('../models');
const { isNullOrUndefined } = require('util');


function replaceChars(line) {
	while (true) {
		if (line.includes('"')) {
			line = line.replace('"', '');
		} else {
			break;
		}
	}
	while (true) {
		if (line.includes('||')) {
			line = line.replace('||', '"');
		} else {
			break;
		}
	}
	while (true) {
		if (line.includes('|')) {
			line = line.replace('|', ',');
		} else {
			break;
		}
	}
	return line;
}

const getData = async (csv) => {
	const file = await fs.readFile(`./db/seeds/${csv}.csv`, 'utf8');
	let [fields, ...data] = file.split('\n');
	fields = fields.split(',');
	if (csv === 'themes') {
		fields = [fields[0], fields[1]];
	}
	let objlist = [];
	for (let line of data) {
		if (line) {
			if (line.includes('"')) {
				while (true) {
					if (line.includes('""')) {
						line = line.replace('""', '||');
					} else {
						break;
					}
				}
				let last = null;
				for (const i in line) {
					if ((line[i] == '"') && (last === null)) {
						last = i;
					} else if ((line[i] == '"') && (last != null)) {
						for (let ii = Number(last) + 1; ii < i; ii++) {
							if (line[ii] == ',') {
								line = line.substring(0, ii) + '|' + line.substring(ii + 1);
							}
						}
						last = null;
					}
				}
			}

			let newobj = {};
			let cells = line.split(',');
			if ((csv === 'inventories') && (cells[2].substring(0, 4) === 'fig-')) {
				cells = [cells[0], cells[1]];
			} else if (csv === 'colors') {
				if (cells[3] === 'f') {
					cells[3] = '0';
				} else if (cells[3] === 't') {
					cells[3] = '1';
				}
			} else if (csv === 'inventory_parts') {
				if (cells[4] === 'f') {
					cells[4] = '0';
				} else if (cells[4] === 't') {
					cells[4] = '1';
				}
			}
			for (const i in cells) {
				cells[i] = replaceChars(cells[i]);
				if ((csv != 'themes') || (i < 2)) {
					newobj[fields[i]] = cells[i];
				}
			}
			objlist.push(newobj);
		}
	}
	return objlist;
}

const seedDatabase = async () => {
	await (await connection).query('DROP DATABASE IF EXISTS lego_db;');
	await (await connection).query('CREATE DATABASE lego_db;');
    await sequelize.sync({ force: true });

	const seedParams = {
    	returning: true,
	};
	
	await Themes.bulkCreate(await getData('themes'), seedParams);
	await Sets.bulkCreate(await getData('sets'), seedParams);
	await Inventories.bulkCreate(await getData('inventories'), seedParams);
	await Part_Categories.bulkCreate(await getData('part_categories'), seedParams);
	await Parts.bulkCreate(await getData('parts'), seedParams);
	await Colors.bulkCreate(await getData('colors'), seedParams);
	await Inventory_Parts.bulkCreate(await getData('inventory_parts'), seedParams);
	await Part_Relationships.bulkCreate(await getData('part_relationships'), seedParams);
	await Elements.bulkCreate(await getData('elements'), seedParams);
	await Minifigs.bulkCreate(await getData('minifigs'), seedParams);
	// await Inventory_Minifigs.bulkCreate(await getData('inventory_minifigs'), seedParams);
	// await Inventory_Sets.bulkCreate(await getData('inventory_sets'), seedParams);

	process.exit(0);
};

seedDatabase();