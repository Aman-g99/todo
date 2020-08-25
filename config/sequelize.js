const Sequelize = require('sequelize');
// const {DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT} = require("./config");

const DB_HOST  = "localhost",
    DB_PORT  = 3306,
    DB_DATABASE = "dummy" ,
    DB_USER  = "root",
    DB_PASSWORD="wordpass";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  logging: console.log,
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT
  // define: {
  //   timestamps: false // was false here
  // }
});

module.exports = sequelize;