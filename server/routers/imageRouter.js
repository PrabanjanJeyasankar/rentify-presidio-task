const express = require('express')
const { getFileByName } = require('../controllers/imageController')
const router = express.Router()

router.get('/:image', getFileByName)

module.exports = router