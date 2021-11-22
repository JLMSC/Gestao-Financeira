const express = require('express')
const router = express.Router()
const ensureAuthenticated = require('../middleware/auth')
const Revenue = require('../model/Revenue')
const Expense = require('../model/Expense')
const sequelize = require('sequelize')

// Main page after login.
router.get('/', ensureAuthenticated, async (req, res) => {
    // SELECT id, title, value, updatedAt FROM revenues;
    let revenue_data = await Revenue.findAll({
        attributes: [
            'id', 'title', 'value', 'updatedAt'
        ],
    })
    // SELECT id, title, value, updatedAt FROM expenses;
    let expenses_data = await Expense.findAll({
        attributes: [
            'id', 'title', 'value', 'updatedAt'
        ]
    })

    res.render("pages/main", { user: req.user, revenue_data: revenue_data, expenses_data: expenses_data })
})

// Revenue default page.
router.get('/revenue', ensureAuthenticated, async (req, res) => {
    // SELECT id, title, value, updatedAt FROM revenues;
    let revenue_data = await Revenue.findAll({
        attributes: [
            'id', 'title', 'value', 'updatedAt'
        ],
    })

    res.render("pages/revenue", { user: req.user, revenue_data: revenue_data })
})

// Expenses default page.
router.get('/expenses', ensureAuthenticated, async (req, res) => {
    // SELECT id, title, value, updatedAt FROM expenses;
    let expenses_data = await Expense.findAll({
        attributes: [
            'id', 'title', 'value', 'updatedAt'
        ]
    })

    res.render("pages/expenses", { user: req.user, expenses_data: expenses_data })
})

module.exports = router