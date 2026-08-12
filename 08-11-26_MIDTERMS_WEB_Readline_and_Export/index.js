const input = require("./input");
const app = require("./app");

async function main() {

    console.log("Student Checker");

    let running = true;

    while (running) {
        running = await app.runApp(input);
    }

    input.close();
}

main();