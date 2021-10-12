const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    crypto_id: {
        type: String,
        required: true,
        unique: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    total_quantity: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Investment', InvestmentSchema);