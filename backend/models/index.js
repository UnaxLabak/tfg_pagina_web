const Sequelize = require('sequelize');
const UserModel = require('./users');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  User,
  sequelize
};