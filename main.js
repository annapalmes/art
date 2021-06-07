//JS INICIO.HTML

var paleta =  document.getElementById("paleta");
var boton  =  document.getElementById("boton");


boton.addEventListener("click" , function(){
    paleta.classList.remove('animate')
    setTimeout(() => paleta.classList.add('animate'));
})

var oculto = document.getElementById("oculto");
oculto.style.display = 'none';
paleta.addEventListener("click" , function(){
    paleta.classList.remove('animate')
    oculto.style.display = 'flex';
})

var cerrar = document.getElementById("boton_cruz")
cerrar.addEventListener("click" , function(){
    oculto.style.display = 'none';
})

var panel2 = document.getElementById("panel2");
panel2.style.display = 'none';

var grosor = document.getElementById("anchoPinzel");

grosor.addEventListener("click", function(){
    panel2.style.display = 'inline';
})
grosor.addEventListener("dblclick", function(){
    panel2.style.display = 'none';
})




// 
$(document).ready(function(){
    $('#config').draggable();
    //creamos el CANVAS
   var clic=false;
   var x = "";
   var y = "";
   var canvas=document.getElementById("canvas");
   //ancho y alto de la ventana 100%
   canvas.width = 300;
   canvas.height = 300;
   var cntx = canvas.getContext("2d");
   //border de la linea -> redondeado
   cntx.lineCap = 'round';
   //barra de tamaños
    $(":input").change(function(){
        $("#n_range").html($("#rr").val());
        var a = $('#n_range').text();
        cntx.lineWidth = a;
    });

   //si hacemos click
   $("#canvas").mousedown(function(canvas){
       clic=true;
       cntx.save();
       x = canvas.pageX-this.offsetLeft;
       y = canvas.pageY-this.offsetTop;
    });

    $(document).mouseup(function(){
       clic=false;
    });

    $(document).click(function(){
       clic=false;
    });
    //pincel
    //var valor = document.getElementById('herramientas option[value=""]');
    $( "#herramientas" ).change(function() {
        var str = "";
        $( "#herramientas option:selected" ).each(function() {
          str += $( this ).text();
        });
        //pincel
        if (str == 'P') {
            $("#canvas").mousemove(function(canvas){
               if(clic==true){
                   cntx.beginPath();
                   cntx.moveTo(canvas.pageX-this.offsetLeft,canvas.pageY-this.offsetTop);
                   cntx.lineTo(x, y);
                   cntx.stroke();
                   x = canvas.pageX-this.offsetLeft;
                   y = canvas.pageY-this.offsetTop;
               }
            });
            $('#txt').hide();
        }
        //texto que mostrar y tipografías
        if (str == 'Texto') {
            $('#txt').show();
            //escribimos
            var texto = document.getElementById('valor_t');
            ////////////
            $("#canvas").mousedown(function(canvas){
             var fnt = "";
                $( "#texto option:selected" ).each(function() {
                  fnt += $( this ).text();
                });
               cntx.font = 'bold ' + $('#n_range').text()+'px' + ' ' + fnt;
               clic=true;
               cntx.save();
               x = canvas.pageX-this.offsetLeft;
               y = canvas.pageY-this.offsetTop;
               var a = cntx.fillText($(texto).val(),x,y);
               var s = $(texto).val("");
            });
        }
        }).trigger( "change" );

        //Añadimos color
        var content = $('#color').val(); 
        var c = $('#c');
        c.html($(content));
        $('#color').on('change', function() {
            cntx.strokeStyle =  (this.value);
            cntx.fillStyle = (this.value);
        });
        //color de fondo del canvas
        $('#canvas').css('background-image','url("img/bgcanvas.png")');
        var content = $('#bg_color').val(); 
        var bgc = $('#bg_c');
        bgc.html($(content));
        $('#bg_color').on('change', function() {
            $('#canvas').css('background-image','none');
            $('#canvas').css('background-color',(this.value));
        });
         
        //creamos la imágen del canvas
        var jpeg = document.getElementById("jpeg");
        jpeg.addEventListener("click",function(){   
          var dato = canvas.toDataURL("image/jpeg");
          dato = dato.replace("image/jpeg", "image/octet-stream");
          document.location.href = dato;    
        },false);

        //borramos el canvas
        var borramos = document.getElementById("borrar");
        borramos.addEventListener("click",function(){  
            cntx.clearRect(0,0,canvas.width,canvas.height) ;
        },false);

});