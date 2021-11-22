const express = require('express')
const homeRoutes = require('./homeRoutes')
const mainRoutes = require('./mainRoutes')
const router = express.Router()

// Home routers.
router.use('/', homeRoutes)

// Main page routers.
router.use('/main', mainRoutes)

module.exports = router