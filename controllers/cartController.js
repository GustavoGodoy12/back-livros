// controllers/cartController.js

const { Cart, Product } = require('../models'); // Import correto a partir de 'models/index.js'

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtém userId do token

    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      // Isso não deveria acontecer se o carrinho é criado no registro
      cart = await Cart.create({ userId });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    const existingCartProduct = await cart.getProducts({ where: { id: productId } });
    if (existingCartProduct.length > 0) {
      const cartProduct = existingCartProduct[0].CartProduct;
      const newQuantity = cartProduct.quantity + quantity;
      const newTotal = newQuantity * product.preco;
      await cart.addProduct(product, { through: { quantity: newQuantity, total: newTotal } });
    } else {
      const total = quantity * product.preco;
      await cart.addProduct(product, { through: { quantity, total } });
    }

    const updatedCart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        attributes: ['id', 'nome', 'preco', 'descricao'],
        through: {
          attributes: ['quantity', 'total']
        }
      }
    });

    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtém userId do token
    const productId = parseInt(req.params.id, 10);

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    await cart.removeProduct(productId);

    const updatedCart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        attributes: ['id', 'nome', 'preco', 'descricao'],
        through: {
          attributes: ['quantity', 'total']
        }
      }
    });

    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Obtém userId do token

    // Puxa pelo id o user do carrinho atual
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        attributes: ['id', 'nome', 'preco', 'descricao'],
        through: {
          attributes: ['quantity', 'total']
        }
      }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
