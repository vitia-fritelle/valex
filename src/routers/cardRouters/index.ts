import { Router } from "express";
import controllers from '../../controllers'
import middlewares from "../../middlewares";
import schemas from "../../schemas";

const { validateSchema } = middlewares.validationMiddlewares;
const { createCard, activateCard, viewCard, blockCard, unBlockCard } = controllers.cardControllers;
const { cardTypeSchema } = schemas.cardSchemas;
const { apiKeySchema } = schemas.headersSchemas;

const router = Router();

router.post(
    '/', 
    validateSchema({body: cardTypeSchema, headers: apiKeySchema}), 
    createCard
);

router.put(
    '/',
    activateCard
);

router.get(
    '/:id',
    viewCard
)

router.post(
    '/block',
    blockCard
)

router.post(
    '/unblock',
    unBlockCard
)

export default router;