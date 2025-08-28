const mongoose = require('mongoose')

const patSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    varificationCode: {
        type: String
    },
    isLoggedin: {
        type: Boolean,
        default: false
    },
    isVarified: {
        type : Boolean,
        default: false
    }
})

const patUser = mongoose.model('patUser', patSchema)

module.exports = patUser;