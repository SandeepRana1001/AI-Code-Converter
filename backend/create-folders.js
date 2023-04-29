const fs = require('fs');

const createFolder = (name, location = '') => {
    if (location.trim().length > 0) {
        name = location + name
    }
    // Create a new directory
    fs.mkdir(name, (err) => {
        if (err) {
        } else {
        }
    });

}

module.exports = createFolder