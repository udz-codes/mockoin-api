const router = require('express').Router();
const authenticateUser = require('./verifyToken');
const Transaction = require('../models/TransactionModel');


// Fetch transactions of the user, sorted by latest to oldest
router.get('/', authenticateUser, async (req, res) => {
    try {
        const transactions = await Transaction.find({user_id: req.user}).sort({created_at: -1});
        res.send(transactions)
    } catch (error) {
        res.send({message: "Encountered an error while fetching transactions"})
    }
});


// Fetch transactions of specific crypto of the user
router.get('/:crypto_id', authenticateUser, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user_id: req.user,
            crypto_id: req.params.crypto_id
        }).sort({created_at: -1});
        
        res.send(transactions);
    } catch (error) {
        res.send({message: "Encountered an error while fetching the transaction"})
    }
});


module.exports = router