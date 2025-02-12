// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

// const db = {};

// fs.readdirSync(__dirname)
//   .filter(file => file.endsWith('.js') && file !== path.basename(__filename))
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.values(db).forEach(model => {
//   if (model.associate) model.associate(db);
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;