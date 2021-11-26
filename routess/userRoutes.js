const  app = require('express')
const { register, registerValidations, login, loginValiations } = require('../controller/userController')
const router = app.Router()



router.post('/register',registerValidations, register)
// router.post('/register', register)
router.post('/login',loginValiations,login)


module.exports = router