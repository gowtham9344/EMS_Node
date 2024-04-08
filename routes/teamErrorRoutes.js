const express = require('express')
const router = express.Router()
const {teamError, teamSearchError} = require('../services/teamError')
const validateToken = require('../middleware/validateTokenHandler')

router.use(validateToken)

router.patch('/:id(\\d+)',teamError)

router.post('/',teamError)

router.get('/search',teamSearchError)

module.exports = router