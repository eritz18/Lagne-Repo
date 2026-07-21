// REAL LIFE EXAMPLE: KUNG MATUTULOG NA AKO O MAGLALARO PA AKO
// Kung may pasok pa ako bukas, matutulog na ako.
// Kung wala akong pasok bukas, maglalaro pa muna ako.
// Pero kung lowbat na ang laptop o cellphone ko, matutulog na lang ako.
// Kung may battery pa, tuloy lang sa paglalaro.

let mayPasok = true;
let lowbat = false;

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("May pasok ka ba bukas? ", (answer) => {
    mayPasok = answer.toLowerCase() === "oo";

    if (mayPasok) {
        console.log("Matutulog na ako dahil may pasok pa ako bukas.");
        rl.close();
    } else {
        rl.question("Lowbat na ba ang laptop o cellphone mo? ", (answer) => {
            lowbat = answer.toLowerCase() === "oo";

            if (lowbat) {
                console.log("Matutulog na lang ako at icha-charge ko muna.");
            } else {
                console.log("Tuloy lang muna ako sa paglalaro!");
            }

            rl.close();
        });
    }
});