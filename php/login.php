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

//Form Login
$username = $_POST['username'];
$passwd = $_POST['passwd'];

$sql = "SELECT * FROM employees";
$result = $conexion->query($sql);

$arrayUsers = array();

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
      $arrayUser = array();
      $arrayUser['id'] = $row['id'];
      $arrayUser['username'] = $row['username'];
      $arrayUser['passwd'] = $row['passwd'];
      $arrayUser['name'] = $row['name'];
      $arrayUser['lastname'] = $row['lastname'];
      $arrayUser['image'] = $row['image'];
      $arrayUser['email'] = $row['email'];
      array_push($arrayUsers, $arrayUser);
    }

  } else {
    echo "0 results";
}

foreach ($arrayUsers as $user){
    if ($user['username'] == $username && $user['passwd'] == $passwd){
        $datosUser = array(
            'id' => $user['id'],
            'name' => $user['name'],
            'lastname' => $user['lastname'],
            'email' => $user['email'],
            'username' => $user['username'],   
            'image' => $user['image']
        );
    }
}

echo json_encode($datosUser, JSON_FORCE_OBJECT);

?>