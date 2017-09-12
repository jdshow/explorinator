var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
var PlaceSchema = new Schema({
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    address: {type: String},
    placeType: {type: String},
    name: {type: String},
    private: {type: Boolean, required: true},
    notes: {type: String},
    category: {type: String},
    priceRange: {type: String}

});


module.exports = mongoose.model('Place', PlaceSchema);