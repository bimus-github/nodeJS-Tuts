// const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const fileSystem = async () => {
  try {
    // const data = await fsPromises.readFile(
    //   path.join(__dirname, "docs", "example.txt"),
    //   "utf-8"
    // );
    // // console.log("file: ", data);

    // const result = await fsPromises.writeFile(
    //   path.join(__dirname, "docs", "new.txt"),
    //   "This is new text ..."
    // );
    // console.log("file created: ", result);

    await fsPromises.appendFile(
      path.join(__dirname, "docs", "example.txt"),
      "\nThis is another text!"
    );
  } catch (error) {
    console.log(error);
  }
};

// fileSystem();

// fs.readFile("./docs/example.txt", "utf-8", (err, data) => {
//   if (err) console.log(err);

//   console.log("file: ", data);
// });

// console.log("hello");

// fs.writeFile(
//   path.join(__dirname, "docs", "new.txt"),
//   "This is new text",
//   (err) => {
//     if (err) console.log(err);

//     console.log("file created");
//   }
// );

// fs.appendFile("./docs/new.txt", "\nthis is another text!", (err) => {
//   if (err) console.log(err);

//   console.log("file appended");
// });

const result = fs.existsSync(path.join(__dirname, "files"));

if (!result) {
  fs.mkdirSync(path.join(__dirname, "files"));
}
