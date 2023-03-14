const userDTO = require("../DTOs/user.dto");
const User = require("../models/user.model");

// exports.createUser = async (id, fullName, username, email, password) => {
//   try {
//     const result = await User.create({
//       id: id,
//       fullName: fullName,
//       username: username,
//       email: email,
//       password: password,
//     });
//     console.log("User created successfully");
//     return result;
//   } catch (err) {
//     console.log(err.stack);
//     throw err;
//   }
// };

exports.getAllUsers = async () => {
  try {
    const result = await User.findAll();
    const allUsers = [];
    result.forEach((element) => {
      allUsers.push(new userDTO(element));
    });

    return allUsers;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getUserbyUsername = async (username) => {
  try {
    const result = await User.findOne({ where: { username: username } });
    const userdto = new userDTO(result);
    return userdto;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.updateUser = async (username, updatedPassword) => {
  try {
    const result = await User.update(
      { password: updatedPassword },
      { where: { username: username } }
    );
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.deleteUser = async (username) => {
  try {
    const result = User.destroy({ where: { username: username } });
    return result;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getUserbyEmail = async (email) => {
  try {
    const result = await User.findOne({ where: { email: email } });
    const userdto = new userDTO(result);
    return userdto;
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};
