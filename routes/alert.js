const router = require('express').Router();
const authenticateUser = require('./verifyToken');
const Alert = require('../models/AlertModel');

router.post('/', authenticateUser, async (req, res) => {
    try {
        const alert = Alert({
            user_id: req.user._id,
            crypto_id: req.body.crypto_id,
            current_inr: req.body.current_inr,
            alert_inr: req.body.alert_inr
        })

        const alertResponse = await alert.save()

        res.send(alertResponse)
    } catch (error) {
        res.status(400).send({
            message: error
        })
    }
})


router.get('/', authenticateUser, async (req, res) => {
    try {
        const alerts = await Alert.find({
            user_id: req.user._id
        })

        if(alerts) return res.send(alerts);
        else return res.status(400).send({
            message: "Alerts not found"
        })
    } catch (error) {
        res.status(400).send({
            message: "Encountered an error while fetching alerts"
        })
    }
})


router.get('/:alert_id', authenticateUser, async (req, res) => {
    try {
        const alert = await Alert.findOne({
            _id: req.params.alert_id
        })

        if(alert) return res.send(alert);
        else return res.status(400).send({
            message: "Alert not found"
        })
    } catch (error) {
        res.status(400).send({
            message: "Encountered an error while fetching alert"
        })
    }
})

module.exports = router