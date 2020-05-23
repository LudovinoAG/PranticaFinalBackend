$(document).ready(function() {
    $('select').material_select();
});

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
  SE PROCEDE A DESACTIVAR PORQUE NO HAY VIDEO
*/
/*function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}*/

inicializarSlider();
//playVideoOnScroll();


//Mostrar todos los registros
$("#mostrarTodos").click(function(){

    $.ajax({
    url: 'data-1.json',
    success: function(response){
      
      if($('.Datos').is(":empty")){
              $.each(response, function(index, val){

                 $('.Datos').append("<div class='card'>" +

                      "<div class='row'>" +
                          "<div class='col s5'><img src='img/home.jpg' id='imgHome'></div>" +

                          "<div class='col s7 col_datos'>" +
                            "<span><span class='title'>Dirección:</span> " + val.Direccion + "</span><br>" + 
                            "<span><span class='title'>Ciudad:</span> " + val.Ciudad + "</span><br>" +
                            "<span><span class='title'>Telefono:</span> " + val.Telefono + "</span><br>" +
                            "<span><span class='title'>Codigo postal:</span> " + val.Codigo_Postal + "</span><br>" +
                            "<span><span class='title'>Tipo:</span> " + val.Tipo + "</span><br>" +
                            "<span><span class='title'>Precio:</span><span id='ValuePrecio'> " + val.Precio + "</span></span>" +
                            "<br>" +
                            "<hr>" +
                            "<a class='linkMore' href='#''>VER MAS</a>" +
                          "</div>" +

                      "</div>" +
                 "</div>");
              }) 
      }
    }
  });
});


//Funcion para evaluar los repetidos
function unique(array){
  return array.filter(function(el,index,arr){
    return index==arr.indexOf(el);
  });
}

//Obtener las ciudades y aplicar funcion Filter para solo mostrar lo no repetido
function Cargar(){
  $.getJSON("data-1.json", function(data){
    var Ciudades = [];
    var Tipo = [];

        $.each(data, function(index, Info){
          Ciudades.push(Info.Ciudad);
          Tipo.push(Info.Tipo);
        });

         $.each(unique(Ciudades), function(i, val){
            $("#selectCiudad").append("<option>" + val +"</option>");
         });

         $.each(unique(Tipo), function(i, val){
            $('#selectTipo').append("<option>" + val + "</option>");
         });

  });
}

Cargar();

//funcion para busqueda
$('#submitButton').click(function(event){
    event.preventDefault();
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();
    console.log(ciudad + ' + ' + tipo + ' + ' + precio);

    //Llamada
    $.get('buscador.php', {ciudad:ciudad, tipo:tipo, precio:precio}, function(response){
        let data = JSON.parse(response);
        var r = data.data;
        showResult(r);
    });
});





function showResult(array){
    $('.resultados').empty();
    $.each(array, function(index, val){

                 $('.Datos').append("<div class='card'>" +

                      "<div class='row'>" +
                          "<div class='col s5'><img src='img/home.jpg' id='imgHome'></div>" +

                          "<div class='col s7 col_datos'>" +
                            "<span><span class='title'>Dirección:</span> " + val.Direccion + "</span><br>" + 
                            "<span><span class='title'>Ciudad:</span> " + val.Ciudad + "</span><br>" +
                            "<span><span class='title'>Telefono:</span> " + val.Telefono + "</span><br>" +
                            "<span><span class='title'>Codigo postal:</span> " + val.Codigo_Postal + "</span><br>" +
                            "<span><span class='title'>Tipo:</span> " + val.Tipo + "</span><br>" +
                            "<span><span class='title'>Precio:</span><span id='ValuePrecio'> " + val.Precio + "</span></span>" +
                            "<br>" +
                            "<hr>" +
                            "<a class='linkMore' href='#''>VER MAS</a>" +
                          "</div>" +

                      "</div>" +
                 "</div>");
    }) 
}