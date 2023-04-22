const fs = require('fs');
const path = require('path');
const { zip } = require('zip');
const archiver = require('archiver');

const fileData = require('../services/index')
const fileService = new fileData.FileServices()

class FileController {

    constructor() {
        this.public = process.cwd() + '\\files'
    }

    // protected route
    // _getFile = (file) => {

    //     const filePath = this.public + '\\' + file

    //     console.log(filePath)

    //     // Read the file

    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }

    //         // Copy the data to a variable
    //         const fileData = data;

    //         return fileData
    //     })
    // }

    // Function to zip files
    ;


    getFile = async (req, res, next) => {

        const filePath = this.public + `\\1.js`
        const data = await fileService.getAllFileNames(this.public)
        console.log(data)

        // const fileStream = fs.createReadStream(filePath);

        // // Set the response headers for the file download
        // res.setHeader('Content-Type', 'application/octet-stream');
        // res.setHeader('Content-Disposition', 'attachment; filename=1.js'); // Replace with the desired filename

        // // Pipe the file stream to the response
        // fileStream.pipe(res);


        // Create an array of file streams
        const fileStreams = data.map((filePath) => fs.createReadStream(this.public + `\\` + filePath));

        // Set the appropriate headers for the response
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=files.zip');

        // Pipe the file streams to the response object
        const archiveStream = archiver('zip');
        archiveStream.pipe(res);
        fileStreams.forEach((fileStream) => {
            archiveStream.append(fileStream, { name: path.basename(fileStream.path) });
        });
        archiveStream.finalize();

    }

    fileConvert = async (req, res, next) => {
        const filePath = this.public + `\\1.js`
        res.download(filePath, '1.js')
    }

}

module.exports = FileController