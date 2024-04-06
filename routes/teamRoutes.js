const express = require('express')
const router = express.Router()
const {getTeams, createTeam, getTeam, updateTeam, deleteTeam, searchTeams} = require("../controllers/teamController")

router.get('/',getTeams)

router.get('/:id(\\d+)',getTeam)

router.get('/search',searchTeams)

router.patch('/:id(\\d+)',updateTeam)

router.post('/',createTeam)

router.delete('/:id(\\d+)',deleteTeam)

module.exports = router