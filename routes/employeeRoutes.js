const express = require('express')
const router = express.Router()
const {getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee, searchEmployees, availableEmployees} = require("../controllers/employeeController")
const validateToken = require('../middleware/validateTokenHandler')
const { employeeError, employeeSearchError } = require('../services/employeeError')

router.use(validateToken)

router.get('/',getEmployees)

router.get('/:id(\\d+)',getEmployee)

router.get('/search',employeeSearchError,searchEmployees)

router.get('/noteam',availableEmployees)

router.patch('/:id(\\d+)',employeeError,updateEmployee)

router.post('/',employeeError,createEmployee)

router.delete('/:id(\\d+)',deleteEmployee)

module.exports = router