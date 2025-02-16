const router = require('express').Router();
const { keycloak }  = require('../config/keycloak');
const authController = require('../controllers/authController');

router.route('/me').get(keycloak.protect(), authController.getLoggedInUserInfo);

module.exports = router;
