const readline = require('readline');

const { calculateTicketPrice, calculateTotal } = require('./ticket');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your age: ", function(ageInput) {

    rl.question("Enter number of tickets: ", function(quantityInput) {

        const age = Number(ageInput);
        const quantity = Number(quantityInput);

        const price = calculateTicketPrice(age);
        const total = calculateTotal(price, quantity);

        console.log("\n--- Ticket Information ---");
        console.log("Age: " + age);
        console.log("Ticket Price: ₱" + price);
        console.log("Number of Tickets: " + quantity);
        console.log("Total Cost: ₱" + total);

        rl.close();
    });

});