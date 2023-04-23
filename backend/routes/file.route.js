const express = require('express');
const router = express.Router()

const tryCatch = require('../utils/tryCatch')

const fileController = require('../controller/index.controller')
const file = new fileController.fileController()
const fileUpload = require('../middleware/file-upload')


router.get('/:language', tryCatch(file.getFile));


router.post(
    '/fileconvert',
    fileUpload.array('files', 5),
    tryCatch(file.fileConvert)
);

module.exports = router