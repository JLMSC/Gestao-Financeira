const { DataTypes, Model } = require('sequelize')
const sequelize = require('../database')

class Revenue extends Model {}

Revenue.init({
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
    modelName: 'Revenue',
    tableName: 'revenues'
})

module.exports = Revenue