const { User } = require('../models');

const userdata = [
  {
    username: 'testuser1',
    email: 'testuser1@gmail.com',
    password: 'password1',
  },
  {
    username: 'testuser2',
    email: 'testuser2@gmail.com',
    password: 'password2',
  },
  {
    username: 'testuser3',
    email: 'testuser3@gmail.com',
    password: 'password3',
  },
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
