const express = require('express');
const auth = require('../controllers/auth.controller');

const router = express.Router();

router.route('/register').post(auth.getRegistered);
router.route('/login').post(auth.getLoggedIn);
router.route('/logout').get(auth.getLoggedOut);

module.exports = router;