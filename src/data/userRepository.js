// const { User } = require('../db/models');
// const { Op } = require('sequelize');
// const logger = require('../utils/logger');


// // Debugging - Check if User model is properly loaded
// //console.log("Loaded Models:", Object.keys(require('../db/models')));
// console.log("Loaded User model:", User ? "User model loaded successfully" : "User model is undefined");

// let UserInfo = [{
//   "aman.verma@tigeranalytics.com": {
//     "firstName": "admin",
//     "lastName": "",
//     "roles": ["admin"]
//   },
//   "aman.rajput100@gmail.com": {
//     "firstName": "aman",
//     "lastName": "verma",
//     "roles": ["user"]
//   },
//   // ... more users
// }];

// exports.createUser = async (userData) => {
//   try {
//     const newUser = await User.create(userData);
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// exports.findUserByEmail = async (email) => {
//   try {
//     // const user = await User.findOne({
//     //   where: {
//     //     email: {
//     //       [Op.iLike]: email, // Case-insensitive search (MSSQL)
//     //     },
//     //   },
//     //   attributes: ['id', 'email', 'firstName', 'lastName', 'roles'], // Select attributes
//     // });
//     const user = UserInfo[email];
//     return user;
//   } catch (error) {
//     logger.error('Error in userRepository.findUserByEmail:', error);
//     throw error;
//   }
// };


