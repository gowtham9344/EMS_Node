const express = require('express')
const router = express.Router()
const {getTeams, createTeam, getTeam, updateTeam, deleteTeam, searchTeams} = require("../controllers/teamController")
const validateToken = require('../middleware/validateTokenHandler')
const { teamError, teamSearchError } = require('../services/teamError')

router.use(validateToken)

router.use('/:id(\\d+)/employees', require('./teamEmployeesRoutes'));

router.get('/',getTeams)

router.get('/:id(\\d+)',getTeam)

router.get('/search',teamSearchError,searchTeams)

router.patch('/:id(\\d+)',teamError,updateTeam)

router.post('/',teamError,createTeam)

router.delete('/:id(\\d+)',deleteTeam)

module.exports = router