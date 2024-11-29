const { Product, User } = require('../models'); 

exports.createProduct = async (req, res) => {
  try {
    const { nome, preco, descricao, estoque } = req.body;
    const userId = req.user.userId; 
    const product = await Product.create({
      nome,
      preco,
      descricao,
      estoque,
      userId
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      if (product.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Ação proibida.' });
      }
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      if (product.userId !== req.user.userId) {
        return res.status(403).json({ message: 'Ação proibida.' });
      }
      await product.destroy();
      res.json({ message: 'Produto deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
