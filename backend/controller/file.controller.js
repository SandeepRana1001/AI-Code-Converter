const fs = require('fs');
const path = require('path');
const { zip } = require('zip');
const archiver = require('archiver');
const ApiError = require('../utils/APIError')


const fileData = require('../services/index')
const fileService = new fileData.FileServices()

class FileController {

    constructor() {
        this.public = process.cwd() + '\\files'
    }


    convertFiles = async (req, res, next) => {
        const uploadedFiles = fileService.getAllFileNames(this.public + `\\new`)
        // const response = await fileService.readFileData()
    }

    getFile = async (req, res, next) => {

        const { language } = req.params

        fileService.getAllFileNames(this.public + `\\new`).then((data) => {

            // Create an array of file streams
            const fileStreams = data.map((filePath) => fs.createReadStream(this.public + `\\new\\` + filePath));

            // Set the appropriate headers for the response
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', `attachment; filename=${language}.zip`);

            // Pipe the file streams to the response object
            const archiveStream = archiver('zip');
            archiveStream.pipe(res);
            fileStreams.forEach((fileStream) => {
                console.log(path.basename(fileStream.path))
                archiveStream.append(fileStream, { name: path.basename(fileStream.path) });
            });
            archiveStream.finalize();
        }).catch((err) => {
            throw new ApiError(err, 500)
        })


    }

    fileConvert = async (req, res, next) => {

        let filePath = this.public + `\\uploaded\\`

        fileService.clearFolders(this.public + `\\new\\`)

        for (var i = 0; i < req.files.length; i++) {
            filePath += req.files[i].originalname
            const fileData = fileService.readFileData(filePath)
            fileData.then((data) => {
                console.log(data)
            }).catch((err) => {
                throw new APIError(err, 500)
            })

        }

        fileService.clearFolders(this.public + `\\uploaded\\`)



        // Return a response to the client
        res.status(200).json({
            success: true,
            redirect: true
        })

        // res.download(filePath, '1.js')
    }

}

module.exports = FileController