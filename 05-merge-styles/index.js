const fs = require("fs");
const path = require("path");
const distFile = path.join(__dirname, "project-dist", "bundle.css")
const styleFile = path.join(__dirname, "styles")

fs.open(distFile, "w", (err) => {
    if (err) {
        console.log(err);
    }

    fs.readdir(styleFile, {withFileTypes: true}, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                const pathFile = path.join(__dirname, "styles", file.name);
                const extFile = path.extname(file.name).slice(1);

                fs.readFile(pathFile, "utf8", (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (extFile === "css") {

                            fs.appendFile(distFile, data, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        }
                    }
                })
            });
        }
    })
});