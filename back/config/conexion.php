<?php

header('Content-Type: application/json');
/*$servername = "localhost";
$username = "root";
$password = "";
$dbname = "playlist2";*/
$servername = "localhost";
$username = "arsiste1_familia";
$password = "ouU2*q}R&4tB";
$dbname = "arsiste1_catar2022";
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

?>