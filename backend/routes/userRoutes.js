const { signUp, verifyAccount, forgetPassword, resetPassword, signin } = require('../controller/userController')
const { userRegisterRules, validationMethod } = require('../middleware/validationScript')
const router = require('express').Router()

router.post('/login', signin)
router.post('/register', userRegisterRules, validationMethod, signUp )
router.get('/verify:token', verifyAccount)

router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)

module.exports = router