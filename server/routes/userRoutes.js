const express = require('express');
const router = express.Router();

const {signup, login, forgetPassword, resetPassword} = require ('../controller/userAuth');

router.route ('/signup').post(signup);

router.route ('/login').post(login);

router.route ('/forgetPassword').post(forgetPassword);

router.route ('/resetPassword').post(resetPassword);

module.exports = router;