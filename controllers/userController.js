// controllers/userController.js

require('dotenv').config();
const { User, Cart, Product } = require('../models'); // Certifique-se de importar Product
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe com este email.' });
    }

    const user = await User.create({
      name,
      email,
      password // A senha será hashada pelo hook no modelo
    });

    // Criar um carrinho para o usuário recém-criado
    await Cart.create({ userId: user.id });

    // Criar um produto associado ao usuário
    const product = await Product.create({
      nome: 'Produto Padrão',
      preco: 0.0,
      descricao: 'Produto padrão associado ao usuário.',
      estoque: 100,
      userId: user.id
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', token, userId: user.id, product });
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};

// Função para realizar o login do usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const isValid = await user.validPassword(password);
    if (!isValid) {
      return res.status(400).json({ message: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Login bem-sucedido!', token, userId: user.id });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};

// Função para obter o perfil do usuário autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'name', 'email']
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Erro ao obter perfil:', error.message);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};
