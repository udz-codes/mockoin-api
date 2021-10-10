const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    funds: {
        type: Number,
        default: 30000
    },
    currency: {
        type: String,
        length: 3,
        default: 'INR'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);