const fs = require("fs");
const path = require("path");
const pathFolder = path.join(__dirname, "secret-folder");

fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err); 
} else {
    files.forEach(file => {
        let nameFile = file.name.split('.').slice(0, -1).join('.');
        let extFile = path.extname(file.name).slice(1);
        let sizeFile;
        let pathFolder = path.join(__dirname, "secret-folder", file.name);
        fs.stat(pathFolder, (err, stats) => {
            if (err) {
                console.log(err);
            } else {
                sizeFile = stats.size;
                if (file.isFile()) {
                    console.log(`${nameFile} - ${extFile} - ${(sizeFile / 1024)}kb`);
                }
            }
        })
    })
}
})