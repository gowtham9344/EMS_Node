const express = require('express')
const router = express.Router()
const {loginUser, currentUser, editUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')


router.post('/login',loginUser)

router.use(validateToken)

router.get('/current',currentUser)

router.post('/editUser',editUser)

module.exports = router