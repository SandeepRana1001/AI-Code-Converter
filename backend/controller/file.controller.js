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

            const topProgrammingLanguages = {
                "javascript": ".js",
                "html": ".html",
                "css": ".css",
                "python": ".py",
                "java": ".java",
                "c++": ".cpp",
                "c#": ".cs",
                "typescript": ".ts",
                "go": ".go",
                "ruby": ".rb",
                "swift": ".swift",
                "kotlin": ".kt",
                "rust": ".rs",
                "php": ".php",
                "shell scripting (e.g. bash)": ".sh",
                "sql": ".sql",
            };

            // Set the appropriate headers for the response
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', `attachment; filename=${topProgrammingLanguages[language]}.zip`);

            // Pipe the file streams to the response object
            const archiveStream = archiver('zip');
            archiveStream.pipe(res);
            fileStreams.forEach((fileStream) => {
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

        const zipFileName = extension.split('.')[1]


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

                            console.log(converted_data)

                            let response = fileService.writeCodeToFile(converted_data.text, newFilePath)

                            response.then((written) => {


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
                            })
                        })





                    }).catch((err) => {
                        throw new ApiError(500, err)
                    })

                }

            }).catch((err) => {
                throw new ApiError(500, err)
            })



    }

}

module.exports = FileController