var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Mongoose Schema
var PlaceSchema = new Schema({
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    address: {type: String},
    placeType: {type: String},
    name: {type: String},
    private: {type: Boolean},
    notes: {type: String},
    category: {type: String},
    priceRange: {type: String},
    userID: {type: String, required: true},
    userName: {type: String, required: true}

});


module.exports = mongoose.model('Place', PlaceSchema);