import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

async function payment(_req: Request, res: Response, next: NextFunction) {
    try {
        const {cardId, amount, password, businessId} = res.locals.body;
        const {id, expirationDate, password: cardPassword, isBlocked} = await services.cardServices.getCardById(cardId);
        await services.cardServices.isActive(String(password));
        await services.cardServices.isExpired(expirationDate);
        await services.cardServices.isBlocked(isBlocked);
        await services.cardServices.samePassword(cardPassword as string, String(password));
        const { type: businessType } = await services.paymentServices.getBusiness(businessId);
        const { type: cardType} =  await services.cardServices.getCardById(id);
        await services.paymentServices.sameType(businessType, cardType);
        const [payments, recharges] = await Promise.all([
            await services.paymentServices.getCardPayments(id), 
            await services.rechargeServices.getCardRecharges(id),
        ]); 
        const balance = utils.quantityUtils.getBalance(payments, recharges);
        await services.paymentServices.sufficientMoney(balance, amount);
        await services.cardServices.payment(cardId, businessId, amount);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

const paymentControllers = {
    payment,
};

export default paymentControllers;