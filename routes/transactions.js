const router = require('express').Router();
const authenticateUser = require('./verifyToken');
const {transactionValidation} = require('../validations.js');
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


// NOT REQUIRED NOW, TRANSACTIONS ARE BEING RECORDED IN INVESTMENT

// Create a new transaction
// router.post('/', authenticateUser, async (req, res) => {

//     // Validation check
//     const {error} = transactionValidation(req.body);
//     if(error) return res.send(error.details[0].message).status(400);

//     // Action type check, there are only 2 options
//     if  (req.body.action_type == "BUY" || req.body.action_type == "SELL") {
//         const transaction  = Transaction({
//             user_id: req.user._id,
//             action_type: req.body.action_type,
//             inr: req.body.inr,
//             crypto_id: req.body.crypto_id,
//             crypto_value: req.body.crypto_value
//         })
        
//         try {
//             const newTransaction = await transaction.save()
//             res.send(newTransaction)
//         } catch (error) {
//             res.send({message: error})
//         }
//     } else {
//         res.send({message: "Wrong action type"})
//     }
// });
module.exports = router