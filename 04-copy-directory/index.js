const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

async function newPath() {
    fs.mkdir(path.join(__dirname, "files-copy"), err => {
        if (err) throw err;
        console.log("Готово!");
    });
}

function copyFiles() {
    fs.readdir(path.join(__dirname, "files"), {withFileTypes: true}, (err, files) => {
        if(err) {
            console.log(err);
        } else {
            files.forEach(file => {
                let fileName = file.name;
                fsPromises.copyFile(path.join(__dirname, "files", `${fileName}`), path.join(__dirname, "files-copy", `${fileName}`));
            })
        }
    })
}

async function copy() {
    await fsPromises.rm(path.join(__dirname, "files-copy"), { recursive: true, force: true });
    fs.stat(path.join(__dirname, "files-copy"), (err) => {
        if(err) {
            newPath();
        }
        copyFiles();
    })
}
copy();