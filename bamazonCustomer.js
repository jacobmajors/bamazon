// Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon_db"
});

// Connect to the mysql and sql database
connection.connect(function(err) {
    if (err) throw err;
});

// List available items for sale
function start() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i=0; i<res.length; i++) {
            console.log(res[i].id + "     | " + res[i].product_name + " -- " + res[i].department_name + "--" + res[i].price + "--" + res[i].stock_quantity);
        };

        userPrompt();
    })
};

var userPrompt = function() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Enter the ID of the item you would like to purchase.",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }])
    .then(function(answer) {
        var Product = answers.item;
        var Amount = answers.quantity;

        connection.query("SELECT * FROM products WHERE ?", {
            id: answers.item
        },function(err, res) {
            if (Product > res[0].stock_quantity){
                console.log("There aren't enough items in stock!");
            userPrompt();
            }
            else {
                console.log("You can buy the item!");

                var newQuantity = (res[0].stock_quantity - Amount);
                var Subtotal = (res[0].price * Amount);

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    id: Product
                }], function(err, res) {
                    console.log("Your total cost was $" + Subtotal);

                    userPrompt();
                })
            }
        })
    })
}

