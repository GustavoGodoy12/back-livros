// models/Cart.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  }
}, {
  tableName: 'Carts',
  timestamps: false
});

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Carts', 
      key: 'id'
    },
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', 
      key: 'id'
    },
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'CartProducts',
  timestamps: false
});

module.exports = { Cart, CartProduct };
