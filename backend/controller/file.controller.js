const fs = require('fs');
const path = require('path');
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
                // console.log(path.basename(fileStream.path))
                archiveStream.append(fileStream, { name: path.basename(fileStream.path) });
            });
            archiveStream.finalize();
        }).catch((err) => {
            throw new ApiError(500, err)
        })


    }

    fileConvert = async (req, res, next) => {

        const response = await fileService.getConvertedCode('let a = 10', 'c++')

        const { language, extension } = req.body


        let newFilePath = this.public + `\\new\\`

        // clean up new folder

        fileService.clearFolders(this.public + `\\new\\`)
            .then(async () => {

                let currentFile;

                for (var i = 0; i < req.files.length; i++) {
                    let filePath = this.public + `\\uploaded\\`
                    let newFilePath = this.public + `\\new\\`


                    currentFile = req.files[i].originalname

                    filePath += currentFile

                    const fileNameWithoutExtension = path.basename(filePath, path.extname(filePath));


                    const fileData = fileService.readFileData(filePath)
                    fileData.then(async (data) => {
                        newFilePath += fileNameWithoutExtension + extension

                        await fileService.getConvertedCode(data, language).then((converted_data) => {
                            console.log('converted_code', converted_data)

                            let response = fileService.writeCodeToFile(converted_data.text, newFilePath)

                            response.then((written) => {
                                console.log(written)


                                // clean up uploaded folder

                                fileService.clearFolders(this.public + `\\uploaded\\`).then((check) => {

                                    return res.status(200).json({
                                        success: true,
                                        redirect: true
                                    })

                                }).catch((err) => {
                                    throw new ApiError(500, err)
                                })

                            }).catch((err) => {
                                // console.log(err)
                            })
                        })





                    }).catch((err) => {
                        console.log(err)
                        throw new ApiError(500, err)
                    })

                }

            }).catch((err) => {
                throw new ApiError(500, err)
            })



    }

}

module.exports = FileController