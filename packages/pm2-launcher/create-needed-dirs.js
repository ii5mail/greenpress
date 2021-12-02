const { join } = require("path");
const { existsSync, mkdirSync } = require("fs");

const config = require("./config");

["./db-data", "./tmp"].map((path) => {
  const fullPath = join(config.appAbsolutePath, path);
  if (!existsSync(fullPath)) {
    console.log(`creating ${path} folder..`);
    fs.mkdir(fullPath, { recursive: true }, (err) => {
      if (err) throw err;
    });

    console.log("created!");
  } else {
    console.log(path + " folder already exists.");
  }
});
