// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var notificationSchema = new Schema({
    sender: {type:mongoose.Schema.Types.ObjectId, ref:'User'}, // Notification creator
    receiver: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}], // Ids of the receivers of the notification
    message: String, // any description of the notification message 
    refID: {type: mongoose.Schema.Types.ObjectId}, //post id, comment id, whatever.. 
    read_by:[{
     readerId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
     read_at: {type: Date, default: Date.now}
    }],
    created_at:{type: Date, default: Date.now}
});

// on every save, add the date
notificationSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var Notification = mongoose.model('Notification', notificationSchema);

// make this available to our users in our Node applications
module.exports = Notification;