// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Utilidades
var Utils = require("../services/utils.service").Utils;
const Constantes = require("../constantes/constantes");
const datosComunes = require('./comunes.model');

//Schemas
var continuacion = Schema({
    contenido: String,
    fechaCreacion: Date,
    urlFoto: String,
    autor: mongoose.Schema.Types.ObjectId,
    autorName: String,
    fecha: String,
    hora: String,
    padre: mongoose.Schema.Types.ObjectId,
    idWall: mongoose.Schema.Types.ObjectId,
    idHistoria: mongoose.Schema.Types.ObjectId,
    likes:{type:Number, default: 0},
    likers:[mongoose.Schema.Types.ObjectId],
});

/*Esta fuera por como funciona Javascript ya que no se puede poner dentro del Schema porque
en el momento de ponerlo todavúa no esta definido nodo.*/


//Schema del wall
var wall = Schema({
    titulo: String,
    categoria: {type: String , enum: Constantes.Categorias.CATEGORIAS},
    lang: {type: String , enum: Constantes.Idiomas.IDIOMAS},
    urlImagen:String,
    fecha: String,
    hora: String,
    colaboradoresPermitidos: [mongoose.Schema.Types.ObjectId],
    vecesVisto:{type:Number, default: 0},
    cuerpoWall: String,
    compartidoFacebook:{type:Number, default: 0},
    compartidoTwitter: {type:Number, default: 0},
    compartidoGoogle: {type:Number, default: 0},
    tipo: {type:Number, default: Constantes.Tipo.PUBLICO},
    //iniciosHistorias: [item],
    //Publicado o borrador, suspendido, baneado por reports, etc...
    estado: {type:Number, default: 1},
    contenidoTexto: String,
    autor: mongoose.Schema.Types.ObjectId,
    autorNombre: String,
    estadistica: {type: Schema.Types.ObjectId, ref:'Estadistica'},
    participantes:[mongoose.Schema.Types.ObjectId]
});

// plugin
wall.plugin(datosComunes);
wall.index({titulo: 'text'});

//Pre Middlewares
wall.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

// historia.pre('save', function (next){
//     let fechaCreacion = new Date();
//
//     this.fechaCreacion = fechaCreacion;
//     this.fecha = Utils.getFecha(fechaCreacion);
//     this.hora = Utils.getHora(fechaCreacion);
//
//     next();
// });

continuacion.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

//Modelos
var Wall = mongoose.model('wall', wall);
var Continuacion = mongoose.model('continuacion', continuacion);
