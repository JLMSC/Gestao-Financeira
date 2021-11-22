module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'O login é necessário!')
    res.redirect('/login')
}