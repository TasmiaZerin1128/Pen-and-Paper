const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(controller.getAllUsers); //.post(controller.createUser);
router.route('/:username').get(controller.getUserbyUsername).put(controller.updateUserbyUsername).delete(controller.deleteUserbyUsername);

module.exports = router;