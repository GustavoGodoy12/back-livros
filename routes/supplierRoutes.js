const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/register', supplierController.register);
router.post('/login', supplierController.login);
router.get('/', supplierController.getAllSuppliers);

module.exports = router;
