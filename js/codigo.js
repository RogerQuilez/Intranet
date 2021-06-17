    $(document).ready(function(){
    
        // Objeto para almacenar los datos del usuario que realiza login
        var UserLogged = {
            id: 0,
            name: "",
            lastname: "",
            email: "",
            username: "",
            image: ""     
        };
        
    
        // Tratamiento de links para mostrar/ocultar el formulario apropiado
        $(".register, .profile").css("display","none");
        
        $("#form_wrapper a").click(function(){
            var $a_ocultar = $(this).closest("form");
            var clase = $(this).attr("rel");
            var $a_mostrar = $("." + clase);
            cambia_form($a_ocultar,$a_mostrar);
        });  


        function cambia_form(ocultar,mostrar){
            ocultar.fadeOut(500,function(){mostrar.fadeIn(500);});
        }


        // formulario registro
        document.register.name.addEventListener("blur",validaNom,false);
        document.register.lastname.addEventListener("blur",validaNom,false);
        document.register.passwd.addEventListener("blur",validaPasswd1,false);
        document.register.username.addEventListener("blur",validaUsuari,false);
        document.register.email.addEventListener("blur",validaMail,false);
        document.register.passwd2.addEventListener("blur",validaPasswd2,false);

        //Validación de los campos del formulario de registro
        function validaNom(){
            if (this.value!==""){
                var correcto=true;
                var res=this.value.split("");

                //longitud debe ser mayor o igual a 3
                if(this.value.length<3){
                    correcto=false;
                    trataError(this,"wrong length");
                }

                //No puede contener numeros
                if(correcto){
                    var i=0;
                    while(correcto && i<res.length){
                        if(!isNaN(parseInt(res[i]))){
                            correcto=false;
                        }
                        i++;
                    }

                    if (!correcto){
                        trataError(this,"can not contain numbers");
                    }
                }

                if(correcto){
                    trataCorrecto(this);
                }
            }else{
                trataCorrecto(this);
            }
        }

        function validaMail(){
            if (this.value!==""){
                var expRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

                if(!expRegular.test(this.value)) {
                    trataError(this,"incorrect email");
                }else{
                    trataCorrecto(this); 
                }
            }else{
                trataCorrecto(this);
            }

        }

        function validaUsuari(){
            if (this.value!==""){

                if(this.value.length<5) {
                    trataError(this,"minimum length 5 characters");

                }else{
                    if(this.value.length>15){
                        trataError(this,"maximum length 15 characters");
                    }else{   
                        trataCorrecto(this);
                    }
                }
            }else{
                trataCorrecto(this);
            }
        }

        function validaPasswd1(){
            if (this.value!==""){
                
                var res = validar_clave(this.value);

                if(res) {
                    trataCorrecto(this);
                }else{
                    trataError(this,"Invalid password");
                }
            }else{
                trataCorrecto(this);
            }
        }

        function validaPasswd2(){
            if (this.value!==""){
                var pass1 = document.register.passwd.value;  
                if(this.value!==pass1){
                    trataError(this,"passwords don't match");
                }else{
                    trataCorrecto(this);
                }
            }else{
                trataCorrecto(this);
            }
        }

        function trataCorrecto(objeto){
            objeto.setCustomValidity("");
        }


        function trataError(objeto,texto){
            objeto.setCustomValidity(texto);
        }


        //Envío del formulario de registro
        $(".register .bottom input").click(function(event){
            var validacion = document.register.checkValidity();
            if(validacion){
                
                event.preventDefault();
                var form = document.getElementById('register');
                var name = document.register.name.value;
                var lastname = document.register.lastname.value;
                var email = document.register.email.value;
                var username = document.register.username.value;
                var passwd = document.register.passwd.value;
                
                $.ajax({
                    type: 'post',
                    url: 'php/register.php',
                    data: $('form').serialize(),
                    success: function () {
                      alert('Completed Registration');
                      form.reset();
                      cambia_form($("#register"), $("#formLogin"));
                    },
                    error: function(){
                        alert('Error with Registration');
                    }
                });            
            
            }
            
        });


        //Envío del formulario de login
        $(".login .bottom input").click(function(event){

            event.preventDefault();
            
            var form = document.getElementById('formLogin');
            var username_login = document.login.username.value;
            var passwd_login = document.login.passwd.value;

            if(username_login !== "" && passwd_login !== ""){
                
                $.ajax({
                    type: 'post',
                    url: 'php/login.php',
                    data: $('form').serialize(),
                    dataType: "json",
                    success: function (result) {
                      alert('Welcome');
                      form.reset();
                      UserLogged = result;
                      $(".profile h3").html(UserLogged.username);
                      var myPath = "./images/" + UserLogged.image;
                      $("#profile_img").append("<img id='userImage' src='" + myPath + "'>");
                      cambia_form($("#formLogin"), $("#formProfile"));
                    },
                    error: function(){
                        alert('Error with Registration');
                    }
                });   
                
            }else{
                document.login.username.setCustomValidity("");
                document.login.passwd.setCustomValidity("");         
            }
        });
        
        
        //logout  
        $("#logout").click(function(){
            alert("good bye!!");
            UserLogged.id=0;
            UserLogged.name="";
            UserLogged.lastname="";
            UserLogged.email="";
            UserLogged.username="";
            UserLogged.image="";
            $("#userImage").remove();
            cambia_form($(".profile"),$(".login"));
            $("#employees").html("");
        });

        //Mostrar cambio de imagen
        $("#file").change(function () {
            $("#inputval").append("<p id='pathImage' >" + this.value + "</p>");
        });

        //Cambiar Imagen
        $("#formProfile").on('submit', function(event){
            event.preventDefault();
            var data = new FormData(this);
            data.append('user_id', UserLogged.id);
            if ($("#pathImage").text() != ""){
                $.ajax({
                    type: 'post',
                    url: 'php/profile_img.php',
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        var myPath = data;
                        $("#userImage").remove();
                        $("#profile_img").append(myPath);
                        $("#profile_img img").attr("id", "userImage");
                        $("#pathImage").remove();
                        UserLogged.image = $("#userImage").attr('src');
                    }
                })
            }
        })

        //Mostrar empleados
        $("#show_employees").click(function(event){

            event.preventDefault();

            $.ajax({
                type: 'post',
                url: 'php/employees.php',
                success: function(result){
                    $("#employees").html(result);
                    $("#dataTable").DataTable();
                },
                error: function(){
                    alert("Error al cargar los empleados");
                }
            })
        })
    });
    