const multer = require('multer')
const path = require("path")
const fs = require("fs")
let fileUpload;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/uploaded/')
    },
    filename: async function (req, file, cb) {
        let fileName = file.originalname
        const Imagepath = process.cwd() + '\\files\\' + fileName
        if (fs.existsSync(Imagepath)) {
            fileName = fileName + Date.now()
        }

        cb(null, fileName);
    },
})
fileUpload = multer({
    limit: 500000,
    storage
});
module.exports = fileUpload;