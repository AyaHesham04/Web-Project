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

function test_input($data)
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

echo "DONE";
try {
  $conn = new PDO("mysql:host=" . $servername . ";dbname=" . $dbname, $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";

  if (isset($_POST['submit'])) {
    $PaymentID = $_POST['paymentID'];
    $CardNumber = test_input($_POST['cardNumber']);
    $CardHolderName = test_input($_POST['cardHolderName']);
    $CardCVV = test_input($_POST['cardCVV']);
    $ExpMonth = test_input($_POST['expyr']);
    $ExpYear = test_input($_POST['expmon']);

    // Validate cardHolderName (only letters and spaces allowed)
    if (!preg_match("/^[a-zA-Z ]*$/", $CardHolderName)) {
      echo "Invalid name. Only letters and spaces allowed.";
      exit;
    }

    // Validate cardNumber (only numbers allowed)
    if (!is_numeric($CardNumber)) {
      echo "Invalid card number. Only numbers allowed.";
      exit;
    }

    // Validate CardCVV (only numbers and exactly 3 characters allowed)
    if (!preg_match("/^[0-9]{3}$/", $CardCVV)) {
      echo "Invalid CVV. It must be a 3-digit number.";
      exit;
    }

    $sql = "INSERT INTO `payment`( `CardNumber`, `CardHolderName`, `ExpMonth`, `ExpYear`, `CardCVV`) VALUES ('$CardNumber','$CardHolderName','$ExpMonth','$ExpYear','$CardCVV')";
    $conn->exec($sql);

    echo "DONE SUCCESSFULLY";
    echo "<script>window.location.href = 'final.html';</script>";

    $conn = null;
  }
} catch (PDOException $e) {
  echo "Connection failed" . $e->getMessage();
  exit;
}
