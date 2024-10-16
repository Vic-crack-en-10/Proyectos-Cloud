<?php
include 'db.php';

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'todos';

if ($categoria == 'todos') {
    $sql = "SELECT * FROM productos";
} else {
    $sql = "SELECT * FROM productos WHERE categoria = '$categoria'";
}

$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos);

$conn->close();
?>
