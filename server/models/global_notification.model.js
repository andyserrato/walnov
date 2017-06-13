// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var globalNotificationSchema = new Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, // Notification creator
    message: String, // any description of the notification message 
    read_by:[{
     readerId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
     read_at: {type: Date, default: Date.now}
    }],
    created_at:{type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var globalNotification = mongoose.model('globalNotification', globalNotificationSchema);

// make this available to our users in our Node applications
module.exports = globalNotification;