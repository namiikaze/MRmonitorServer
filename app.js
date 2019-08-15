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
var i = 0;
io.on("connection", function (socket) {
  
  socket.emit("update", "global");

  socket.on("entrar", function (recebido) {
    console.log("Conexão recebida de: " + socket.id);

    socket.apelido = recebido;
    clients[recebido] = socket;
    //clients[socket.id].apelido = "teste";
    //console.log(clients[socket.id].apelido + i);
    i++;
    
    //clients[recebido].nome = socket.id;
    //console.log('a:' + clients[recebido].nome);

    
    //clients[recebido].emit("update", "testando");
    
    //console.log("//\\");
    try {
      //console.log(">>>>>>>>>>" + clients[socket.id].apelido);
    } catch{ }
    //console.log("//\\");

    for (unico in clients) {
      
    //  console.log(clients[unico].apelido);
      
    }
      
    


  });

  socket.on("update", function(result) {
    obj = JSON.parse(result);
    console.log(obj);
  });

  socket.on("imagem", function(from) {
    io.emit("te", from);
    try {
      
      //clients['administrador'].emit("update", clients[].nome);
      
    }catch{

     }
  });

  socket.on("disconnect", function() {
    console.log(`Desconectado: ${socket.apelido}`);
    delete clients[socket.apelido];
    
  });
});

app.use(express.static(__dirname + "/node_modules"));
app.get("/", function(req, res) {
  res.send("<h1>A</h1>");
});
/* */

for (var i = 0; i < 60; i++) console.log(" ");

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const perguntar = pergunta =>
  new Promise(resolver =>
    input.question(pergunta, resposta => resolver(resposta))
  );

http.listen(3000, function() {
  console.log("listening on port 3000");
});
