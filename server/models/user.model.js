// grab the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Constantes = require("../constantes/constantes");
const datosComunes = require('./comunes.model');

const notificacionNuevaHistoria = Schema({
  texto: String,
  tituloWall: String,
  idWall: mongoose.Schema.Types.ObjectId,
  indiceHistoria: Number,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
});

const notificacionNuevoWall = Schema({
  texto: String,
  tituloWall: String,
  idWall: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
});

const notificacionNuevaContinuacionHistoria = Schema({
  texto: String,
  tituloWall: String,
  idWall: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
  idHistoria: mongoose.Schema.Types.ObjectId,
});

const notificacionNuevoRelato = Schema({
  texto: String,
  tituloRelato: String,
  idRelato: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
});

const notificacionNuevoChatStory = Schema({
  texto: String,
  tituloChatStory: String,
  idChatStory: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
});

const notificacionNuevaOpinionRelato = Schema({
  texto: String,
  tituloRelato: String,
  idRelato: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String
});

const notificacionNuevaOpinionChatStory = Schema({
  texto: String,
  tituloChatStory: String,
  idChatStory: mongoose.Schema.Types.ObjectId,
  refAutor: mongoose.Schema.Types.ObjectId,
  nombreAutor: String,
});

const notificacionFeed = Schema({
  tipo: Number,
  //Este es el texto de lo que se quiere mostrar, la accion en si ira en tipo, es decir,
  //Pepe ha conrinuado tu historia, se sacará a partir del nombre del autor y el wall que sea.
  notificacionNuevaHistoria: notificacionNuevaHistoria,
  notificacionNuevoWall: notificacionNuevoWall,
  notificacionContinuacionHistoria: notificacionNuevaContinuacionHistoria,
  notificacionNuevoRelato: notificacionNuevoRelato,
  notificacionNuevoChatStory: notificacionNuevoChatStory,
  notificacionNuevaOpinionRelato: notificacionNuevaOpinionRelato,
  notificacionNuevaOpinionChatStory: notificacionNuevaOpinionChatStory,
  fechaCreacion: {type: Date, default: Date.now},
  fecha: String,
  hora: String
});

const notificacionGlobal = Schema({
  tipo: Number,
  texto: String,
  fechaCreacion: {type: Date, default: Date.now},
  fecha: String,
  hora: String
});

const mensajePrivado = Schema({
  fecha: String,
  hora: String,
  fechaCreacion: {type: Date, default: Date.now},
  leido: {type: Boolean, default: false},
  destinatario: mongoose.Schema.Types.ObjectId,
  destinatarioName: String,
  mensaje: String,
  remitenteName: String,
  remitente: mongoose.Schema.Types.ObjectId
});

const preferenciaSchema = Schema ({
  nombre: String,
  activo: Boolean
});

const perfil = Schema({
  nombre: String,
  apellidos: String,
  sexo: String,
  foto_portada: String,
  foto_perfil: String,
  email: String,
  pais: String,
  lenguajes: [String],
  intereses: [String],
  blog: String,
  telefono: Number,
  descripcion: String,
  display_name: String,
  perfilCompleto: Boolean,
  fechaNacimiento: Date,
  twitter: String,
  google: String,
  facebook: String,
  numWallsCreated: {type: Number , default: 0},
  numRelatosCreated: {type: Number , default: 0},
  numChatStoriesCreated: {type: Number , default: 0},
  preferencias: [preferenciaSchema]
  // num likes recibidos en sus WCR
  // num veces compartidos recibidos en sus WCR
  // num comentarios realizados en relatos
});

const providerSchema = Schema({
  provider: String,
  providerId: String,
  providerData: {}
});

