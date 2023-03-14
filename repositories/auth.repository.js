const userRegisterDto = require("../DTOs/userRegister.dto");
const User = require("../models/user.model");

exports.register = async (user) => {
    const userToRegister = new userRegisterDto(user);
    try {
        const result = await User.create(userToRegister);
        console.log("User created successfully");
        return result;
      } catch (err) {
        throw console.error(err);
      }
}

exports.checkUserExists = async (username) => {
    try {
      const result = await User.findOne({ where: { username: username } });
      return result;
    } catch (err) {
      console.log(err.stack);
      throw err;
    }
  };