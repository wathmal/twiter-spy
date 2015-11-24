/**
 * Created by wathmal on 11/4/15.
 */
var promise = require('promise');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/edulanka');
var db = mongoose.connection;

// schemas
var students= mongoose.model('students', {
    name: String,
    gender: String,
    isSponsored: Boolean,
    phone: String,
    address: String,
    sponsors: [{start: String, end: String, amount: Number}]
});

