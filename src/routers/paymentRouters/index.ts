import { Router } from "express";
import controllers from '../../controllers'
import middlewares from "../../middlewares";
import schemas from "../../schemas";

const { cardAmountSchema } = schemas.cardSchemas;
const { validateSchema } = middlewares.validationMiddlewares;
const { payment } = controllers.paymentControllers;

const router = Router();

router.post(
    '/',
    validateSchema({body: cardAmountSchema}),
    payment,
)

export default router;