// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Constantes = require("../constantes/constantes");
const datosComunes = require('./comunes.model');

//Utilidades
var Utils = require("../services/utils.service").Utils;

//Schema's
var opinionRelato = Schema({
    textoContenido: String,
    fechaCreacion: Date,
    fecha: String,
    hora: String,
    urlFoto: String,
    autor: mongoose.Schema.Types.ObjectId,
    autorName: String,
    respuesta: this
});

var relato = Schema({
    textoContenido: String,
    titulo: String,
    fecha: String,
    hora: String,
    urlImagen: String,
    autor: {type: Schema.Types.ObjectId, ref:'usuarios'},
    autorNombre: String,
    opiniones: [opinionRelato],
    categoria: {type: String , enum: Constantes.Categorias.CATEGORIAS},
    tipo: {type:Number, default: Constantes.Tipo.PUBLICO},
    lang: {type: String , enum: Constantes.Idiomas.IDIOMAS},
    estadistica: {type: Schema.Types.ObjectId, ref:'Estadistica'},
    tags: [String]
});

relato.plugin(datosComunes);
relato.index({titulo: 'text'});
relato.index({textoContenido: 'text'});

//Pre Middlewares
relato.pre('save', function (next){

    this.fecha = Utils.getFecha(this.fechaCreacion);
    this.hora = Utils.getHora(this.fechaCreacion);

    next();
});



opinionRelato.pre('save', function (next){

    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

var Relato = mongoose.model('relato', relato);
var OpinionRelato = mongoose.model('opinionRelato', opinionRelato);
