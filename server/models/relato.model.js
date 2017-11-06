// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Constantes = require("../constantes/constantes");
const datosComunes = require('./comunes.model');

//Utilidades
var Utils = require("../services/utils.service").Utils;

//Schema's
var opinionRelato = Schema({
  texto: String,
  urlImagen: String,
  autor: {type: Schema.Types.ObjectId, ref: 'usuarios'},
  autorNombre: String,
  numReports: {type: Number, default: 0},
  respuesta: this
});

opinionRelato.plugin(datosComunes);

var relato = Schema({
  titulo: String,
  autor: {type: Schema.Types.ObjectId, ref: 'usuarios'},
  // categoria: {type: String , enum: Constantes.Categorias.CATEGORIAS},
  autorNombre: String,
  categoria: String,
  urlImagen: String,
  texto: String,
  opiniones: [opinionRelato],
  tipo: {type: Number, default: Constantes.Tipo.PUBLICO},
  lang: {type: String, enum: Constantes.Idiomas.IDIOMAS},
  exclusivo: Boolean,
  estadistica: {type: Schema.Types.ObjectId, ref: 'Estadistica'},
  tags: [String]
});

relato.plugin(datosComunes);
relato.index({titulo: 'text'});
relato.index({texto: 'text'});

relato.set('toJSON', {
  getters: true,
  virtuals: true
});

var Relato = mongoose.model('relato', relato);
var OpinionRelato = mongoose.model('opinionRelato', opinionRelato);
