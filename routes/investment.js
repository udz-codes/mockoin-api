const router = require('express').Router();
const authenticateUser = require('./verifyToken');
const Investment = require('../models/InvestmentModel');
const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel');


// Create a new investment
router.post('/', authenticateUser, async (req, res) => {

    // EXAMPLE BODY OBJECT {
    //     crypto_id: "BTC",
    //     inr: "100",
    //     quantity: "0.000028"
    // }

    const investment = await Investment.findOne({
        user_id: req.user._id,
        crypto_id: req.body.crypto_id
    })

    const transaction  = Transaction({
        user_id: req.user._id,
        action_type: "BUY",
        inr: req.body.inr,
        crypto_id: req.body.crypto_id,
        crypto_value: req.body.quantity
    })

    if (investment) {
        const new_quantity = parseFloat(investment.total_quantity) + parseFloat(req.body.quantity);
        const new_amount = investment.total_amount + req.body.inr;
        console.log(new_amount)
        try {
            await Investment.updateOne({
                user_id: req.user._id,
                crypto_id: req.body.crypto_id
            },{
                total_quantity: new_quantity,
                total_amount: new_amount
            })

            const user = await User.findOne({_id: req.user._id})

            if(user) {
                const newFunds = user.funds - req.body.inr;
                await User.updateOne({_id: req.user._id}, {
                    funds: newFunds
                })
            }
            
            transaction.save()

            res.send("Investment updated")

        } catch (error) {
            res.send({
                message: error
            })
        }

    } else {
        const newInvestment = Investment({
            user_id: req.user._id,
            crypto_id: req.body.crypto_id,
            total_amount: req.body.inr,
            total_quantity: req.body.quantity
        })

        try {
            await newInvestment.save();
            
            const user = await User.findOne({_id: req.user._id})

            if(user) {
                const newFunds = user.funds - req.body.inr;
                await User.updateOne({_id: req.user._id}, {
                    funds: newFunds
                })
            }

            transaction.save()
            
            res.send("Investment added")
        } catch (error) {
            res.send("Investment creation error")
        }
    }
});


// Read all investments
router.get('/', authenticateUser, async (req, res) => {
    
    res.send("Get all investments")
});


// Read a specific investment with crypto_id
router.get('/:crypto_id', authenticateUser, async (req, res) => {
    
    res.send(`Get single investment with id: ${req.params.crypto_id}`)
});


// Delete an investment
router.post('/:crypto_id', authenticateUser, async (req, res) => {
    res.send(`Delete an investment with id: ${req.params.crypto_id}`)
});


module.exports = router