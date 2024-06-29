// const variables
const templateDir = `\\\\ditfp1\\cliweb\\templates\\angularv15\\15.1.0\\aa-gen`;
const projectDir = "src/app/features";

// define path and fs for updating module, service, component files
let path = require('path');
let fs = require('fs');

module.exports.run = async (targetName) => {
    var sourceFolder, sourceFile, targetFolder;

    targetName = targetName.toLowerCase();
    let sourceName = "xxx-basic";
    let camel = dash2Camel(targetName);
    let pascal = dash2Pascal(targetName);

    // Check if the target folder is already existed
    if (fs.existsSync(`${projectDir}/${targetName}`)) {
        showErrMsg(`Error: features/${targetName} folder is already existed.  Please use a different name.`);
        return;
    }

    // create component root, main folders
    console.log(">>> Creating root folder...");
    fs.mkdirSync(`${projectDir}/${targetName}`);

    // create main folder
    console.log(">>> Creating main folder...")
    fs.mkdirSync(`${projectDir}/${targetName}/${targetName}-main`);

    // Create main component.html file
    sourceFolder = `${templateDir}\\${sourceName}\\${sourceName}-main`;
    sourceFile = `${sourceName}-main.component.html`;
    targetFolder = `${projectDir}/${targetName}/${targetName}-main`;
    targetFile = `${targetName}-main.component.html`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // Create main component.scss file
    sourceFolder = `${templateDir}\\${sourceName}\\${sourceName}-main`;
    sourceFile = `${sourceName}-main.component.scss`;
    targetFolder = `${projectDir}/${targetName}/${targetName}-main`;
    targetFile = `${targetName}-main.component.scss`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // Create main component.ts file
    sourceFolder = `${templateDir}\\${sourceName}\\${sourceName}-main`;
    sourceFile = `${sourceName}-main.component.ts`;
    targetFolder = `${projectDir}/${targetName}/${targetName}-main`;
    targetFile = `${targetName}-main.component.ts`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // Create service.ts file
    sourceFolder = `${templateDir}\\${sourceName}`;
    sourceFile = `${sourceName}.service.ts`;
    targetFolder = `${projectDir}/${targetName}`;
    targetFile = `${targetName}.service.ts`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // Create routing module
    sourceFolder = `${templateDir}\\${sourceName}`;
    sourceFile = `${sourceName}-routing.module.ts`;
    targetFolder = `${projectDir}/${targetName}`;
    targetFile = `${targetName}-routing.module.ts`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // Create module.ts file
    sourceFolder = `${templateDir}\\${sourceName}`;
    sourceFile = `${sourceName}.module.ts`;
    targetFolder = `${projectDir}/${targetName}`;
    targetFile = `${targetName}.module.ts`;
    copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile);

    // add entry in my-navbar-data.ts
    console.log(">>> Adding entry to my-navbar-data.ts file...");
    var contents = fs.readFileSync(`${projectDir}/my-navbar-data.ts`, 'utf8');
    var updated_contents = contents.replace('//%aa-gen-DO-NOT-REMOVE%//', `//%aa-gen-DO-NOT-REMOVE%//\n\t{
        displayName: '${pascal}',
        descr: "Add your description here.",
        iconName: 'fiber_new',
        imgName: "new.jpg",
        route: "/${targetName}/main",
        permissionsOnly: [],
        permissionsExcept: [],
    },`);
    fs.writeFileSync(`${projectDir}/my-navbar-data.ts`, updated_contents);

    // add entry in feature-routing.ts
    console.log(">>> Adding entry to features-routing.ts file...");
    var contents = fs.readFileSync(`${projectDir}/features-routing.module.ts`, 'utf8');
    var updated_contents = contents.replace('//%aa-gen-DO-NOT-REMOVE%//', `{
        \t\tpath: '${targetName}',
        \t\tloadChildren: () => import('./${targetName}/${targetName}.module').then((m) => m.${pascal}Module)
        \t},\n\t\t\t//%aa-gen-DO-NOT-REMOVE%//`);
    fs.writeFileSync(`${projectDir}/features-routing.module.ts`, updated_contents);

    // copy component file
    function copyComponentFile(sourceFolder, sourceFile, targetFolder, targetFile) {
        console.log(`>>> Creating ${targetFile} file...`)
        var contents = fs.readFileSync(`${sourceFolder}\\${sourceFile}`, 'utf8');
        var updated_contents = contents.replace(/XxxBasic/g, pascal).replace(/xxxBasic/g, camel).replace(/xxx-basic/g, targetName);
        fs.writeFileSync(`${targetFolder}/${targetFile}`, updated_contents);
    }
}

// *** General purpose functions **********************************************************/

// convert "my-name" to MyName.
// pascalCase means the first char of every word is capitalized.
function dash2Pascal(str) {
    str += '';
    str = str.split('-');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
    }
    return str.join('');
}

// convert "my-name" to myName.
// camelCase is the same as PascalCase except the first letter of the first word is lowercased.
function dash2Camel(str) {
    return str.replace(/[-]([a-z])/g, function (g) { return g[1].toUpperCase(); })
}


// See this link for how colour flags work: https://misc.flogisoft.com/bash/tip_colors_and_formatting
function showErrMsg(message) {
    console.table(`\x1b[31m ${message} \x1b[0m`);
    console.log(`\x1b[38;5;222m
usage: aa-gen <basic|student|vehicle> <name>
arguments: 
    basic == Basic module with one component.
    student == Sample CRUD module using dialog.
    vehicle == Sample CRUD module using Stepper and messaging.  
    \x1b[0m`);
}