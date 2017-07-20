const mongoose = require('mongoose');
const usuarios = mongoose.model('usuarios');
const Estadistica = mongoose.model('Estadistica');
const Schema = mongoose.Schema;
const datosComunes = require('./comunes.model');
const Constantes = require("../constantes/constantes");

const ChatSchema = Schema({
  personaje: String,
  chat: String,
  imagen: String
});

const ChatStorySchema = Schema({
  titulo: String,
  autor: {type: Schema.Types.ObjectId, ref:'usuarios'},
  autorNombre: String,
  categoria: {type: String , enum: Constantes.Categorias.CATEGORIAS},
  urlImagen: String,
  chats: [ChatSchema],
  estadistica: {type: Schema.Types.ObjectId, ref:'Estadistica'},
  tipo: {type:Number, default: Constantes.Tipo.PUBLICO},
  lang: {type: String , enum: Constantes.Idiomas.IDIOMAS},
  links: [{
    rel: String,
    href: String
  }]
});

ChatStorySchema.plugin(datosComunes);
ChatStorySchema.index({titulo: 'text'});

ChatStorySchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const ChatStory = mongoose.model('ChatStory', ChatStorySchema);
const Chat = mongoose.model('Chat', ChatSchema);
