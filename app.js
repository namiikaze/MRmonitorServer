var fs = require("fs");
const readline = require("readline");

/* HTTP and Socket*/
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var express = require("express");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

var clients = [];
var usuarios = [];
io.on("connection", function(socket) {
  socket.emit("obterInfoMachine", "get");
  socket.emit("update", "global");

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
    clients[socket.id] = socket;
    attUsuarios();
    console.table(usuarios);
  });
  socket.on("solicitarPrint", function(result) {
    io.emit("obterPrint", "get");
    
    
    
  });

  socket.on("print", function(from) {
    io.emit("printscreen", from);
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
        "NomeRede":clients[indice].NomeRede,
      };
      usuarios.push(infoJson);
  }
  io.emit("update", usuarios);
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
