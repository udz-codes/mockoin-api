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
    inr: {
        type: String,
        required: true
    },
    crypto_id: {
        type: String,
        required: true
    },
    crypto_value: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema);