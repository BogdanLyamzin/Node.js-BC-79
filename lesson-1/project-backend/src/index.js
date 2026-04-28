// import {readFile} from "node:fs";
import {readFile, appendFile, writeFile, unlink} from "node:fs/promises";
import {join, resolve} from "node:path";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

// const filePath = join(process.cwd(), "src", "files", "file.txt");
const filePath = resolve("src", "files", "file.txt");
// console.log(filePath);

const fileOPerations = async()=> {
  // const buffer = await readFile(filePath);
  // const text = buffer.toString();
  // console.log(text);
  // const text = await readFile(filePath, "utf-8");
  // console.log(text);
  // const {encoding} = await DetectFileEncodingAndLanguage(filePath);
  // const text = await readFile(filePath, encoding);
  // console.log(text);
  // await appendFile(filePath, "\nPHP forever");
  // await writeFile(filePath, "Mojo - your choice!");
  // await readFile("src/files/file2.txt");
  // await appendFile("src/files/file2.txt", "\nPHP forever");
  // await writeFile("src/files/file3.txt", "Mojo - your choice!");
  // await unlink("src/files/file3.txt");
};

fileOPerations();

// try {
//   const data = await readFile("src/files/file.txt");
//   console.log(data);
// }
// catch(error) {
//   console.log(error);
// }
// readFile("src/files/file.txt")
//   .then(data => console.log(data))
//   .catch(error => console.log(error));

// readFile("src/files/file.txt", (error, data)=> {
//   console.log(error);
//   console.log(data);
// });
