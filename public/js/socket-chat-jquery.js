
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// referencias de jQuery
var divUsuario = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatBot = $('#divChatbox');
var titleChat = $('#title-chat');

// Funciones para renderizar usuarios
function renderozarUsuarios( personas ) {

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>'+ params.get('sala') +'</span></a>';
    html += '</li>';

    for (let index = 0; index < personas.length; index++) {
        html += '<li>';
        html += ' <a data-id="' + personas[index].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[index].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsuario.html(html);
}

function renderizarMensajes( mensaje, yo ) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';

    if ( mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if ( yo ) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>'+ mensaje.nombre +'</h5>';
        html += '<div class="box bg-light-inverse">'+ mensaje.mensaje +'</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if ( mensaje.nombre !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += '<h5>'+ mensaje.nombre +'</h5>';
        html += '<div class="box bg-light-'+ adminClass +'">'+ mensaje.mensaje +'</div>';
        html += '</div>';
        html += '<div class="chat-time">'+ hora +'</div>';
        html += '</li>';
    }

    divChatBot.append(html);
}

function renderizarTitulo( sala ){
    var html = '';
    html += '<h3 id="title-chat" class="box-title">Sala de chat <small>' + sala + '</small></h3>';
    titleChat.html(html);
}

function scroll(nombrePadre, nombreHijo) {
    var padre = $(`#${nombrePadre}`); //
    var totalHeight = 0;
    // console.log(padre.find(nombreHijo).length)
    padre.find(nombreHijo).each(function() {
        //console.log(`totalHeight: ${totalHeight} - $(this).outerHeight(): ${$(this).outerHeight()}`)
        totalHeight += $(this).outerHeight();
    });
 
    // padre.scrollTop(totalHeight); //el scroll siempre lleva al final del div
 
    $(`#${nombrePadre}`).animate({
        scrollTop: totalHeight
    }, 500); //animacion!
 
};

// Listener
divUsuario.on('click', 'a', function(){

    var id = $(this).data('id');

    if ( id ) {
        
    }

});

formEnviar.on('submit', function(e){
    e.preventDefault();
    
    if(txtMensaje.val().trim().length === 0){
        return;
    } else {
        // Enviar información
        socket.emit('crearMensaje', {
            nombre: nombre,
            mensaje: txtMensaje.val()
        }, function(mensaje) {
            /* console.log('respuesta server: ', resp); */
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje, true);
            scroll('divChatbox', 'li');
        });
    }
});


