// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Story schema
var continuacionSchema = new Schema({
    autor: String,
    body: String,
    created_at: Date,
    updated_at: Date
});

// Story schema
var historiaSchema = new Schema({
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
    historias: [historiaSchema],
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
