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

try {
    $conn = new PDO("mysql:host=" . $servername . ";dbname=" . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";

    if (isset($_POST['submit'])) {
        $PhoneNumber = test_input($_POST['phone']);
        $AppDate = test_input($_POST['appointment_date']);
        $AppTime = test_input($_POST['appointment_time']);

        // Validate phone number (only numbers allowed)
        if (!preg_match("/^[0-9]*$/", $PhoneNumber)) {
            echo "Invalid phone number. Only numbers allowed.";
            exit;
        }

        // Wrap string values in quotes and use prepared statements
        $sql = "DELETE FROM `appointment` WHERE `App_Date`= :AppDate and `App_Time`= :AppTime and `Phone_Number`= :PhoneNumber";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':AppDate', $AppDate);
        $stmt->bindParam(':AppTime', $AppTime);
        $stmt->bindParam(':PhoneNumber', $PhoneNumber);
        $stmt->execute();

        echo "Row deleted successfully";
        echo "<script>window.location.href = 'home.html';</script>";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
} finally {
    $conn = null;
}
