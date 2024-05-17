<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "drpetproject";

try {
    $conn = new PDO("mysql:host=" . $servername . ";dbname=" . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";

    // Get the JSON data from the request body
    $json = file_get_contents('php://input');
    $orderData = json_decode($json, true);

    // Check if the 'cart' key exists in the decoded JSON data
    if (isset($orderData)) {
        // Access the 'cart' array
        $cart = $orderData;

        $total = 0;

        foreach ($cart as $item) {
            // Assuming your table structure has columns like 'product_id' and 'quantity'
            $productId = $item['ID'];
            $quantity = $item['quantity'];
            $price = $item['Price'];

            $total += $quantity * $price;

            $updateQuery = "UPDATE `productstable` SET `Product_StockQuantity` = `Product_StockQuantity` - :quantity WHERE `Product_ID` = :productId";
            $stmt = $conn->prepare($updateQuery);
            $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);

            if (!$stmt->execute()) {
                // If the execution fails, throw an exception
                throw new Exception("Error executing query: " . $stmt->errorInfo()[2]);
            }
        }

        $today = date("Y-m-d");
        $orderID = rand(0, 1000);
        $insertOrderQuery = "INSERT INTO `final_order`(`Order_ID`, `Order_Date`, `Order_TotalAmount`) VALUES (:orderID, :today, :total)";
        $stmtInsertOrder = $conn->prepare($insertOrderQuery);
        $stmtInsertOrder->bindParam(':orderID', $orderID, PDO::PARAM_INT);
        $stmtInsertOrder->bindParam(':today', $today, PDO::PARAM_STR);
        $stmtInsertOrder->bindParam(':total', $total, PDO::PARAM_INT);
        $stmtInsertOrder->execute();

        echo json_encode(['message' => 'Order placed successfully']);
    } else {
        // Invalid or empty data format
        echo json_encode(['error' => 'Invalid or empty data format']);
    }
} catch (PDOException $e) {
    // Handle PDO exceptions
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle other exceptions
    echo json_encode(['error' => 'An unexpected error occurred: ' . $e->getMessage()]);
} finally {
    // Close the database connection
    $conn = null;
}
