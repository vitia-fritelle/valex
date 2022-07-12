import Joi from 'joi';

const apiKeySchema = Joi.object({
    'x-api-key': Joi.string().required()
});

const headersSchemas = {
    apiKeySchema,
};

export default headersSchemas;