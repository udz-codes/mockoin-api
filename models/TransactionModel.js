const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true
    },
    action_type: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
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
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema);