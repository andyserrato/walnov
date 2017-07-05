// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    tituloRelato: String,
    fechaCreacion: Date,
    fecha: String,
    hora: String,
    likes: {type:Number, default: 0},
    vecesVisto: {type:Number, default: 0},
    compartidoFacebook:{type:Number, default: 0},
    compartidoTwitter: {type:Number, default: 0},
    compartidoGoogle: {type:Number, default: 0},
    urlImagen: String,
    autor: mongoose.Schema.Types.ObjectId,
    autorName: String,
    opiniones: [opinionRelato],
    categoria: String,
    tags: [String]
});

//Pre Middlewares
relato.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

opinionRelato.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

var Relato = mongoose.model('relato', relato);
var OpinionRelato = mongoose.model('opinionRelato', opinionRelato);
