const User = require('./User');
const { Cart, CartProduct } = require('./Cart');
const Product = require('./Product');
const Supplier = require('./Supplier');

User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId', otherKey: 'productId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId', otherKey: 'cartId' });

User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Cart,
  CartProduct,
  Product,
  Supplier
};
