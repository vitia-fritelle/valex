import Joi from 'joi';

const cardTypeSchema = Joi.object({
    cardId: Joi.number().required(),
    type: Joi.string().required().valid(
        'groceries', 
        'restaurants', 
        'transport', 
        'education', 
        'health',
    ),
});

const cardAmountSchema = Joi.object({
    cardId: Joi.number().required(),
    amount: Joi.number().required().greater(0),
});

const cardSchemas = {
    cardTypeSchema,
    cardAmountSchema,
};

export default cardSchemas;
