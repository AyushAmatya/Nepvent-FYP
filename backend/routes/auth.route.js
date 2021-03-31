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
    loginController
} = require('../controllers/auth.controller.js')

router.post('/register', validRegister,registerController);
router.post('/activation', activationController);
router.post('/login', validLogin, loginController);


module.exports = router;