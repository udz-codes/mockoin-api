const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': `Please enter a valid email`,
            }),
    
        name: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.min': `Name has to be atleast 3 characters`,
            }),
        
        password: Joi.string()
            .min(8)
            .required()
            .messages({
                'string.min': `Password has to be atleast 8 characters`,
            }),
        
        date: Joi.date()
            .default(Date.now),
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': `Please enter a valid email`,
            }),
        
        password: Joi.string()
            .min(8)
            .required()
            .messages({
                'string.min': `Password must be atleast 8 characters`,
            }),
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