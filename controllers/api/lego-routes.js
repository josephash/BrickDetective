const router = require("express").Router();
const {
  Themes, Sets, Inventories, Part_Categories, Parts, Colors,
  Inventory_Parts, Part_Relationships, Elements, Minifigs,
  Inventory_Minifigs, Inventory_Sets, Users, User_Inventories
} = require("../../models");
require("dotenv").config();



module.exports = router;