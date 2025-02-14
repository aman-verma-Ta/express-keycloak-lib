const router = require('express').Router();
const { keycloak }  = require('../config/keycloak');
const userController = require('../controllers/userController');

router.route('/me').get(keycloak.protect(), userController.getLoggedInUserInfo);

module.exports = router;
