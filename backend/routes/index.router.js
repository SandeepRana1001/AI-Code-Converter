const express = require('express');
const router = express.Router()

const fileConversion = require('./file.route')

router.use('/file', fileConversion);

module.exports = router