<?php
header("Access-Control-Allow-Origin: *"); // Allow your frontend origin
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers

require_once('../../config/conexion.php');
// Consulta para obtener autores
$sql = "SELECT canciones.id, generos.nombre as genero, autor.nombre as autor, canciones.titulo, canciones.interprete, canciones.url, canciones.coverImage FROM canciones
inner join generos on canciones.idgenero = generos.id
inner join autor on canciones.idautor = autor.id
 order by id desc";
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