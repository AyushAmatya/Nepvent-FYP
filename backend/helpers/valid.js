//Validation helpers
const {
    check
} = require('express-validator');
exports.validRegister = [
    check('first_name', 'Firsst Name is required').notEmpty()
    .isLength({
        min: 3,
        max: 20
    }).withMessage('First name must be between 3 to 20 characters'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

// exports.validAddEvent = [
//     check('eventCoordination.manager_email').isEmail().withMessage('Manager email must be a valid email address')
// ]
exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]


exports.forgotPasswordValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long').matches(/\d/).withMessage('password must contain a number')
];