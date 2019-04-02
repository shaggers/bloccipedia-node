'use strict';

const faker = require("faker");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();
const crypto = require('crypto-random-string');

 let users = [];

 for(let i = 1 ; i <= 15 ; i++){
   users.push({
     name: faker.name.findName(),
     email: faker.internet.email(),
     password: bcrypt.hashSync(faker.lorem.words(), salt),
     isVerified: true,
     verificationCode: crypto(6),
     createdAt: new Date(),
     updatedAt: new Date(),
     role: 0
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Users", null, {});
  }
};
