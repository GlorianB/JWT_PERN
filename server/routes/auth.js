const router = require('express-promise-router')();

// Validator import
const validator = require('../middlewares/validator');

// Authorizor import
const authorizor = require('../middlewares/authorizor');

// Controllers import
const authController = require('../controllers/auth');


//Router setup

router.get('/is_verify', authorizor, authController.is_verify);

router.get('/register', authController.getRegister);

router.post('/register', validator.registerValidator, authController.postRegister);

router.get('/login', authController.getLogin);

router.post('/login', validator.loginValidator, authController.postLogin);

module.exports = router
