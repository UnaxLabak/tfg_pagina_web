const Sequelize = require('sequelize');
const UserModel = require('./users');
const DockerModel = require('./docker');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const User = UserModel(sequelize, Sequelize);
const Docker = DockerModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  User,
  Docker,
  sequelize
};