const express = require('express')

const {signup, signin} = require('../controllers/user.js')

const router = express.Router()

router.post('/signup', signup)  //register
router.post('/signin', signin)

module.exports = router