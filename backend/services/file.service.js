const fs = require('fs');
const path = require('path');

class FileServices {
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

}

module.exports = FileServices