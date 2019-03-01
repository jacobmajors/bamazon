// Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// Connect to the mysql and sql database
connection.connect(function(err) {
    if (err) throw err;
});

// List available items for sale
function start() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log("\nAVAILABLE INVENTORY");
    console.log("---------------------------------------------------------------\n");
    
    // // Loop through product information to display all at once
    var displayScreen = "";
		for (var i = 0; i < res.length; i++) {
			displayScreen = "";
			displayScreen += "Item ID: " + res[i].id + "  ||  ";
			displayScreen += "Product Name: " + res[i].product_name + "  ||  ";
			displayScreen += "Department: " + res[i].department_name + "  ||  ";
            displayScreen += "Price: $" + res[i].price + "  ||  ";
            displayScreen += "In Stock: " + res[i].stock_quantity + "\n";

			console.log(displayScreen);
		}

        console.log("----------------------------------------------------------------------\n");
          
    // Initialize user input
    userPrompt();
});
};

// Ask user what they want to do
function userPrompt() {
    inquirer.prompt([
        {
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to purchase: ",
        // Ensure that the value is valid
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
        },
        {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
        }
    ])

    // Answers return based on the mysql database availability
    .then(function(answer) {
        var Product = answer.item;
        var Amount = answer.quantity;

        connection.query("SELECT * FROM products WHERE ?", {
            id: answer.item
        },function(err, res) {

            // Determine if there are enough items
            if (Product > res[0].stock_quantity){
                console.log("\nThere aren't enough items in stock!\n");
            userPrompt();
            }
            else {
                console.log("\nYou can buy the item!");

                // Update quantity and keep track of cost
                var newQuantity = (res[0].stock_quantity - Amount);
                var Subtotal = (res[0].price * Amount);

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    id: Product
                }], function(err, res) {
                    console.log("\nYour total cost was $" + Subtotal);

                    // Start over with updated database
                    start();
                })
            }
        });
    });
}

start();