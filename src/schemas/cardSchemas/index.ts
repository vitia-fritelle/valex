import Joi from 'joi';

const cardTypeSchema = Joi.object({
    employeeId: Joi.number().required(),
    type: Joi.string().required().valid(
        'groceries', 
        'restaurant', 
        'transport', 
        'education', 
        'health',
    ),
});

const cardAmountSchema = Joi.object({
    amount: Joi.number().required().greater(0),
}).unknown(true);

const cardSchemas = {
    cardTypeSchema,
    cardAmountSchema,
};

export default cardSchemas;
