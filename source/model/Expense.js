const { DataTypes, Model } = require('sequelize')
const sequelize = require('../database')

class Expense extends Model {}

Expense.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
})

module.exports = Expense