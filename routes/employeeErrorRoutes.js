const express = require('express')
const router = express.Router()
const {employeeError, employeeSearchError} = require('../services/employeeError')

router.patch('/:id(\\d+)',employeeError)

router.post('/',employeeError)

router.get('/search',employeeSearchError)

module.exports = router