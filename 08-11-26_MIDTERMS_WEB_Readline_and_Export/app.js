async function runApp(input) {

    const name = await input.question("Enter student name: ");

    if (name === "Chiboy") {

        console.log("Chiboy is enrolled.");

    } else if (name === "Chacha") {

        console.log("Chacha is enrolled.");

    } else if (name === "Chichi") {

        console.log("Chichi is enrolled.");

    } else if (name === "exit") {

        console.log("Program ended.");
        return false;

    } else {

        console.log("Student not found.");

    }

    return true;
}

module.exports = {
    runApp
};