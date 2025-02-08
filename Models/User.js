const mongoose = require('mongoose');

const UserEmail = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

module.exports = mongoose.model('UserEmail', UserEmail);
