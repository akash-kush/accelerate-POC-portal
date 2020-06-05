/**
 * @description Router for all user related API
 * @author Jithin Zacharia
 */

const router = require('express').Router();
const JWTCertifier = require('../helpers/JWTCertifier');
const getAllUserByIdContoller = require('../controllers/user/getAllUserByIdContoller');
const getAllUserController = require('../controllers/user/getAllUserController');
const getAllUserByRoleController = require('../controllers/user/getUsersByRoleController');

router.get('/:id', JWTCertifier.verifyJWT, getAllUserByIdContoller.getUserById);
router.get('/all', JWTCertifier.verifyJWT, getAllUserController.getAllUsers);
router.get('role/:role', JWTCertifier.verifyJWT, getAllUserByRoleController.getUserByRole)

module.exports = router;