<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vicell";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, titulo, imagen, info, categoria, precio, descripcion_detallada FROM productos";
$result = $conn->query($sql);

$productos = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
} else {
    echo "0 results";
}
$conn->close();

echo json_encode($productos);
?>

