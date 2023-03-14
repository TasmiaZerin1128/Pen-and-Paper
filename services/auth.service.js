const authRepository = require("../repositories/auth.repository");
const userUtils = require("../utils/userValidation");
const bcrypt = require("bcrypt");

exports.register = async (user) => {

  const userValid = userUtils.userValidator(
    user.username,
    user.email,
    user.password
  );
  if (!userValid.valid) {
    return false;
  }

  try {
    const result = await authRepository.register(user);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.login = async (user) => {

      try {
        const userExists = await authRepository.checkUserExists(user.username.toLowerCase());
        if(userExists){
            const isPasswordMatched = await userExists.comparePassword(user.password);
            if(!isPasswordMatched){
                return false;
            } 
            return userExists;
        }
        else{
            return false;
        }
      } catch (err) {
        throw err;
      }
};

