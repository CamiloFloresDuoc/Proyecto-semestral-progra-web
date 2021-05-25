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

});


