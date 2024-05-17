<?php
// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Display error messages during development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight OPTIONS request
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
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        // Access data from JSON payload
        $jsonPayload = file_get_contents('php://input');
        $user = json_decode($jsonPayload, true);

        // Check if 'Data' key exists in the decoded JSON
        if (isset($user['Data'])) {
            $FirstName = $user['Data']['FirstName'];
            $LastName = $user['Data']['LastName'];
            $Email = $user['Data']['Email'];
            $Password = $user['Data']['Password'];
            $ConfirmPassword = $user['Data']['ConfirmPassword'];
            $PhoneNumber = $user['Data']['PhoneNumber'];
           
            // Validate password
            if (!preg_match('/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,}$/', $Password)) {
                echo "Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one digit.";
                exit;
            }

            // Check if passwords match
            if ($Password !== $ConfirmPassword) {
                echo "Passwords do not match.";
                exit;
            }

            // Hash the password
            $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

            // Check if the user already exists
            $checkQuery = "SELECT * FROM `customer` WHERE `Cus_Email` = :email OR `Cus_PhoneNumber` = :phonenumber";
            $checkStmt = $conn->prepare($checkQuery);
            $checkStmt->bindParam(':email', $Email);
            $checkStmt->bindParam(':phonenumber', $PhoneNumber);
            $checkStmt->execute();
            $existingUser = $checkStmt->fetch();

            if ($existingUser) {
                if ($existingUser['Cus_Email'] == $Email) {
                    echo "User with this email already exists.";
                } elseif ($existingUser['Cus_PhoneNumber'] == $PhoneNumber) {
                    echo "User with this phone number already exists.";
                }
            } else {
                // Insert a new user
                $sql = "INSERT INTO `customer`(`Cus_Fname`, `Cus_Lname`, `Cus_PhoneNumber`, `Cus_Email`, `Cus_Password`) VALUES (:firstname, :lastname, :phonenumber,:email, :password )";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':firstname', $FirstName);
                $stmt->bindParam(':lastname', $LastName);
                $stmt->bindParam(':email', $Email);
                $stmt->bindParam(':password', $hashedPassword);
                $stmt->bindParam(':phonenumber', $PhoneNumber);

                if ($stmt->execute()) {
                    echo "Registration successful";
                } else {
                    echo "Registration failed";
                }
            }
        } else {
            // Handle the case where 'Data' key is not present
            echo "Invalid JSON payload. 'Data' key is missing.";
        }
        break;
}

// Close the database connection
$conn = null;
