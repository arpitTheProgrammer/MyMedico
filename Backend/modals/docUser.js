
const mongoose = require('mongoose')

const docSchema = new mongoose.Schema({
    docFullName: {
        type: String,
        required: true
    }, 
    hospitalName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    docPhoneNumber: {
        type: Number,
    },
    specialization: {
        type: String
    },
    docLocation: {
        type: String
    },
    docBiography: {
        type: String
    },
    docProfileImage: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    isLoggedin:{
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    }
}, {timestamps: true})

const docUser = mongoose.model('docUser', docSchema)

module.exports = docUser;