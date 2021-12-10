const router = require('express').Router();
const authenticateUser = require('./verifyToken');
const Investment = require('../models/InvestmentModel');
const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel');


// Read all investments
router.get('/', authenticateUser, async (req, res) => {
    
    try {
        const investments = await Investment.find({
            user_id: req.user,
        });
        return res.send(investments)
    } catch (error) {
        return res.status(400).send({message: "Encountered an error while fetching investments"})
    }
});


// Read a specific investment with crypto_id
router.get('/:crypto_id', authenticateUser, async (req, res) => {
    
    try {
        const investment = await Investment.findOne({
            user_id: req.user,
            crypto_id: req.params.crypto_id
        });
        
        if (investment) return res.status(200).send(investment);
        else return res.status(400).send({message: "Investment not found"});

    } catch (error) {
        return res.send({message: "Encountered an error while fetching the investment"})
    }
});


// Create a new investment
router.post('/buy', authenticateUser, async (req, res) => {

    // Check if user has balance to invest in thsi currency
    const user = await User.findOne({_id: req.user._id})
    if(user && user.funds < req.body.inr) return res.status(400).send({
        message: "Insufficient balance"
    })

    // Find if user has invested in save crypto before
    const investment = await Investment.findOne({
        user_id: req.user._id,
        crypto_id: req.body.crypto_id
    })

    // Creating transaction for later use
    const transaction  = Transaction({
        user_id: req.user._id,
        action_type: "BUY",
        inr: req.body.inr,
        crypto_id: req.body.crypto_id,
        crypto_value: req.body.quantity
    })

    // If user has invested already in the crypto, quantity of crypto and amount invested will be incremented 
    if (investment) {
        const new_quantity = parseFloat(investment.total_quantity) + parseFloat(req.body.quantity);     // Old quantity + quantity in request
        const new_amount = parseFloat(investment.total_amount) + parseFloat(req.body.inr);      // Old amount invested + amount invested in current request
        
        try {

            // Update investment
            await Investment.updateOne({
                user_id: req.user._id,
                crypto_id: req.body.crypto_id
            },{
                total_quantity: new_quantity,
                total_amount: new_amount
            })

            // Subtract invested money from user's account
            const newFunds = parseFloat(user.funds) - parseFloat(req.body.inr);
            await User.updateOne({_id: req.user._id}, {
                funds: newFunds
            });
            
            // Saving the transaction
            transaction.save()

            return res.status(200).send({
                message: "Investment updated"
            })
        } catch (error) {
            return res.status(400).send({
                message: error
            })
        }

    }
    
    // If user has not invested already in the crypto, new investment will be created
    else {

        // Creating new investment
        const newInvestment = Investment({
            user_id: req.user._id,
            crypto_id: req.body.crypto_id,
            total_amount: req.body.inr,
            total_quantity: req.body.quantity
        })

        try {

            // Save new investment
            await newInvestment.save();
            
            // Updating user balance
            const newFunds = parseFloat(user.funds) - parseFloat(req.body.inr);
            await User.updateOne({_id: req.user._id}, {
                funds: newFunds
            })

            // Saving transaction
            transaction.save()
            
            return res.status(200).send({
                message: "Investment created"
            })
        } catch (error) {
            return res.status(400).send({message: error})
        }
    }
});


// Selling full or part of investment
router.post('/sell', authenticateUser, async (req, res) => {

    // User will send
    // {
    //     "crypto_id": "ETH"
    //     "quantity": "0.000028",
    //     "amount": 100,
    // }

    // Find if user has invested in save crypto before
    const investment = await Investment.findOne({
        user_id: req.user._id,
        crypto_id: req.body.crypto_id
    })

    if(!investment) return res.status(400).send({
        message: "Investment not found"
    })

    if(parseFloat(investment.total_amount) < parseFloat(req.body.amount)) return res.status(400).send({
        message: "Sale amount is more than invested amount"
    })

    if(parseFloat(investment.total_quantity) < parseFloat(req.body.quantity)) return res.status(400).send({
        message: "Cannot sell more currency than investment"
    })

    const transaction  = Transaction({
        user_id: req.user._id,
        action_type: "SELL",
        inr: parseFloat(req.body.amount),
        crypto_id: req.body.crypto_id,
        crypto_value: req.body.quantity
    })

    const newTotalAmount = parseFloat(investment.total_amount) - parseFloat(req.body.amount);
    const newTotalQuantity = parseFloat(investment.total_quantity) - parseFloat(req.body.quantity);

    // If investment is 0, deleting the investment
    if (newTotalAmount <= 0 || newTotalQuantity <= 0) {
        await Investment.remove({
            user_id: req.user._id,
            crypto_id: req.body.crypto_id
        })
    }

    // If investment is not = 0, Updating the investment
    await Investment.updateOne({
        user_id: req.user._id,
        crypto_id: req.body.crypto_id
    }, {
        total_amount: newTotalAmount,
        total_quantity: newTotalQuantity
    })

    // Adding investment_money + profit in user's funds
    const user = await User.findOne({_id: req.user._id});
    await User.updateOne({
        _id: req.user._id,
    }, {
        funds: parseFloat(user.funds) + parseFloat(req.body.amount)
    })

    // Saving the transaction
    await transaction.save();

    return res.status(200).send({
        message: "Investment updated"
    })
});


module.exports = router