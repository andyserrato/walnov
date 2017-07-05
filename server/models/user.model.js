// grab the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var Constantes = require("../constantes/constantes");

/*
const providerSchema = {
  provider: String,
  providerId: String,
  providerData: {}
};

// create a schema
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: {type: Boolean, default: false},
  location: String,
  verificado: Boolean,
  profileComplete: {type: Boolean, default: false},
  urlImage: String,
  fechaNacimiento: Date,
  is_active: {type: Boolean, default: true},
  created_at: Date,
  updated_at: Date,
  providers: [providerSchema]
});

*/


var notificacionNuevaHistoria = Schema({
    texto: String,
    tituloWall: String,
    idWall: mongoose.Schema.Types.ObjectId,
    indiceHistoria: Number,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
});

var notificacionNuevoWall = Schema({
    texto: String,
    tituloWall: String,
    idWall: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
});

var notificacionNuevaContinuacionHistoria = Schema({
    texto: String,
    tituloWall: String,
    idWall: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
    idHistoria: mongoose.Schema.Types.ObjectId,
});

var notificacionNuevoRelato = Schema({
    texto: String,
    tituloRelato: String,
    idRelato: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
});

var notificacionNuevoChatStory = Schema({
    texto: String,
    tituloChatStory: String,
    idChatStory: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
});

var notificacionNuevaOpinionRelato = Schema({
    texto: String,
    tituloRelato: String,
    idRelato: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String
});

var notificacionNuevaOpinionChatStory = Schema({
    texto: String,
    tituloChatStory: String,
    idChatStory: mongoose.Schema.Types.ObjectId,
    refAutor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
});

var notificacionFeed = Schema({
    tipo: Number,
    //Este es el texto de lo que se quiere mostrar, la accion en si ira en tipo, es decir,
    //Pepe ha conrinuado tu historia, se sacará a partir del nombre del autor y el wall que sea.
    notificacionNuevaHistoria: notificacionNuevaHistoria,
    notificacionNuevoWall: notificacionNuevoWall,
    notificacionContinuacionHistoria: notificacionNuevaContinuacionHistoria,
    notificacionNuevoRelato: notificacionNuevoRelato,
    notificacionNuevoChatStory: notificacionNuevoChatStory,
    notificacionNuevaOpinionRelato: notificacionNuevaOpinionRelato,
    notificacionNuevaOpinionChatStory:notificacionNuevaOpinionChatStory,
    fechaCreacion:Date,
    fecha:String,
    hora: String
});

var notificacionGlobal = Schema({
   tipo: Number,
   texto: String,
   fechaCreacion:Date,
   fecha:String,
   hora: String
});

var mensajePrivado = Schema({
  fecha:String,
  hora: String,
  fechaCreacion: Date,
  leido: {type:Boolean, default: false},
  destinatario: mongoose.Schema.Types.ObjectId,
  destinatarioName: String,
  mensaje: String,
  remitenteName: String,
  remitente: mongoose.Schema.Types.ObjectId
});

var perfil = Schema({
    nombre: String,
    apellidos: String,
    sexo: String,
    foto_portada: String,
    foto_perfil: String,
    email: String,
    pais: String,
    lenguajes: String,
    descripcion: String,
    display_name: String
});

var usuario = Schema({
    login: String,
    name:String,
    password: String,
    siguiendo:[mongoose.Schema.Types.ObjectId],
    seguidores:[mongoose.Schema.Types.ObjectId],
    suscriptores:[mongoose.Schema.Types.ObjectId],
    notificacionesFeed:[notificacionFeed],
    notificacionesGlobales:[notificacionGlobal],
    mensajesPrivados: [mensajePrivado],
    fechaCreacion: Date,
    perfil: perfil,
    estado: {type:Number, default: Constantes.Usuario.ESTADO_SIN_VERIFICAR},
    //Normal o partner
    tipo: {type:Number, default: Constantes.Usuario.TIPO_NORMAL},
    necesitaRevalidarPassword: {type:Boolean, default: false}
});


// methods ======================
// generating a hash
/*usuario.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
 usuario.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// on every save, add the date
 usuario.pre('save', function(next) {
    // get the current date
    const currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});
*/

//Pre middlewares
notificacionFeed.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

usuario.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;

    next();
});

mensajePrivado.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

usuario.statics.findUniqueUsername = function(username, suffix,
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

usuario.set('toJSON', {
  getters: true,
  virtuals: true
});

// the schema is useless so far
// we need to create a model using it
var Usuario = mongoose.model('usuarios', usuario);
var NotificacionFeed = mongoose.model('notificacionFeed', notificacionFeed);
var NotificacionGlobal = mongoose.model('notificacionGlobal', notificacionGlobal);
var MensajePrivado = mongoose.model('mensajePrivado', mensajePrivado);
var NotificacionNuevoWall = mongoose.model('notificacionNuevoWall', notificacionNuevoWall);
var NotificacionNuevaHistoria =  mongoose.model('notificacionNuevaHistoria', notificacionNuevaHistoria);
var NotificacionNuevaContinuacionHistoria =  mongoose.model('notificacionNuevaContinuacionHistoria', notificacionNuevaContinuacionHistoria);
var NotificacionNuevoRelato =  mongoose.model('notificacionNuevoRelato', notificacionNuevoRelato);
var NotificacionNuevoChatStory =  mongoose.model('notificacionNuevoChatStory', notificacionNuevoChatStory);
var NotificacionNuevaOpinionRelato =  mongoose.model('notificacionNuevaOpinionRelato', notificacionNuevaOpinionRelato);
var NotificacionNuevaOpinionChatStory =  mongoose.model('notificacionNuevaOpinionChatStory', notificacionNuevaOpinionChatStory);
var Perfil =  mongoose.model('perfil', perfil);
