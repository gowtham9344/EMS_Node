const express = require('express')
const router = express.Router()
const {teamError, teamSearchError} = require('../services/teamError')

router.patch('/:id(\\d+)',teamError)

router.post('/',teamError)

router.get('/search',teamSearchError)

module.exports = router