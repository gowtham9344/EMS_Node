const express = require('express')
const router = express.Router({mergeParams: true})
const {getEmployees, getManager} = require("../controllers/teamEmployeesController.js")

router.get('/',getEmployees)

router.get("/manager",getManager)

module.exports = router