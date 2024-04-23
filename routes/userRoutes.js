const express = require('express')
const router = express.Router()
const {loginUser, currentUser, editUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')


router.post('/login',loginUser)

router.get('/current',validateToken,currentUser)

router.post('/editUser',validateToken,editUser)

module.exports = router