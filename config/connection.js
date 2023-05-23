const Sequelize = require("sequelize");
const mysql = require('mysql2/promise');

require("dotenv").config();

// server
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: "localhost",
      dialect: "mysql",
      port: 3001,
    });

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

module.exports = { sequelize, connection };
