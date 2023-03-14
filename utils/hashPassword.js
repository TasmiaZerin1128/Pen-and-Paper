const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPassword(password){
    const saltRounds = process.env.SALTROUND;
    const salt = await bcrypt.genSalt(parseInt(saltRounds));
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
}

async function matchPassword(passwordEntered, hashPassword){
    return await bcrypt.compare(passwordEntered, hashPassword);
}

module.exports = { hashPassword, matchPassword };