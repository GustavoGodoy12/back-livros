const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);
router.get('/:userId', cartController.viewCart);

module.exports = router;
