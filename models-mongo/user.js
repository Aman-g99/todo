var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");
// const Joi = require('Joi');
// const config = require('config');
// const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     //minlength: 3,
    //     // maxlength: 50
    // },
    email: {
        type: String,
        required: true,
        //minlength: 5,
        //maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        //minlength: 5,
        //maxlength: 1024
    },
    todo: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model("User" , UserSchema);