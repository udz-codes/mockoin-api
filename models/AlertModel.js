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
    current_inr: {
        type: String,
        required: true
    },
    alert_inr: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Alert', AlertSchema);