const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
            .email()
            .required(),
    
        name: Joi.string()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
        
        date: Joi.date()
            .default(Date.now),
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
            .email()
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
    })

    return schema.validate(data)
}

const transactionValidation = (data) => {
    const schema = Joi.object({
        
        action_type: Joi.string()
            .required(),

        inr: Joi.number()
            .required(),

        crypto_id: Joi.string()
            .required()
            .min(3),

        crypto_value: Joi.string()
            .required(),
    })

    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.transactionValidation = transactionValidation