<?php
$conn = mysqli_connect("localhost", "root", "", "drpetproject") or die(mysqli_error($conn));
if (isset($_POST["submit"])) {
    $name = $_POST["name"];
    $number = $_POST["number"];
    $streetnumber = $_POST["streetnumber"];
    $adrress = $_POST["adrress"];
    $building_no = $_POST["building_no"];
    $floor_number = $_POST["floor_number"];

    $duplicate = mysqli_query($conn, "SELECT * FROM shippingform where Phone_Number='$number' ");
    if (mysqli_num_rows($duplicate) > 0) {
        echo
        "<script> alert('phone has already taken');</script>";
    } else {

        $query = "INSERT INTO `shippingform`(`Cus_Name`, `Phone_Number`, `Street_Number`, `Address`, `Building_no`, `Floor_Number`) 
        VALUES('$name','$number','$streetnumber','$adrress','$building_no','$floor_number')";
        mysqli_query($conn, $query);
        echo "<script>window.location.href = 'Payment.html';</script>";
    }
}
?>

<!DOCTYPE html>

<html>

<head>
    <meta charset="UTF_8">
    <meta http-eqiv="X-UA-COMPATIBLE" content="IE=egde">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>shipping form</title>
    <link rel="stylesheet" type="text/css" href="ShippingStyle.css">

    <link rel="icon" type="image/png" href="/images/pawimage.png" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/a;;.css" />

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

</head>

<body style="background-image: url('images/background.png');">
    <script>
        function counter(a, b) {
            var input = b.previousElementSibling;
            var value = parseInt(input.value, 10);
            value = isNaN(value) ? 0 : value;
            value++;
            input.value = value;
        }
    </script>


    <div class="container">
        <form action="" method="post">
            <h2 class="gradient-text">Shipping Information</h2>
            <div class="inputBox">
                <span>Customer Name</span>
                <input type="text" name="name" required>
            </div>
            <div class="inputBox">
                <span>Phone Number</span>
                <input type="number" name="number" required>
            </div>
            <div class="inputBox">
                <span>Street Number</span>
                <input type="number" name="streetnumber" required>
            </div>
            <div class="inputBox">
                <span>Address</span>
                <input type="text" name="adrress" required>
            </div>
            <div class="inputBox">
                <span>Building Number</span>
                <input type="number" name="building_no" required>
            </div>
            <div class="inputBox">
                <span>Floor number</span>
                <input type="number" name="floor_number" required>
            </div>
            <input type="submit" name=submit value="Submit" class="submit-btn" >
            <input type="number" name="orderID" onsubmit='counter(event, this)' hidden>

            <!-- <button>Go to Payment</button> -->
        </form>

    </div>
</body>

</html>