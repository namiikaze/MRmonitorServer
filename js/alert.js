$('#enviar').hide();

var idDestino = null;
var socketTitulo = null;

function setarAlerta(id) {
    $('.titulo').text("Enviar Alerta");
    $('#main').hide();
    $('#enviar').show();
    idDestino = id;
    socketTitulo = "enviarAlert";
}
function enviarAlerta() {
    var msg = $('#msgAlert').val();
    socket.emit(socketTitulo, msg,idDestino);
    $('#main').show();
    $('#enviar').hide();
    idDestino = null;
}
/**/
function setarNome(id) {
    $('.titulo').text("Setar Nome");
    $('#main').hide();
    $('#enviar').show();
    idDestino = id;
    socketTitulo = "enviarNome";
}
function enviar() {
    var msg = $('#msgAlert').val();
    socket.emit(socketTitulo, msg,idDestino);
    $('#main').show();
    $('#enviar').hide();
    idDestino = null;
    $('#msgAlert').val('');
    aviso();
}

function cancelar() {
    $('#msgAlert').val('');
    $('#main').show();
    $('#enviar').hide();
}


function aviso() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }