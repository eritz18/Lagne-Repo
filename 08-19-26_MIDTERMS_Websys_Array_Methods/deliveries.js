const users = [
    { name: "Chiboy", order: "Burger", status: "Delivered" },
    { name: "Golden", order: "Pizza", status: "Pending" },
    { name: "Graygray", order: "Salad", status: "Delivered" },
    { name: "Blackblack", order: "Salad", status: "Delivered" }
];

const delivered = users.filter(user => user.status === "Delivered");

const customerNames = delivered.map(user => user.name);

console.log("Delivered orders:");

customerNames.forEach(name => {
    console.log(name);
});