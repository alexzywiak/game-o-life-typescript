const args = require("yargs").argv;
const path = require("path");
const fs = require("fs-extra");
const glob = require("glob");

const getDirectories = src => {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/*`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

(async () => {
  const results = await getDirectories(args.dir);
  results.forEach(async result => {
    const stats = await fs.stat(result);
    if (stats.isFile()) {
      const fileContent = await fs.readFile(result);
      if (fileContent.toString().match(/import\s+[Rr]eact/)) {
        console.log(result);
        await fs.rename(result, result.replace(/\.[^/.]+$/, ".tsx"));
      }
    }
  });
})();
