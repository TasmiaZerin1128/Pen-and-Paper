const userService = require("../services/user.service");

'use strict';

exports.getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  res.status(data.status).send(data.message);
};

exports.getUserbyUsername = async (req, res) => {
  const data = await userService.getUserbyUsername(req.params.username);
  res.status(data.status).send(data.message);
};

// exports.createUser = async (req, res) => {
//   const data = await userService.createUser(req.body);
//   res.status(data.status).send(data.message);
// };

exports.updateUserbyUsername = async (req, res) => {
  const data = await userService.updateUser(req.params.username, req.body);
  res.status(data.status).send(data.message);
};

exports.deleteUserbyUsername = async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.username);
  res.status(deletedUser.status).send(deletedUser.message);
};
