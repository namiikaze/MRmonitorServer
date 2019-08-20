$('#alerta').hide();
var idDestino = null;
function setarAlerta(id) {
    $('#main').hide();
    $('#alerta').show();
    idDestino = id;
}
function enviarAlerta() {
    var msg = $('#msgAlert').val();
    socket.emit("enviarAlert", msg,idDestino);
    $('#main').show();
    $('#alerta').hide();
    idDestino = null;
}