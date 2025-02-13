require('dotenv').config({ path: `${__dirname}/../../.env` });
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config.js');

const { database, host, username, password, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: console.log,
});

module.exports = sequelize;