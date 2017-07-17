// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarios = mongoose.model('usuarios');
const datosComunes = require('./comunes.model');

// create a schema
const inboxSchema = new Schema({
    from: {type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}, // Notification creator
    to: [{type:mongoose.Schema.Types.ObjectId, ref:'usuarios'}], // Ids of the receivers of the notification
    message: String, // any description of the notification message
    read: Boolean,
    sent: {type: Date, default: Date.now}
});

inboxSchema.plugin(datosComunes);

// the schema is useless so far
// we need to create a model using it
const Inbox = mongoose.model('Inbox', inboxSchema);

// make this available to our users in our Node applications
module.exports = Inbox;
