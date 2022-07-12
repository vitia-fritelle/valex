import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

async function createCard(_req:Request, res:Response, next:NextFunction) {
    try {
        const apiKey = res.locals.headers['x-api-key'];
        const employeeId = parseInt(res.locals.body.id, 10);
        const cardType = res.locals.headers.type;

        const {id: companyId} = await services.cardServices.isApiKeyValid(apiKey);
        const {fullName} = await services.cardServices.isEmployeeRegistered(employeeId, companyId);
        await Promise.all([
            await services.cardServices.hasCardSameType(cardType, employeeId),
            await services.cardServices.saveCard(employeeId, fullName, cardType)
        ]);
        res.sendStatus(201);
    } catch (e) {
        next(e)
    }
}

async function activateCard(req: Request, res:Response, next:NextFunction) {
    try {
        const {cardId, password, cvc} = req.body;
        const {
            id,
            expirationDate, 
            securityCode, 
            password: cardPassword
        } = await services.cardServices.getCardById(parseInt(cardId, 10));
        await Promise.all([
            await services.cardServices.isExpired(expirationDate),
            await services.cardServices.hasPassword(cardPassword),
            await services.cardServices.sameCvcs(cvc, securityCode),
            await services.cardServices.has4Numbers(password),
        ]);
        await services.cardServices.updatePassword(id, password);
        res.sendStatus(200);
    } catch (e) {
        next(e)
    }
}

async function viewCard(req: Request, res:Response, next:NextFunction) {
    try {
        const cardId = parseInt(req.params.id,10);
        const {id} = await services.cardServices.getCardById(cardId);
        const [payments, recharges] = await Promise.all([
            await services.paymentServices.getCardPayments(id), 
            await services.rechargeServices.getCardRecharges(id),
        ]); 
        const balance = utils.quantityUtils.getBalance(payments, recharges);
        res.status(200).json({balance, transactions: payments, recharges});
    } catch (e) {
        next(e);
    }
}

async function blockCard(req: Request, res:Response, next:NextFunction) {
    try {
        const {cardId, password} = req.body;
        const {id, expirationDate, isBlocked, password: cardPassword} = await services.cardServices.getCardById(cardId);
        await Promise.all([
            await services.cardServices.isExpired(expirationDate),
            await services.cardServices.isBlocked(isBlocked),
            await services.cardServices.samePassword(cardPassword as string, password),
        ]);
        await services.cardServices.blockCard(id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}

async function unBlockCard(req: Request, res:Response, next:NextFunction) {
    try {
        const {cardId, password} = req.body;
        const {id, expirationDate, isBlocked, password: cardPassword} = await services.cardServices.getCardById(cardId);
        await Promise.all([
            await services.cardServices.isExpired(expirationDate),
            await services.cardServices.isUnBlocked(isBlocked),
            await services.cardServices.samePassword(cardPassword as string, password),
        ]);
        await services.cardServices.unBlockCard(id);
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}

const cardControllers = {
    createCard,
    activateCard,
    viewCard,
    blockCard,
    unBlockCard,
}

export default cardControllers;