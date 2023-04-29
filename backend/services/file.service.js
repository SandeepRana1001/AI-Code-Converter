const fs = require('fs');
const path = require('path');

const config = require('../config')

class FileServices {

    constructor() {
        this.public = process.cwd() + '\\files'
    }

    getAllFileNames = (folderPath) => {
        return new Promise((resolve, reject) => {
            // Read the contents of the folder
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Filter out directories and return only file names
                const fileNames = files.filter(file => {
                    const filePath = path.join(folderPath, file);
                    return fs.statSync(filePath).isFile();
                });

                resolve(fileNames);
            });
        });
    };

    readFileData = (filePath) => {

        return new Promise((resolve, reject) => {

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(data); // Store file data in global variable
            });
        })
    }

    deleteFile = async (filePath) => {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                    throw err; // Throw the error for further handling
                }
                resolve(true)
            });
        })
    }


    clearFolders = async (folderPath = this.public + `\\new`) => {

        this.getAllFileNames(folderPath).then((data) => {
            data.map((file) => {
                this.deleteFile(folderPath + '\\' + file)
                    .then((data) => {
                    }).catch(err => {
                    })
            })
        }).catch((err) => {
        })

    }


    getConvertedCode = async (code, convertTo) => {
        const prompt = `${code} 
        Covert the code to ${convertTo}
            ###
        `
        const completion = await config.openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 100,
        });


        return completion.data.choices[0]


    }


    writeCodeToFile = async (content, filePath) => {


        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            });
        })

    }
}

module.exports = FileServices