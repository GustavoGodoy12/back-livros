// models/index.js

const User = require('./User');
const { Cart, CartProduct } = require('./Cart');
const Product = require('./Product'); // Certifique-se de importar Product

// Definindo as Associações

// Um Usuário tem um Carrinho
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Um Carrinho pertence a muitos Produtos e vice-versa através de CartProduct
Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId', otherKey: 'productId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId', otherKey: 'cartId' });

// Um Usuário tem muitos Produtos
User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Cart,
  CartProduct,
  Product
};
