const { testController } = require('../controller/testcontroller')
const express = require('express')
const router = express.Router()

router.get('/',testController)

module.exports = router