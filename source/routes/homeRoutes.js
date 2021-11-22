const express = require('express')
const router = express.Router()
const ensureAuthenticated = require('../middleware/auth')
const AccountRepository = require('../repository/Account')
const RevenueRepository = require('../repository/Revenue')
const ExpenseRepository = require('../repository/Expense')
const accRepo = new AccountRepository()
const revRepo = new RevenueRepository()
const expRepo = new ExpenseRepository()
const bcrypt = require('bcrypt')
const bcryptSaltRounds = 12
const passport = require('passport')
const url = require('url')

// Default startup page.
router.get('/', (req, res) => {
    res.render("pages/home", { user: req.user })
})

// Sign out button, logout the user.
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        req.logout()
        res.redirect('/')
    })
})

// Default login page.
router.get('/login', (req, res) => {
    res.render("pages/login", { error: req.flash('error')[0], user: req.user })
})

// Submit login page.
router.post('/login', passport.authenticate('local', {
    badRequestMessage: 'Os campos precisam ser preenchidos.',
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

// About page.
router.get('/about', (req, res) => {
    res.render("pages/about", { user: req.user })
})

// Default register page.
router.get('/register', (req, res) => {
    res.render("pages/register", { error: null, user: req.user })
})

// Submit register page.
router.post('/register', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation

    // Check if the username is between four and thirty-two characters.
    if (username.length >= 4 && username.length <= 32) {
        // Check if the password is between eigth and sixteen characters.
        if (password.length >= 8 && password.length <= 16) {
            // Verify if both password are equal.
            if (password == passwordConfirmation) {
                // Verify if the username already exists.
                let usernameExists = await accRepo.findByUsername(username)
                if (usernameExists.length == 0) {
                    // Uses bcrypt to secure the password when saving on the database.
                    bcrypt.hash(password, bcryptSaltRounds, (_, hash) => {
                        let acnt = {
                            username: username,
                            password: hash
                        }
                        accRepo.insert(acnt)
                        res.render("pages/register_ok", { user: req.user })
                    })
                } else {
                    // Username not available.
                    let error = { message: "O nome de usuário desejado não está disponível." }
                    res.render("pages/register", { error: error, user: req.user })
                }
            } else {
                // Non matching password.
                let error = { message: "As senhas não coincidem." }
                res.render("pages/register", { error: error, user: req.user })
            }
        } else {
            // Too short password entry.
            let error = { message: "A senha deve possuir entre 8 à 16 caracteres." }
            res.render("pages/register", { error: error, user: req.user })
        }
    } else if (username.length == 0) {
        // Empty username.
        let error = { message: "O nome de usuário não pode estar vazio." }
        res.render("pages/register", { error: error, user: req.user })
    } else {
        // Invalid username.
        let error = { message: "O nome de usuário deve possuir entre 4 à 32 caracteres." }
        res.render("pages/register", { error: error, user: req.user })
    }
})

// Revenue removal request.
router.post('/main/revenue/remove/:id', ensureAuthenticated, async (req, res) => {
    let revenueId = parseInt(req.params["id"])
    revRepo.deleteById(revenueId)
    res.redirect('/main/revenue')
})

// Revenue edit request.
router.post('/main/revenue/edit/:id/:value/:title', ensureAuthenticated, async (req, res) => {    
    let revenueId = parseInt(req.params["id"])
    let revenueValue = parseInt(req.params["value"])
    let revenueTitle = req.params["title"]
    let rvn = {
        value: revenueValue,
        title: revenueTitle
    }
    revRepo.update(rvn, revenueId)
    res.redirect('/main/revenue')
})

// Revenue create request.
router.post('/main/revenue/new/:value/:title', ensureAuthenticated, async (req, res) => {
    let revenueValue = parseInt(req.params["value"])
    let revenueTitle = req.params["title"]
    let rvn = {
        value: revenueValue,
        title: revenueTitle,
        AccountId: req.user
    }

    revRepo.insert(rvn)
    res.redirect('/main/revenue')
})

// Expenses create request.
router.post('/main/expenses/new/:value/:title', ensureAuthenticated, async (req, res) => {
    let expenseValue = parseInt(req.params["value"])
    let expenseTitle = req.params["title"]
    let exp = {
        value: expenseValue,
        title: expenseTitle
    }

    expRepo.insert(exp)
    res.redirect('/main/expenses')
})

// Expenses edit request.
router.post('/main/expenses/edit/:id/:value/:title', ensureAuthenticated, async (req, res) => {    
    let expenseId = parseInt(req.params["id"])
    let expenseValue = parseInt(req.params["value"])
    let expenseTitle = req.params["title"]
    let exp = {
        value: expenseValue,
        title: expenseTitle
    }
    expRepo.update(exp, expenseId)
    res.redirect('/main/expenses')
})

// Expenses removal request.
router.post('/main/expenses/remove/:id', ensureAuthenticated, async (req, res) => {
    let expenseId = parseInt(req.params["id"])
    expRepo.deleteById(expenseId)
    res.redirect('/main/expenses')
})


module.exports = router