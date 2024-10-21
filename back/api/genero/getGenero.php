<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow your frontend origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require_once('../../config/conexion.php');
// Consulta para obtener autores
$sql = "SELECT id, nombre FROM generos order by nombre";
$result = $conn->query($sql);

$autores = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $autores[] = $row;
    }
}

echo json_encode($autores);
$conn->close();
?>