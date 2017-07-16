const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarios = mongoose.model('usuarios');
const datosComunes = require('./comunes.model');

const EstadisticaSchema = Schema({
  vecesVisto: {type:Number, default: 0},
  visitas: [{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}],
  likers: [{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}],
  likes: {type: Number, default: 0},
  compartidoFacebook:[{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}],
  compartidoTwitter: [{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}],
  compartidoGoogle: [{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}],
  vecesCompartidoFacebook:{type:Number, default: 0},
  vecesCompartidoTwitter: {type:Number, default: 0},
  vecesCompartidoGoogle: {type:Number, default: 0},
  wall: {type:mongoose.Schema.Types.ObjectId, ref:'wall'},
  chatStory: {type:mongoose.Schema.Types.ObjectId, ref:'ChatStory'},
  relato: {type:mongoose.Schema.Types.ObjectId, ref:'relato'}
});

EstadisticaSchema.plugin(datosComunes);

const Estadistica = mongoose.model('Estadistica', EstadisticaSchema);

