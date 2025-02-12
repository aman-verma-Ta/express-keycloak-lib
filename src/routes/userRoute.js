const router = require('express').Router();
const { keycloak }  = require('../config/keycloak');
const userController = require('../controllers/userController');

// router.route('/createUser').post(userController.createUser);
// router.route('/testApi').post(validateUser, userController.testKeycloak);

router.route('/me').get(keycloak.protect(), userController.getLoggedInUserInfo);

module.exports = router;
