require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const sequelize = require('./source/database')
const router = require('./source/routes')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const AccountRepository = require('./source/repository/Account')
const app = express()
const port = 3000

// Check fields on login page, auth the user.
passport.use(new LocalStrategy(
    async (username, password, done) => {
        let accRepo = new AccountRepository()
        let acnt = await accRepo.findByUsername(username)
        if (acnt.length == 0) {
            done(null, false, { message: "Usuário ou senha inválidos." })
        }

        bcrypt.compare(password, acnt[0].password, (err, result) => {
            if (err) {
                done(err)
            }
            if (!result) {
                done(null, false, { message: "Usuário ou senha inválidos." })
            } else {
                done(null, acnt[0])
            }
        })
    }
))

passport.serializeUser((account, done) => {
    done(null, account.id)
})

passport.deserializeUser(async (obj, done) => {
    let accRepo = new AccountRepository()
    let acnt = await accRepo.findById(obj)
    done(null, acnt[0])
})

// Configure the express.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.DATABASE_SESSION, // Database session secret.
    resave: false,
    saveUnitialized: true
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)

// Listen to the current port.
app.listen(port, async () => {
    console.log(`Application on-the-line on https://localhost:${port}`)

    // Test the connection/auth.
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log("Unable to connect to the Database: ", error)
    }

    // Synchronize the models. (force: true clears the database.)
    await sequelize.sync({ force: false })
    console.log("All models were successfully synchronized.")
})