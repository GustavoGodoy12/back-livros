require('dotenv').config();
const { Supplier } = require('../models'); 
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingSupplier = await Supplier.findOne({ where: { email } });
        if (existingSupplier) {
            return res.status(400).json({ message: 'Fornecedor já existe com este email.' });
        }

        const supplier = await Supplier.create({
            name,
            email,
            password 
        });

        const token = jwt.sign(
            { supplierId: supplier.id, email: supplier.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ message: 'Fornecedor cadastrado com sucesso!', token, supplierId: supplier.id });
    } catch (error) {
        console.error('Erro no cadastro de fornecedor:', error.message);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const supplier = await Supplier.findOne({ where: { email } });
        if (!supplier) {
            return res.status(400).json({ message: 'Fornecedor não encontrado.' });
        }

        const isValid = await supplier.validPassword(password);
        if (!isValid) {
            return res.status(400).json({ message: 'Senha inválida.' });
        }

        const token = jwt.sign(
            { supplierId: supplier.id, email: supplier.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ message: 'Login bem-sucedido!', token, supplierId: supplier.id });
    } catch (error) {
        console.error('Erro no login de fornecedor:', error.message);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.status(200).json(suppliers);
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error.message);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};
