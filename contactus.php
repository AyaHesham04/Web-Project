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
        $Name = test_input($_POST['name']);
        $Email = test_input($_POST['email']);
        $Message = test_input($_POST['message']);

        // Validate cardHolderName (only letters and spaces allowed)
        if (!preg_match("/^[a-zA-Z ]*$/", $Name)) {
            echo "Invalid name. Only letters and spaces allowed.";
            exit;
        }

        $sql = "INSERT INTO `contact-us`(`Cus_Name`, `Cus_Email`, `Message`) VALUES ('$Name','$Email','$Message')";
        $conn->exec($sql);

        echo "Row inserted successfully";
        echo "<script>window.location.href = 'home.html';</script>";
        $conn = null;
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit;
}



// $method = $_SERVER['REQUEST_METHOD'];
// // ...

// switch ($method) {
//     case "POST":
//         // Access data from JSON payload
//         $jsonPayload = file_get_contents('php://input');
//         $user = json_decode($jsonPayload, true);

//         // Check if 'Data' key exists in the decoded JSON
//         if (isset($user['Data'])) {
//             $name = $user['Data']['N'];
//             $email = $user['Data']['E'];
//             $massage = $user['Data']['M'];

//             // Use the data in your SQL query
//             $sql = "INSERT INTO `contact-us`(`name`, `email`, `message`) VALUES ('$name','$email','$message')";

//             // Execute the SQL query
//             if ($conn->exec($sql)) {
//                 echo "done";
//             } else {
//                 echo "no";
//             }
//         } else {
//             // Handle the case where 'Data' key is not present
//             echo "Invalid JSON payload. 'Data' key is missing.";
//         }
//         break;
// }

// $conn = null;
