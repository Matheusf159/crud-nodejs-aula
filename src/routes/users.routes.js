const { Router } = require('express')
const router = Router()

const { renderSignupForm, signup, login, logout, renderLoginForm } = require('../controllers/users.controller')

router.get('/users/signup', renderSignupForm)
router.post('/users/signup', signup)

router.get('/users/login', renderLoginForm)
router.post('/users/login', login)

router.get('/users/logout', logout)

module.exports = router