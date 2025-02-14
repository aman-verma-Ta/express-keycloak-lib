const express = require('express');
const { keycloak } = require('../config/keycloak');
const crudController = require('../controllers/CrudController');

const router = express.Router();

router.get('/:model', keycloak.protect(), crudController.getAll);
router.get('/:model/:id', keycloak.protect(), crudController.getById);
router.post('/:model', keycloak.protect(), crudController.create);
router.put('/:model/:id', keycloak.protect(), crudController.update);
router.delete('/:model/:id', keycloak.protect(), crudController.delete);

module.exports = router;
