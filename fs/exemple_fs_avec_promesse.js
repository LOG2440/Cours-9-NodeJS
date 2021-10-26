function readFilePromise(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name,(err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
}
 
function writeFilePromise(fileName, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

const fs = require('fs');
const textToWrite = 'Hello World';
const fileName = 'file1.txt';
readFilePromise(fileName)
 .then(async file2Name => {
   await writeFilePromise(file2Name, textToWrite);
   return file2Name; })
 .then(file2Name => readFilePromise(file2Name))
 .then(data =>console.log(data))
