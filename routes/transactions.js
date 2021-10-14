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


// Fetch single transaction of the user
router.get('/:id', authenticateUser, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            user_id: req.user,
            _id: req.params.id
        });
        
        if(transaction) res.send(transaction);
        else res.status(400).send({message: "Transaction not found"})
    } catch (error) {
        res.send({message: "Encountered an error while fetching the transaction"})
    }
});


module.exports = router