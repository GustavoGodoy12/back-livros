const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

console.log('Definindo o modelo Cart');

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
  timestamps: false
});


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
  timestamps: false
});

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId', otherKey: 'productId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId', otherKey: 'cartId' });

console.log('Associações Cart.belongsToMany Product definidas');

module.exports = Cart;
