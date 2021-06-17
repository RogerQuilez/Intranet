/*

Los criterios que tomaremos para validar que la contraseña sea fuerte son los siguientes:

    Debe tener 8 carácteres como mínimo.
    Debe contener letras mayúsculas.
    Debe contener letras minúsculas.
    Debe contener números.
    Debe contener caracteres especiales (todos los caracteres del teclado que no se definen como letras o números).



Llamar a la siguiente función pasándole la contraseña como parámetro:	 validar_clave(contraseña).

La función retorna "true" si la contraseña es fuerte y "false" si es débil.


*/

function validar_clave(contrasenna){
    if(contrasenna.length >= 8){		
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for(var i = 0;i<contrasenna.length;i++){
            if(contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90){
                mayuscula = true;
            }
            else if(contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122){
                minuscula = true;
            }
            else if(contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57){
                numero = true;
            }
            else{
                caracter_raro = true;
            }
        }
        
        if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true){
            return true;
        }
    }
    
    return false;
}
