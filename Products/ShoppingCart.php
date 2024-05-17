<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'get') {

    // Retrieve data from the POST request
    $proName = isset($_POST['pname']) ? $_POST['pname'] : '';
    $proPrice = isset($_POST['price']) ? $_POST['price'] : '';

    // Do something with the data (e.g., store it in a database)

    // Example: Print the received data
    echo "Product Name: " . $proName . "<br>";
    echo "Product Price: " . $proPrice;
} else {
    // If the request method is not POST, return an error or handle it accordingly
    echo "Invalid request method";
}
