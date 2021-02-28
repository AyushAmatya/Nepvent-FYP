const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {type: String, required: true, unique: false, trim: true},
    middleName: {type: String, required: false, unique: false, trim: true},
    lastName: {type: String, required: true, unique: false, trim: true},
    country: {type: String, required: true, unique: false, trim: true},
    address: {type: String, required: true, unique: false, trim: true, minlength: 3},
    contactNumber: {type: String, required: true, unique: false, trim: true, minlength: 3},
    email: {type: String, required: true, unique: false, trim: true, minlength: 3},
    userName: {type: String, required: true, unique: true, trim: true, minlength: 3},
    password: {type: String, required: true, unique: false, trim: true, minlength: 3},
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;