//Mongoose models
const Wall = require('mongoose').model('wall');
const Usuario = require('mongoose').model('usuarios');
const NotificacionNuevoWall = require('mongoose').model("notificacionNuevoWall");
const NotificacionNuevaHistoria = require('mongoose').model("notificacionNuevaHistoria");
const NotificacionNuevaContinuacionHistoria = require('mongoose').model("notificacionNuevaContinuacionHistoria");
const NotificacionNuevoRelato = require('mongoose').model("notificacionNuevoRelato");
const NotificacionNuevoChatStory = require('mongoose').model("notificacionNuevoChatStory");
const NotificacionNuevaOpinionRelato = require('mongoose').model("notificacionNuevaOpinionRelato");
const NotificacionNuevaOpinionChatStory = require('mongoose').model("notificacionNuevaOpinionChatStory");
const NotificacionFeed = require('mongoose').model("notificacionFeed");
const NotificacionNuevoSeguidor = require('mongoose').model("notificacionNuevoSeguidor");

//Constantes
const Constantes = require("../constantes/constantes");


let hashmapUsuarios = new Map();

class GestorNotificaciones {

  static addNotificacionFeed(notificacion, usuariosID) {
    let nuevaNotificacion = GestorNotificaciones._construirNotificacionFeed(notificacion);

    usuariosID.map((idUsuario) => {
      if (hashmapUsuarios.get(idUsuario)) {
        //Esta conectado mediante Web Socket
        //Enviamos la notificacion mediante Web Socket
        console.log("conectado por web socket");
      } else {
        console.log("usuario no conectado");
        //Ponemos la notificacion en su bandeja de notificaciones para cuando inice sesion
        Usuario.findOneAndUpdate({_id: idUsuario}, {$push: {notificacionesFeed: nuevaNotificacion}}, function (err, usuario) {
        });
      }
    });
  }

  static _construirNotificacionFeed(notificacion) {
    let nuevaNotificacion = new NotificacionFeed();

    nuevaNotificacion.tipo = notificacion.tipo;
    console.log(notificacion);

    switch (notificacion.tipo) {
      case Constantes.Notificacion.NUEVO_WALL:
        nuevaNotificacion.notificacionNuevoWall = notificacion;
        break;
      case Constantes.Notificacion.NUEVA_HISTORIA:
        nuevaNotificacion.notificacionNuevaHistoria = notificacion;
        break;
      case Constantes.Notificacion.CONTINUACION_HISTORIA:
        nuevaNotificacion.notificacionContinuacionHistoria = notificacion;
        break;
      case Constantes.Notificacion.NUEVO_RELATO:
        nuevaNotificacion.notificacionNuevoRelato = notificacion;
        break;
      case Constantes.Notificacion.NUEVO_CHAT_STORY:
        nuevaNotificacion.notificacionNuevoChatStory = notificacion;
        break;
      case Constantes.Notificacion.NUEVA_OPINION_RELATO:
        nuevaNotificacion.notificacionNuevaOpinionRelato = notificacion;
        break;
      case Constantes.Notificacion.NUEVA_OPINION_CHAT_STORY:
        nuevaNotificacion.notificacionNuevaOpinionChatStory = notificacion;
        break;
      case Constantes.Notificacion.NUEVO_SEGUIDOR:
        nuevaNotificacion.notificacionNuevoSeguidor = notificacion;
        break;

    }

    return nuevaNotificacion;
  }

  //En todas estas notificaciones, el texto es un fragmento de lo nuevo creado
  static crearNotificacionNuevoWall(textoNotificacion, fechaHora, idAutor, nombreAutor, idWall, tituloWall) {
    let nuevaNotificacion = new NotificacionNuevoWall({
      texto: textoNotificacion,
      tituloWall: tituloWall,
      idWall: idWall,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVO_WALL;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevaHistoria(textoNotificacion, fechaHora, idAutor, nombreAutor, idWall, tituloWall, indiceHistoria) {
    let nuevaNotificacion = new NotificacionNuevaHistoria({
      texto: textoNotificacion,
      tituloWall: tituloWall,
      idWall: idWall,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora,
      indiceHistoria: indiceHistoria
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVA_HISTORIA;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevaContinuacionHistoria(textoNotificacion, fechaHora, idAutor, nombreAutor, idWall, tituloWall, idHistoria) {
    let nuevaNotificacion = new NotificacionNuevaContinuacionHistoria({
      texto: textoNotificacion,
      tituloWall: tituloWall,
      idWall: idWall,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora,
      idHistoria: idHistoria
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.CONTINUACION_HISTORIA;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevoRelato(textoNotificacion, fechaHora, idAutor, nombreAutor, idRelato, tituloRelato) {
    let nuevaNotificacion = new NotificacionNuevoRelato({
      texto: textoNotificacion,
      tituloRelato: tituloRelato,
      idRelato: idRelato,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVO_RELATO;

    return nuevaNotificacion;
  }


  static crearNotificacionNuevoChatstory(textoNotificacion,
                                         fechaHora,
                                         idAutor,
                                         nombreAutor,
                                         idChatStory,
                                         tituloChatStory) {
    let nuevaNotificacion = new NotificacionNuevoChatStory({
      texto: textoNotificacion,
      fechaHora: fechaHora,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      idChatStory: idChatStory,
      tituloChatStory: tituloChatStory,
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVO_CHAT_STORY;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevaOpinionRelato(textoNotificacion, fechaHora, idAutor, nombreAutor, idRelato, tituloRelato) {
    let nuevaNotificacion = new NotificacionNuevaOpinionRelato({
      texto: textoNotificacion,
      tituloRelato: tituloRelato,
      idRelato: idRelato,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVA_OPINION_RELATO;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevaOpinionChatStory(textoNotificacion, fechaHora, idAutor, nombreAutor, idChatStory, tituloChatStory) {
    let nuevaNotificacion = new NotificacionNuevaOpinionChatStory({
      texto: textoNotificacion,
      tituloChatStory: tituloChatStory,
      idChatStory: idChatStory,
      refAutor: idAutor,
      nombreAutor: nombreAutor,
      fechaHora: fechaHora
    });

    notificacion.tipo = Constantes.Notificacion.NUEVA_OPINION_CHAT_STORY;

    return nuevaNotificacion;
  }

  static crearNotificacionNuevoSeguidor(textoNotificacion, nombreSeguidor, idSeguidor) {
    let nuevaNotificacion = new NotificacionNuevoSeguidor({
      texto: textoNotificacion,
      nombreSeguidor: nombreSeguidor,
      idSeguidor: idSeguidor
    });

    nuevaNotificacion.tipo = Constantes.Notificacion.NUEVO_SEGUIDOR;

    return nuevaNotificacion
  }
}

module.exports.GestorNotificaciones = GestorNotificaciones;
module.exports.hashmapUsuarios = hashmapUsuarios;
