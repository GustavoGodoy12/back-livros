const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodoPagamento: {
    type: DataTypes.ENUM('cartão de crédito', 'PIX'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluído', 'falhado'),
    allowNull: false,
    defaultValue: 'pendente'
  }
});

Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = Transaction;
