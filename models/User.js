const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Users'
});

//hook que faz antes de salvar o user
User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

//compara as senha
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



module.exports = User;
