const { DataTypes, Model } = require('sequelize')
const sequelize = require('../database')
const Revenue = require('./Revenue')
const Expense = require('./Expense')

class Account extends Model {}

Account.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    sequelize,
    modelName: "Account",
    tableName: "accounts"
})

// Account (1) - (n) Revenue
Account.hasMany(Revenue)
Revenue.belongsTo(Account)

// Account (1) - (n) Expenses
Account.hasMany(Expense)
Expense.belongsTo(Account)

module.exports = Account