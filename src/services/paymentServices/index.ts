import repositories from "../../repositories";
import { TransactionTypes } from "../../repositories/cardRepository/types";
import utils from "../../utils";

async function getCardPayments(id: number) {
    return await repositories.paymentRepository.findByCardId(id);
}

async function getBusiness(businessId: number) {
    const business = await repositories.businessRepository.findById(businessId)
    return business;
}

async function sameType(businessType: TransactionTypes, cardType: TransactionTypes) {
    if(businessType !== cardType) {
        throw new utils.errorUtils.CustomError(422, 'Não possuem o mesmo tipo');
    }
}

async function sufficientMoney(balance: number, amount: number) {
    if(amount > balance) {
        throw new utils.errorUtils.CustomError(422, 'O saldo não cobre!');
    }
}

const paymentServices = {
    getCardPayments,
    getBusiness,
    sameType,
    sufficientMoney,
};

export default paymentServices;