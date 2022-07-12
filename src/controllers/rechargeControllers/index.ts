import { Request, Response, NextFunction } from "express";
import services from "../../services";

async function recharge(_req: Request, res: Response, next: NextFunction) {
    try {
        const {cardId, amount} = res.locals.body;
        const {expirationDate, password} = await services.cardServices.getCardById(cardId);
        await services.cardServices.isActive(password);
        await services.cardServices.isExpired(expirationDate);
        await services.cardServices.recharge(cardId, amount);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

const rechargeControllers = {
    recharge,
};

export default rechargeControllers;