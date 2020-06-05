const router = require('express').Router();
const userRegisterController = require('../controllers/auth/userRegisterController');
const userLoginController = require('../controllers/auth/userLoginController');
const userLogoutController = require('../controllers/auth/userLogoutController');
const validator = require('../validator/userRegister');
const loginValidator = require('../validator/userLogin');
const JWTCertifier = require('../helpers/JWTCertifier');

router.post('/register', validator.registerUser, userRegisterController.userRegister);
router.post('/login', loginValidator.loginUser, userLoginController.userLogin);
router.post('/logout', JWTCertifier.verifyJWT, userLogoutController.userLogout);

module.exports = router;