const {readFile, writeFile, copyFile, appendFile, rmdir, mkdir, readdir, unlink} = require("fs").promises;
const path = require("path");
const destPath = path.join(__dirname, "project-dist");
const componPath = path.join(__dirname, "components");
const assetsPath = path.join(__dirname, "assets");
const stylePath = path.join(__dirname, "styles");

async function readFiles(src) {
    const files = await readdir(src, {withFileTypes: true});

    return files;
}

async function delFiles(folder) {
    const files = await readFiles(folder);

    for (const file of files) {
        if (file.isDirectory()) {
            await delFiles(path.join(folder, file.name));
            await rmdir(path.join(folder, file.name));
      } else {
        await unlink(path.join(folder, file.name));
      }
    }
  }

  async function copyFiles(src, dest, files) {
    for (const file of files) {
      copyFile(path.join(src, file.name), path.join(dest, file.name));
    }
  }

  async function createDir(dest) {
    await mkdir(dest, {recursive: true});
}

(async function () {
    await createDir(destPath);
    await delFiles(destPath);
    let srcHTML = await readFile(path.join(__dirname, "template.html"), "utf-8");
    const components = await readFiles(componPath);
    for (const comp of components) {
        if (comp.name.split(".")[1] === "html") {
            const compSrc = await readFile(path.join(componPath, comp.name), "utf-8");
            const compName = comp.name.split(".")[0];
            srcHTML = srcHTML.replace(`{{${compName}}}`, compSrc);
        }
    }
    await writeFile(path.join(destPath, "index.html"), srcHTML);

    const styles = await readFiles(stylePath);
    for (const style of styles) {
        const styleSrc = await readFile(path.join(stylePath, style.name), "utf-8");
        const styleDest = path.join(destPath, "style.css");
        await appendFile(styleDest, `${styleSrc}`);
    }

    const assetsDest = path.join(destPath, "assets");
    await mkdir(assetsDest);
    const assets = await readFiles(assetsPath);
    for (const asset of assets) {
        await createDir(path.join(assetsDest, asset.name));

        const files = await readFiles(path.join(assetsPath, asset.name));
        await copyFiles(path.join(assetsPath, asset.name), path.join(assetsDest, asset.name), files);
    }
  })
  ();