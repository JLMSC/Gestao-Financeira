const { Sequelize } = require('sequelize')

// Configure the database with the Sequelize.
const sequelize = new Sequelize (
    process.env.DATABASE_NAME, // Database name.
    process.env.DATABASE_USERNAME, // Database user.
    process.env.DATABASE_PASSWORD, // Database password.
    { dialect: process.env.DATABASE_DIALECT }) // Dialect to be used on the database.

module.exports = sequelize