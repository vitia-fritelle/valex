import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';

type ValidationTypes = {
    body?: Joi.AnySchema,
    query?: Joi.AnySchema,
    params?: Joi.AnySchema,
    headers?: Joi.AnySchema,
}

function validateSchema(validations: ValidationTypes) {
    return async (req: Request,res: Response,next: NextFunction) => {
        try {
            await Promise.all(Object.entries(validations).map(async (entry) => {
                const [type, schema] = entry;
                await schema.validateAsync(req[type as keyof Request]);
            }))
            res.locals = req;
            next();
        } catch (e) {
            next(e);
        }
    }
}

const validationMiddlewares = {
    validateSchema,

};

export default validationMiddlewares;