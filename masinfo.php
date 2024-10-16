<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vicell";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$sql = "SELECT titulo, imagen, info, categoria, precio, descripcion_detallada FROM productos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();

$product = $result->fetch_assoc();

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Detalles del Producto - ViCELL</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div class="contenedor">
        <header>
            <div class="logo">ViCELL</div>
            <nav>
                <ul class="menu">
                    <li><a href="index.html" class="menu-info"> <i class="bi bi-house"></i> Inicio</a></li>
                    <li><a href="carrito.html" class="menu-info">Carrito <i class="bi bi-cart2"></i></a></li>
                </ul>
            </nav>
        </header>

        <main>
            <h2><?php echo htmlspecialchars($product['titulo']); ?></h2>
            <div class="detalle-producto">
                <div class="detalle-productoinfo">
                    <div class="detalle-productoimg">
                        <img src="<?php echo htmlspecialchars($product['imagen']); ?>" alt="<?php echo htmlspecialchars($product['titulo']); ?>">
                    </div>
                
                    <div class="info-detalle">
                        <p><?php echo nl2br(htmlspecialchars($product['descripcion_detallada'])); ?></p>
                        <span>Precio: $<?php echo htmlspecialchars($product['precio']); ?></span>
                    </div>

                </div>
                
            </div>
        </main>

        <footer>
            <p class="texto-footer">© 2024 ViCELL</p>
        </footer>
    </div>
</body>
</html>
