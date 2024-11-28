// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

console.log('Definindo o modelo Product');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estoque: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100
  },
  userId: { // Campo para associar o produto ao usuário
    type: DataTypes.INTEGER,
    allowNull: true, // Permitir nulo temporariamente
    references: {
      model: 'Users', // Nome da tabela Users
      key: 'id'
    }
  }
}, {
  timestamps: false
});

module.exports = Product;
