const { check } = require('express-validator/check');

exports.registerUser = [
    check('email').normalizeEmail().isEmail(),
    check('name').exists(),
    check('password').exists(),
    check('phone_number').exists()
]