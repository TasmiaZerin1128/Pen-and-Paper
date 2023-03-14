const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.config");
require("dotenv").config();
const { hashPassword, matchPassword } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");
const { prototype } = require("../DTOs/user.dto");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    },
    username: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      notNull: true,
      unique: true,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    }
  },{
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
         user.password = await hashPassword(user.password);
        }
    }
  }
  },
  {
    tableName: "Users",
  }
);

User.prototype.getJWTToken = function() {
  return jwt.sign({ username: this.username }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE
})
};

User.prototype.comparePassword = async function(password) {
  return await matchPassword(password, this.password);
};

(async () => {
    await User.sync({force:true});  
})();


module.exports = User;