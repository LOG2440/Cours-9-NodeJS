const fs = require('fs');

fs.promises.readFile("file1.txt")
   .then(file2Name => {
       fs.promises.writeFile(file2Name, "Hello Wolrd")
       return file2Name
   })
   .then(file2Name => {return fs.promises.readFile(file2Name)})
   .then(data => console.log(data.toString()))
