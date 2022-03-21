const fs = require("fs");

async function read_write_read() {
  const file2Name = await fs.promises.readFile("file1.txt");
  await fs.promises.writeFile(file2Name, "Hello Wolrd");
  const data = await fs.promises.readFile(file2Name);
  console.log(data.toString());
}

read_write_read();
