// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Utilidades
var Utils = require("../services/utils.service").Utils;
var Constantes = require("../constantes/constantes");

//Schemas
var item = Schema({
    contenido: String,
    fechaCreacion: Date,
    urlFoto: String,
    autor: mongoose.Schema.Types.ObjectId,
    autorName: String,
    fecha: String,
    hora: String,
});

var historia = Schema({
    comentarios: [item],
    suscriptores: [mongoose.Schema.Types.ObjectId],
    likes: {type:Number, default: 0},
    fechaCreacion: Date,
    vecesVisto:{type:Number, default: 0},
    idWall: mongoose.Schema.Types.ObjectId,
    //activo: {type:Boolean, true},
    autor: mongoose.Schema.Types.ObjectId,
    urlFoto: String,
    vecesCompartido: {type:Number, default: 0}
});

//Schema del wall
var wall = Schema({
    titulo: String,
    categoria: String,
    likes: {type:Number, default: 0},
    likers: [mongoose.Schema.Types.ObjectId],
    urlImagen:String,
    fechaCreacion: Date,
    fecha: String,
    hora: String,
    //Publico o privado
    tipo: {type:Number, default: Constantes.Wall.PUBLICO},
    colaboradoresPermitidos: [mongoose.Schema.Types.ObjectId],
    vecesVisto:{type:Number, default: 0},
    iniciosHistorias: [item],
    compartidoFacebook:{type:Number, default: 0},
    compartidoTwitter: {type:Number, default: 0},
    compartidoGoogle: {type:Number, default: 0},
    //Publicado o borrador, suspendido, baneado por reports, etc...
    estado: {type:Number, default: 1},
    activo: {type: Boolean, default:true},
    contenidoTexto: String,
    autor: mongoose.Schema.Types.ObjectId,
    nombreAutor: String,
    participantes:[mongoose.Schema.Types.ObjectId]
});

//Pre Middlewares
wall.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

historia.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});

item.pre('save', function (next){
    let fechaCreacion = new Date();

    this.fechaCreacion = fechaCreacion;
    this.fecha = Utils.getFecha(fechaCreacion);
    this.hora = Utils.getHora(fechaCreacion);

    next();
});



/*// Story schema
var continuacionSchema = new Schema({
    autor: String,
    body: String,
    created_at: Date,
    updated_at: Date
});

// Story schema
var storySchema = new Schema({
    autor: String,
    body: String,
    continuaciones: [continuacionSchema],
    created_at: Date,
    updated_at: Date
});

// Wall schema
var wallSchema = new Schema({
    title: String,
    category: String,
    url_img: String,
    body: String,
    autor: String,
    tipo: String,
    amigos: [String],
    dedicado: [String],
    permalink: String,
    tags: [String],
    likes: Number,
    views: Number,
    historias: [storySchema],
    privado: Boolean,
    created_at: Date,
    updated_at: Date,
    is_active: { type: Boolean , default: true}
});

// on every save, add the date
wallSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var Wall = mongoose.model('Wall', wallSchema);

// make this available to our API in our Node applications
module.exports = Wall;
*/

//Modelos
var Wall = mongoose.model('wall', wall);
var Historia = mongoose.model('historia', historia);
var Item = mongoose.model('item', item);
