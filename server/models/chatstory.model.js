const mongoose = require('mongoose');
const usuarios = mongoose.model('usuarios');
const Estadistica = mongoose.model('Estadistica');
const Schema = mongoose.Schema;
const datosComunes = require('./comunes.model');

const ChatSchema = Schema({
  personaje: String,
  chat: String,
  imagen: String
});

const ChatStorySchema = Schema({
  titulo: String,
  autor: {type: Schema.Types.ObjectId, ref:'usuarios'},
  autorNombre: String,
  categoria: String,
  imagenFondo: String,
  chats: [ChatSchema],
  estadistica: {type: Schema.Types.ObjectId, ref:'Estadistica'},
  links: [{
    rel: String,
    href: String
  }]
});

ChatStorySchema.plugin(datosComunes);

ChatStorySchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const ChatStory = mongoose.model('ChatStory', ChatStorySchema);
const Chat = mongoose.model('Chat', ChatSchema);
