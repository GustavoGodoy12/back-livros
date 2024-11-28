// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar o middleware de autenticação

// Aplicar o middleware de autenticação a todas as rotas de carrinho
router.use(authMiddleware);

router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);
router.get('/view', cartController.viewCart); // Alterado de '/:userId' para '/view'

module.exports = router;
