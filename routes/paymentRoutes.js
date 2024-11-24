
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/credit-card', paymentController.processarPagamentoCartao);
router.post('/pix', paymentController.processarPagamentoPix);
router.get('/status/:transactionId', paymentController.consultarTransacao);

module.exports = router;