const usuario = Schema({
  login: String,
  password: String,
  siguiendo: [mongoose.Schema.Types.ObjectId],
  seguidores: [mongoose.Schema.Types.ObjectId],
  suscriptores: [mongoose.Schema.Types.ObjectId],
  suscritoA: [mongoose.Schema.Types.ObjectId],
  notificacionesFeed: [notificacionFeed],
  notificacionesGlobales: [notificacionGlobal],
  mensajesPrivados: [mensajePrivado],
  perfil: perfil,
  estado: {type: Number, default: Constantes.Usuario.ESTADO_SIN_VERIFICAR},
  //Normal o partner
  tipo: {type: Number, default: Constantes.Usuario.TIPO_NORMAL},
  necesitaRevalidarPassword: {type: Boolean, default: false},
  providers: [providerSchema]
});

usuario.index({login: 'text'});
usuario.index({'perfil.display_name': 'text'});
usuario.index({'perfil.nombre': 'text'});
usuario.index({'perfil.apellidos': 'text'});


// plugins ============
usuario.plugin(datosComunes);

// methods ======================
// generating a hash
usuario.methods.generateHash = function (password) {
  console.log((password));
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
usuario.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

usuario.methods.increaseWallsCreated = function (callback) {
  this.perfil.numWallsCreated++;
  this.save(callback);
};

usuario.methods.increaseRelatosCreated = function (callback) {
  this.perfil.numRelatosCreated++;
  this.save(callback);
};

usuario.methods.increaseChatStoriesCreated = function (callback) {
  this.perfil.numChatStoriesCreated++;
  this.save(callback);
};

usuario.statics.findUniqueUsername = function (username, suffix,
                                               callback) {
  var possibleUsername = username + (suffix || '');
  this.findOne({
    username: possibleUsername
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username, (suffix || 0) +
          1, callback);
      }
    } else {
      callback(null);
    }
  });
};

usuario.statics.findLoginDuplicate= function (user, callback) {

  this.findOne({
    'login': {'$regex' : '^' + user.login + '$', $options: 'i'}
  }, (err, userResult) => {
    if (!err) {
      if (!userResult) {
        // el Usuario no existe
        callback(user);
      } else {
        // el usario existe
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

usuario.statics.findEmailDuplicate = function (user, callback) {
  console.log(user);
  this.findOne({
    'perfil.email': user.perfil.email
  }, (err, userResult) => {
    if (!err) {
      if (!userResult) {
        // el Usuario no existe
        callback(user);
      } else {
        // el usario existe
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

usuario.methods.findByUserProviderId = function findByUserProviderId (cb) {

  return this.model('usuarios').findOne({
    providers: {
      $elemMatch: {
        provider: this.providers[0].provider,
        providerId: this.providers[0].providerId
      }
    }
  },cb);

};

usuario.set('toJSON', {
  getters: true,
  virtuals: true
});

// the schema is useless so far
// we need to create a model using it
const Usuario = mongoose.model('usuarios', usuario);
const NotificacionFeed = mongoose.model('notificacionFeed', notificacionFeed);
const NotificacionGlobal = mongoose.model('notificacionGlobal', notificacionGlobal);
const MensajePrivado = mongoose.model('mensajePrivado', mensajePrivado);
const NotificacionNuevoWall = mongoose.model('notificacionNuevoWall', notificacionNuevoWall);
const NotificacionNuevaHistoria = mongoose.model('notificacionNuevaHistoria', notificacionNuevaHistoria);
const NotificacionNuevaContinuacionHistoria = mongoose.model('notificacionNuevaContinuacionHistoria', notificacionNuevaContinuacionHistoria);
const NotificacionNuevoRelato = mongoose.model('notificacionNuevoRelato', notificacionNuevoRelato);
const NotificacionNuevoChatStory = mongoose.model('notificacionNuevoChatStory', notificacionNuevoChatStory);
const NotificacionNuevaOpinionRelato = mongoose.model('notificacionNuevaOpinionRelato', notificacionNuevaOpinionRelato);
const NotificacionNuevaOpinionChatStory = mongoose.model('notificacionNuevaOpinionChatStory', notificacionNuevaOpinionChatStory);
const Perfil = mongoose.model('perfil', perfil);
const ProviderSchema = mongoose.model('provider', providerSchema);
const PreferenciaSchema = mongoose.model('preferencia', preferenciaSchema)
