var GestorNotificaciones = require("../services/notificaciones.service").GestorNotificaciones;
var hashmapUsuarios = require("../services/notificaciones.service").hashmapUsuarios;
var io = require("../server.js").io;
var Usuario = require('mongoose').model('usuarios');

io.sockets.on('connection', function(socket){
  console.log("Connection on socket.io on socket");

  socket.on('identificacion', function(datosUsuario){
      socket.id = datosUsuario.id;
      hashmapUsuarios.set(datosUsuario.id, socket);
      console.log(hashmapUsuarios.size);
      // TODO comentado momentáneamente
      //setInterval(function(){console.log('enviando notificacion'); socket.emit('notificacionFeed', "Hola, esto es una nueva notificacion")}, 3000)
  })

  socket.on('message', function(data){
      console.log(data);
  })

  socket.on('disconnect', function(){
      console.log("Desconectado");
      hashmapUsuarios.delete(socket.id);
      console.log(hashmapUsuarios.size);
  })

});
