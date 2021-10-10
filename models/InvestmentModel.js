const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    crypto_id: {
        type: String,
        required: true
    },
    quanity: {
        type: Number,
        required: true
    },
    price_at: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Investment', InvestmentSchema);