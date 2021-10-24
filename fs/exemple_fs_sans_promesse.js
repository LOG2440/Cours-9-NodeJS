const fs = require('fs');
function readMultipleFiles() {
    fs.readFile("file1.txt", (err, data) => {
        const newFileName = data.toString();
        fs.writeFile(newFileName,"Hello World",(err) => {
            fs.readFile(newFileName,(err, dataFile2) => {
                console.log(dataFile2.toString());
            });
        });
    });
}

readMultipleFiles()