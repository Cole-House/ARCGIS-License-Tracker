// define path and fs for updating module, service, component files
const path = require("path");
const fs = require("fs");
const micromatch = require("micromatch");

// const variables
const sampleDir = "../angularv15-gui";
const seedDir = "../angular-seed-gui/angularv15-seed-gui";

// delete files and folders
const ignoreFoldersForDelete = [
    ".git",
    "node_modules",
];
console.log("Removing project files and folders...");
deleteFolderRecursive(seedDir);

// copy files and folders
const ignoreFoldersForCopy = [
    ".git",
    "dist",
    "node_modules",
    "apex-charts",
    "dixie",
    "local-storage",
    "doctor",
    "oauth-ui",
    "samples-ui",
    "xxx-student",
    "xxx-vehicle"
];
const ignoreFilesForCopy = [
    "aa-update*",
    "features-routing.module*.ts",
    "my-navbar-data*.ts"
];
console.log("Copying project files and folders...");
copyFolderRecursive(sampleDir, seedDir);

// copy seed files
const seedFiles = [
    { 
        from: `${sampleDir}/src/app/features/features-routing.module-seed.ts`, 
        to: `${seedDir}/src/app/features/features-routing.module.ts` 
    },
    { 
        from: `${sampleDir}/src/app/features/my-navbar-data-seed.ts`, 
        to: `${seedDir}/src/app/features/my-navbar-data.ts` 
    }
];
console.log("Copying seed files...");
copyFiles(seedFiles);

// *** general functions **********************************************
function copyFiles(files) {
    files.forEach(aFile => {
        fs.copyFileSync(aFile.from, aFile.to);
    })
}

// remove collection of files
function deleteFiles(files) {
    files.forEach(aFile => {
        fs.unlinkSync(aFile);
    });
}

// copy sub folder and files
function copyFolderRecursive(from, to) {
    // dont create root folder
    if (to != seedDir) { fs.mkdirSync(to); }
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            // exclude ignored files 
            if (!micromatch.isMatch(element, ignoreFilesForCopy)) {
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            }
        } else {
            // exclude ingored folders.
            if (!ignoreFoldersForCopy.includes(element)) {
                // eslint-disable-next-line no-unused-vars
                copyFolderRecursive(path.join(from, element), path.join(to, element));
            }
        }
    });
}

// remove a folder and delete files
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const aPath = path.join(folderPath, file);
            if (fs.lstatSync(aPath).isDirectory()) {
                // eslint-disable-next-line no-unused-vars
                if (!ignoreFoldersForDelete.includes(file)) {
                    deleteFolderRecursive(aPath);
                }
            } else { 
                // delete file
                fs.unlinkSync(aPath);
            }
        });
        // dont remove root folder
        if (folderPath != seedDir) { fs.rmdirSync(folderPath); }
    }
}