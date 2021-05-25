// funciones para api clima
//Fecha actual
function fechaActual() {
    var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    var currentdate = new Date();

    var hoy = dias[currentdate.getUTCDay()] + ', '
        + currentdate.getDate() + " de "
        + meses[currentdate.getMonth()] + " de "
        + currentdate.getFullYear()
    $("#fecha").html(hoy)
}

function getCoordenadas() {
    if (navigator.geolocation) {
        console.log("Dispositivo soporta la geolocalización.")
        navigator.geolocation.getCurrentPosition(getClima, manejo_errores);
    }
    else {
        console.log("Dispositivo no admite la geolocalización")
    }
}

function getClima(posicion){
    var lat = posicion.coords.latitude
    var lon = posicion.coords.longitude
    console.log("Obteniendo clima coord: lat " + lat + " long " + lon)

    var APIKey = '5a871e12000a8b7ff68efce254464b60'  //KEY de www.openweathermap.org Flores

    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+APIKey+'&lang=es&units=metric'

    $.getJSON(
        url,
        function(data){
            console.log("Ciudad: " + data.name)
            console.log("Temperatura: " + data.main.temp.toFixed(0))
            console.log("Icon: " + data.weather[0].icon)
            $("#ciudad").html(data.name)
            $("#temperatura").html(data.main.temp.toFixed(0)+'°c')

            var img_url  = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon+'@2x.png'

            $('#imgClima').attr('src', img_url);
        }
    )
}


function manejo_errores(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED: console.log("El usurio no compartió su ubicación geográfica");
            break;
        case error.POSITION_UNAVAILABLE: console.log("No se pudo detectar la posición geográfica actual");
            break;
        case error.TIMEOUT: console.log("Se ha agotado el tiempo de espera al consultar posición geográfica");
            break;
        default: console.log("Error desconocido");
            break;
    }
}


//funcion para api monedas
function getMoneda(codigo) {
    
    var url_api = 'https://api.gael.cloud/general/public/monedas/' + codigo

    $.getJSON(
        url_api
        ,
        function (data) {
            $("#nombreMoneda").html("Valor " + data.Nombre)
            $("#valorMoneda").html("$ " + data.Valor)
        }
    );
}



$(document).ready(function(){
    //funcionamiento botones muestra u oculta info de las api

    $("#moneda").hide()

    $("#apiClima").click(
        function (){
            $("#clima").fadeIn()
            $("#moneda").hide()
        });

    $("#apiMoneda").click(
        function(){
            $("#moneda").fadeIn()
            $("#clima").hide()
        });

        //llamado api rest monedas
        
        getMoneda("UF")

        var url_api_todas = 'https://api.gael.cloud/general/public/monedas'
        $.getJSON(
            url_api_todas,
            function(data){
                $.each(data, function(i,item){
                    $("#monedas").append(
                        '<option value="' + item.Codigo +'">'+ item.Nombre +'</option>'
                    );
               }) 
            }
        )
    
        $("#cambiarMoneda").click(function(){
                var codigo = $("#monedas").val()
                getMoneda(codigo)
    
        });

    //llamado a api clima
    
    fechaActual()
    getCoordenadas()
    

});


