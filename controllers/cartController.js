const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ where: { userId } });
    
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const cartItems = cart.items;
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity;
      cartItems[existingItemIndex].total = cartItems[existingItemIndex].quantity * product.preco;
    } else {
      cartItems.push({
        productId,
        nome: product.nome,
        quantity,
        total: quantity * product.preco
      });
    }

    await cart.update({ items: cartItems });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const productId = parseInt(req.params.id);
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    const updatedItems = cart.items.filter(item => item.productId !== productId);
    await cart.update({ items: updatedItems });

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
