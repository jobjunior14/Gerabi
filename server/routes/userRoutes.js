const express = require('express');
const router = express.Router();

const {signup, 
    login, 
    forgetPassword, 
    resetPassword,
    updatePassword,
    protect,
    updateUser,
    barakaCreation,
    jobjunior
} = require ('../controller/userAuth');

router.route ('/signup').post(signup);

router.route ('/login').post(login);

router.route ('/forgetPassword').post(forgetPassword);

router.route ('/resetPassword/:token').patch(resetPassword);

router.route ('/updatePassword').patch(protect,updatePassword);

router.route ('/updateUser').patch(protect,updateUser);


//this route doesn't belong to the application
router.route('/barakaCreation').post(barakaCreation);
router.route('/jobjunior').post(jobjunior);

module.exports = router;