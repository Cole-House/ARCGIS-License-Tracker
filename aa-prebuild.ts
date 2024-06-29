const fs = require('fs');
const path = require('path');

// tag = tag values defined in package.json and used by CI/CD to build images.
//  values: localhost | intra/int | inter/int | inter/stg | intra/stg | inter/prd | intra/prd
// codeName = project code name defined in package.json and used by /features/my-prebuild-script.js file.
const tag = process.argv[2];
const codeName = process.argv[3];

// Running features/my-prebuild-script.js if it exists with codeName passed as paramater
const myPrebuildFile = "./src/app/features/my-prebuild-script.js"
if (fs.existsSync(myPrebuildFile) && codeName) {
    const myPrebuildModule = require(myPrebuildFile);
    console.log(`Running my-prebuild-script for ${tag}...`);
    myPrebuildModule.exec(tag, codeName)
}

// Crabing gitlab info
const { gitDescribeSync } = require('git-describe');
const packageName = require('./package.json').name;
console.log("Grabing Gitlab info...");
var info;
try {
    //info = gitDescribeSync(__dirname, { match: `[${tag}]` });
    info = gitDescribeSync(__dirname, { match: `${tag}*` });
    if (!info.tag) { info.tag = `localhost`}
} catch (err) {
    info = {
        "dirty": true,
        "raw": "000",
        "hash": "000",
        "distance": null,
        "tag": tag,
        "semver": null,
        "suffix": "000",
        "semverString": null,
    }
}
info.appVersion = require("./package.json").version;
info.buildTimestamp = (new Date()).toLocaleString("en-US", { timeZone: "Pacific/Honolulu" });
info.templateVersion = require("./package.json").templateVersion;;
const infoJson = JSON.stringify(info, null, 2);
fs.writeFileSync(path.join(__dirname, 'src/assets/data/git.json'), infoJson);

console.log(`Building your application to deploy in ${tag}...`);