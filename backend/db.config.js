const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config();

const APP_NAME = process.env.APP_NAME;

function connectToDatabase() {
  //Create connection
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pen_paper"
  });

  //Connect to db
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log(`${APP_NAME} successfully connected to database.`);
  });
}

module.exports = connectToDatabase;