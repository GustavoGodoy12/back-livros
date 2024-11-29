const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Supplier = sequelize.define('Supplier', {
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
    tableName: 'Suppliers',
    timestamps: false
});

Supplier.beforeCreate(async (supplier, options) => {
    const salt = await bcrypt.genSalt(10);
    supplier.password = await bcrypt.hash(supplier.password, salt);
});

Supplier.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = Supplier;
