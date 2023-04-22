const express = require('express');
const router = express.Router()

const tryCatch = require('../utils/tryCatch')

const fileController = require('../controller/index.controller')
const file = new fileController.fileController()

router.get('/', tryCatch(file.getFile));


router.post('/fileconvert', tryCatch(file.fileConvert));

module.exports = router