// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var inboxSchema = new Schema({
    from: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, // Notification creator
    to: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], // Ids of the receivers of the notification
    message: String, // any description of the notification message 
    read: Boolean,
    sent: read_at: {type: Date, default: Date.now}
    
});

// the schema is useless so far
// we need to create a model using it
var Inbox = mongoose.model('Inbox', inboxSchema);

// make this available to our users in our Node applications
module.exports = Inbox;