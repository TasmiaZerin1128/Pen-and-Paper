const dotenv = require("dotenv");
const winston = require("winston");
const { Sequelize } = require("sequelize");

dotenv.config();

const APP_NAME = process.env.APP_NAME;

const sequelize = new Sequelize(APP_NAME, "root", "", {
  host: "localhost",
  dialect: "mysql",
  // logging: logging
});

async function connectToDatabase() {
  //Connect to db
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { connectToDatabase, sequelize };
