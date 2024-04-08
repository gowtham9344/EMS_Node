const express = require('express')
const router = express.Router()
const {getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee, searchEmployees} = require("../controllers/employeeController")
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)

router.get('/',getEmployees)

router.get('/:id(\\d+)',getEmployee)

router.get('/search',searchEmployees)

router.patch('/:id(\\d+)',updateEmployee)

router.post('/',createEmployee)

router.delete('/:id(\\d+)',deleteEmployee)

module.exports = router