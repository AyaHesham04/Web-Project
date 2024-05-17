<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");


error_reporting(E_ALL);
ini_set('display_errors', 1);

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
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $jsonPayload = file_get_contents('php://input');
        $user = json_decode($jsonPayload, true);

        if (isset($user['Data'])) {
            $Email = $user['Data']['Email'];
            $Password = $user['Data']['Password'];

            $loginQuery = "SELECT * FROM `customer` WHERE `Cus_Email` = :email";
            $loginStmt = $conn->prepare($loginQuery);
            $loginStmt->bindParam(':email', $Email);
            $loginStmt->execute();
            $loggedInUser = $loginStmt->fetch();

            if ($loggedInUser) {
                if (password_verify($Password, $loggedInUser['Cus_Password'])) {
                    $token = generateUniqueToken();
                    setcookie('user_token', $token, time() + 3600 * 24 * 30, '/', 'localhost', false, true);
                    setcookie('user_id', urlencode($Email), time() + 3600 * 24 * 30, '/', 'localhost', false, false);
                    echo "Login successful";
                    exit();
                } else {
                    echo "Invalid email or password";
                }
            } else {
                echo "Invalid email or password";
            }
        } else {
            echo "Invalid JSON payload. 'Data' key is missing.";
        }
        break;
}

function generateUniqueToken()
{
    return bin2hex(random_bytes(16));
}

$conn = null;
