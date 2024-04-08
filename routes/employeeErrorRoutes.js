const express = require('express')
const router = express.Router()
const {employeeError, employeeSearchError} = require('../services/employeeError')
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)

router.patch('/:id(\\d+)',employeeError)

router.post('/',employeeError)

router.get('/search',employeeSearchError)

module.exports = router