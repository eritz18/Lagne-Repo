function calculateTicketPrice(age) {
    if (age < 13) {
        return 150;
    } else if (age < 60) {
        return 250;
    } else {
        return 180;
    }
}

function calculateTotal(price, quantity) {
    return price * quantity;
}

module.exports = {
    calculateTicketPrice,
    calculateTotal
};