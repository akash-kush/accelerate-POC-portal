const { check } = require('express-validator');

exports.loginUser = [
    check('email').normalizeEmail().isEmail(),
    check('password').exists(),
    check('role').exists()
]