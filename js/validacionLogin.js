//VARIABLE DE INTENTOS
var intentons = 1;
function validar(){
    //VARIABLES
    var usuario = $("#usuario").val();
    var password = $("#password").val();
    //VALIDAMOS INTENTOS
    if(intentons <= 3){
        if(usuario == "manuel" && password == "manuel1234"){
            swal("Validación", "Bienvenido", "success");
            intentons = 1;
        }
        else{
            swal("Validación", "Usuario y/o contraseña invalidos", "error");
            intentons++;
        }
    }
    else{
        swal("Validación", "Usuario bloqueado por exceso de intentos", "error");
    }
}