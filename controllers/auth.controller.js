const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const { sendToken, removeToken } = require("../utils/jwtToken");
require("dotenv").config();


("use strict");

exports.getRegistered = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    if (data) {
      sendToken(data, 201, res);
    } else {
      res.status(400).send("Please try again");
    }
  } catch (err) {
    res.status(400).send("An error occured");
  }
};


exports.getLoggedIn = async (req, res) => {

    try{
        const data = await authService.login(req.body);
        if (data) {
          sendToken(data, 200, res);
        } else {
          res.status(404).send("Incorrect username or password");
        }
    } catch (err) {
        res.status(400).send("An error occured");
    }
}

exports.getLoggedOut = async (req, res) => {
  try{
    removeToken(res);
  } catch (err) {
    res.status(404).send("No user was logged in");
  }
}