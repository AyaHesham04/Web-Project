<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "drpetproject";

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (isset($_POST['submit'])) {

    try {
        $conn = new PDO("mysql:host=" . $servername . ";dbname=" . $dbname, $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully";
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        die(); // Add this to stop execution in case of a connection error
    }

    $RequestID = $_POST['requestID'];
    $FirstName = test_input($_POST['firstname']);
    $LastName = test_input($_POST['lastname']);
    $Email = test_input($_POST['email']);
    $PhoneNumber = test_input($_POST['phone']);
    $OrderID = test_input($_POST['ordernum']);
    $ProductID = test_input($_POST['productID']);
    $Reason = test_input($_POST['reason']);
    $Quantity = test_input($_POST['quantity']);

    // Use prepared statements to prevent SQL injection
    $sql = "INSERT INTO `productreturn`(`ReturnRequest_ID`, `CusFirst_Name`, `CusLast_Name`, `CusEmail`, `CusPhone_Number`, `Order_ID`, `Product_ID`, `Reason`, `ReturnQuantity`) 
            VALUES (:RequestID, :FirstName, :LastName, :Email, :PhoneNumber, :OrderID, :ProductID, :Reason, :Quantity)";

    $updateSql = "UPDATE `productstable` SET `Product_StockQuantity` = `Product_StockQuantity` + :Quantity WHERE `Product_ID` = :ProductID";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':RequestID', $RequestID, PDO::PARAM_INT);
    $stmt->bindParam(':FirstName', $FirstName);
    $stmt->bindParam(':LastName', $LastName);
    $stmt->bindParam(':Email', $Email);
    $stmt->bindParam(':PhoneNumber', $PhoneNumber);
    $stmt->bindParam(':OrderID', $OrderID);
    $stmt->bindParam(':ProductID', $ProductID);
    $stmt->bindParam(':Reason', $Reason);
    $stmt->bindParam(':Quantity', $Quantity, PDO::PARAM_INT);

    $update = $conn->prepare($updateSql);
    $update->bindParam(':ProductID', $ProductID, PDO::PARAM_INT);
    $update->bindParam(':Quantity', $Quantity, PDO::PARAM_INT);

    try {
        $stmt->execute();
        echo "Record inserted successfully";

        $update->execute();
        echo "Record updated successfully";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    echo "DONE SUCCESSFULLY";
    echo "<script>window.location.href = 'home.html';</script>";

    $conn = null;
}
