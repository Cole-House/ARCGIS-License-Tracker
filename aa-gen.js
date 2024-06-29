const aaGenBasic = require("./aa-gen-basic.js");
const aaGenStudent = require("./aa-gen-student.js");
const aaGenVehicle = require("./aa-gen-vehicle.js");

// Check for missing command line parameters.
// argv[2] is the schenatic name <basic|student|vehicle>.
let sourceType = process.argv[2];
if (!sourceType) {
    showErrMsg('The syntax for aa-gen comamnd is incorrect.');
    process.exit();
}
if (!['basic', 'student', 'vehicle'].includes(sourceType)) {
    showErrMsg('The syntax for aa-gen comamnd is incorrect.');
    process.exit();
}

// Check for module name from the command line parameter 
let targetName = process.argv[3];
if (!targetName) {
    showErrMsg('The syntax for aa-gen comamnd is incorrect.');
}

if ((sourceType) === "basic") {
    aaGenBasic.run(targetName);
}

if ((sourceType) === "student") {
    aaGenStudent.run(targetName);
}

if ((sourceType) === "vehicle") {
    aaGenVehicle.run(targetName);
}

/*** General function *******************************************************/
// See this link for how colour flags work: 
// https://misc.flogisoft.com/bash/tip_colors_and_formatting
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
