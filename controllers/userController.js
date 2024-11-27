require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
      password // Sem hash aqui
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', token });
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};
