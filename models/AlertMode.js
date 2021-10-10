const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    crypto_id: {
        type: String,
        required: true
    },

    // TODO: ADD MORE INFORMATION FOR ALERTS

    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Alert', AlertSchema);