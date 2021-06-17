<?php

// Conexión a la BD
$host = "localhost";
$user = "root";
$pw = "root";
$db = "ajax_m06";

$conexion = new mysqli($host, $user, $pw, $db);

#Comprobar la conexión
if ($conexion->connect_error) {
    printf("Conexión fallida: %s", $conexion->connect_error);
    exit();
}

//Form Register
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$username = $_POST['usernameLogin'];
$passwd = $_POST['passwdLogin'];
$img = "noprofile.jpg";

$stmt = $conexion->prepare("INSERT INTO employees(name, lastname, email,
        username, passwd, image) VALUES(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $lastname, $email, $username, $passwd, $img);
    $stmt->execute();
    $result = $stmt->affected_rows;
    $lit_err = $conexion->error;
    $stmt -> close();
    $conexion -> close();
?>