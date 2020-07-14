const router = require('express-promise-router')();


const authorizor = require('../middlewares/authorizor');

// Controllers import
const dashboardController = require('../controllers/dashboard');

router.get('/', authorizor, dashboardController.getIndex);

module.exports = router;
