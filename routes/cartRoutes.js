const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.use(authMiddleware);

router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);
router.get('/view', cartController.viewCart);

module.exports = router;
