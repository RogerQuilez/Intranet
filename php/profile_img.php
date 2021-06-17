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

//comprobamos que sea una petición ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
{
    //obtenemos el archivo a subir
    $file = $_FILES['file']['name'];
    $user_id = $_POST['user_id'];

    //comprobamos si el archivo ha subido
    if ($file && move_uploaded_file($_FILES['file']['tmp_name'],"../images/".$file))
    {
       sleep(2);//retrasamos la petición 2 segundos
       
       //recuperamos la extension del fichero:
       $ext = pathinfo($file, PATHINFO_EXTENSION);
       
       //Recuperamos el número total de imagenes en la carpeta "images":
       $total_imagenes = count(glob('../images/{*.jpg,*.gif,*.png}',GLOB_BRACE));
       
       //renombramos el fichero
       $newname = strtolower($total_imagenes.".".$ext);       
       rename ("../images/".$file, "../images/".$newname);
       
       //actualizamos el campo 'image' de la tabla employees con el nombre de la nueva imagen
        $conexion->query("update employees set image='$newname' where id='$user_id'")|| die("Error al actualizar datos");    
       
       //retornamos la imagen
       echo "<img src='./images/$newname'>";//devolvemos la imagen
    }
}else{
    throw new Exception("Error Processing Request", 1);   
}
?>









