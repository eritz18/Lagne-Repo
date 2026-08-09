// REAL LIFE EXAMPLE: KON MATULOG NA KO O MAHAMPANG PA
// Kon may eskwela ako buas, matulog na ko.
// Kon wala ko eskwela buas, maghampang pa anay ko.
// Pro kon lowbat na laptop ukon cellphone ko, matulog na lang ko.
// Kon may battery pa, ti hampang gyapon.

let mayEskwela = true;
let lowbat = false;

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("May eskwela ka buas? ", (answer) => {
    mayEskwela = answer.toLowerCase() === "huo";

    if (mayEskwela) {
        console.log("Matulog na ko kay may eskwela pa ko buas.");
        rl.close();
    } else {
        rl.question("Lowbat na imo laptop o cellphone? ", (answer) => {
            lowbat = answer.toLowerCase() === "huo";

            if (lowbat) {
                console.log("Matulog na lang ko i-charge ko anay.");
            } else {
                console.log("Ti mahampang la ko anay!");
            }

            rl.close();
        });
    }
});