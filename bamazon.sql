-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

-- SELECT * FROM products; --

-- Creates new rows containing data in all named columns --
INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (01, "Carhartt hat", "clothing", 34.99, 30)
, (02, "Fred Perry shirt", "clothing", 55.99, 10)
, (03, "Bike coaches shorts", "athletics", 58.99, 15)
, (04, "iPhone charger", "electronics", 15.99, 100)
, (05, "Cafe du Monde coffee", "grocery", 8.99, 50)
, (06, "Astroball", "books", 19.99, 5)
, (07, "Maglight flashlight", "camping", 24.95, 40)
, (08, "Derek Jeter baseball glove", "athletics", 35.99, 15)
, (09, "Levi's 511 jeans", "clothing", 54.99, 35)
, (10, "Bob Dylan Basement Tapes", "music", 69.99, 12);

SELECT * FROM products;