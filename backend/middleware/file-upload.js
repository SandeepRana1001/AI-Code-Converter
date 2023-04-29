const multer = require('multer')
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
let fileUpload;

let file_path = 'files/uploaded'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, file_path)
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        // const Imagepath = file_path + fileName
        // if (fs.existsSync(Imagepath)) {
        //     fileName = fileName + Date.now()
        // }


        cb(null, fileName);
    },
})

fileUpload = multer({
    limit: 500000,
    storage
});


module.exports = fileUpload;