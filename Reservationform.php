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

$error_message = "Appointment time already chosen before. Please choose another time.";

try {
    $conn = new PDO("mysql:host=" . $servername . ";dbname=" . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";

    if (isset($_POST['submit'])) {
        $Name = test_input($_POST['name']);
        $Email = test_input($_POST['email']);
        $PhoneNumber = test_input($_POST['phone']);
        $AppDate = test_input($_POST['appointment_date']);
        $AppTime = test_input($_POST['appointment_time']);
        $Message = test_input($_POST['message']);

        // Validate cardHolderName (only letters and spaces allowed)
        if (!preg_match("/^[a-zA-Z ]*$/", $Name)) {
            echo "Invalid name. Only letters and spaces allowed.";
            exit;
        }

        // Check if the appointment time is available
        $availabilityCheck = $conn->prepare("SELECT COUNT(*) FROM `appointment` WHERE `App_Date` = ? AND `App_Time` = ?");
        $availabilityCheck->execute([$AppDate, $AppTime]);
        $count = $availabilityCheck->fetchColumn();

        if ($count >= 2) {

            if (!empty($error_message)) {
                echo '<script>alert("' . $error_message . '");</script>';
                echo "<script>window.location.href = 'Reservationform.html';</script>";
            }
            //echo "Appointment time already chosen before. Please choose another time.";
            exit;
        }

        // Insert the appointment details into the database
        $sql = "INSERT INTO `appointment`(`Cus_Name`, `Email`, `App_Date`, `App_Time`, `Phone_Number`, `Additional_Notes`) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$Name, $Email, $AppDate, $AppTime, $PhoneNumber, $Message]);

        echo "Row inserted successfully";
        echo "<script>window.location.href = 'home.html';</script>";

        $conn = null;
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
