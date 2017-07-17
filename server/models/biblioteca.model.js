const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarios = mongoose.model('usuarios');
const ChatStory = mongoose.model('ChatStory');
const relato = mongoose.model('relato');
const wall = mongoose.model('wall');

const BibliotecaSchema = Schema({
  usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
  walls: [{type: Schema.Types.ObjectId, ref: 'wall'}],
  chatStories: [{type: Schema.Types.ObjectId, ref: 'ChatStory'}],
  relatos: [{type: Schema.Types.ObjectId, ref: 'relato'}]
});

BibliotecaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

const Biblioteca = mongoose.model('Biblioteca', BibliotecaSchema);
