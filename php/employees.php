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

    $res = '<table id="dataTable" class="display table-bordered" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>';

    foreach ($arrayUsers as $user){

        $res .= '<tr>';
        $res .= '<td>' . $user['name'] . '</td>';
        $res .= '<td>' . $user['lastname'] . '</td>';
        $res .= '<td>' . $user['email'] . '</td>';
        $res .= '<td>' . $user['username'] . '</td>';
        $res .= '</tr>';

    }

    $res .= '</tbdoy>
            </table>';
    echo $res;

?>