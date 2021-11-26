const express = require('express')
const { updateName, updatePassword, updatePasswordValidations } = require('../controller/profileControler')
const router = express.Router()
const auth  = require('../Utils/Auth')

router.post('/updateName', auth, updateName)
router.post('/updatePassword', [auth , updatePasswordValidations], updatePassword)



module.exports = router
