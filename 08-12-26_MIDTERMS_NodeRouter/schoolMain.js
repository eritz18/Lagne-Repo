const readline = require("readline");

const routes = require("./schoolRoutes.json");

const openClassroom = require("./classroom");
const openLibrary = require("./library");
const openCanteen = require("./canteen");
const openGuidance = require("./guidance");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("=== SCHOOL ROUTER ===");
console.log("classroom");
console.log("library");
console.log("canteen");
console.log("guidance");
console.log("exit");

function askQuestion() {

    rl.question("Where do you want to go? ", (choice) => {

        if (choice === "classroom") {
            openClassroom(routes.classroom);
        }
        else if (choice === "library") {
            openLibrary(routes.library);
        }
        else if (choice === "canteen") {
            openCanteen(routes.canteen);
        }
        else if (choice === "guidance") {
            openGuidance(routes.guidance);
        }
        else if (choice === "exit") {
            console.log("Goodbye!");
            rl.close();
            return;
        }
        else {
            console.log("Place not found.");
        }

        askQuestion();
    });
}

askQuestion();