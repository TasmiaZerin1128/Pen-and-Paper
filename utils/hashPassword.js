const bcrypt = require("bcrypt");

async function hashingPassword(password){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
}

module.exports = hashingPassword;