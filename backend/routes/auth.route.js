const router = require('express').Router();

//validation 
const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')
  
//load controllers
const{
    registerController,
    activationController,
    loginController,
    forgetController,
    resetPasswordController,
    updateProfileDetailsController
} = require('../controllers/auth.controller.js')

router.post('/register', validRegister,registerController);
router.post('/activation', activationController);
router.post('/login', validLogin, loginController);
router.put('/forgotpassword', forgotPasswordValidator, forgetController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);
router.post('/updateProfileDetails', updateProfileDetailsController);


module.exports = router;