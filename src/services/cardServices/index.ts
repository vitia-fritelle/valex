import Cryptr from 'cryptr';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import repositories from "../../repositories";
import utils from '../../utils';
import { TransactionTypes } from "../../repositories/cardRepository/types";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET_KEY || '2345691');

async function isApiKeyValid(apiKey: string) {
    const company = await repositories.companyRepository.findByApiKey(apiKey);
    return company;
}

async function isEmployeeRegistered(id: number, companyId: number) {
    const employee = await repositories.employeeRepository.findById(id); 
    if(companyId !== employee.companyId) {
        throw new utils.errorUtils.CustomError(
            422, 
            'O funcionário não está cadastrado nessa empresa.'
        )
    }
    return employee;
} 

async function hasCardSameType(type: TransactionTypes, employeeId: number) {
    await repositories.cardRepository.findByTypeAndEmployeeId(type, employeeId); 
}

async function saveCard(employeeId: number, fullName: string, type: TransactionTypes) {
    const cardNumber = faker.finance.creditCardNumber();
    const cvc = cryptr.encrypt(faker.finance.creditCardCVV());
    const expirationDate = utils.formatUtils.dateFormat(new Date());
    const cardholderName = utils.formatUtils.nameFormat(fullName);
    
    await repositories.cardRepository.insert({
        employeeId,
        number: cardNumber,
        cardholderName,
        securityCode: cvc,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: false,
        type,
    })
}

async function getCardById(cardId: number) {
    const card = await repositories.cardRepository.findById(cardId);
    return card;
}

async function isExpired(expirationDate: string) {
    const [month, year] = expirationDate.split('/').map((value) => parseInt(value, 10));
    const [nowMonth, nowYear] = utils.formatUtils.dateFormat(new Date()).split('/').map((value) => parseInt(value, 10));
    if (nowYear > year || (nowYear === year && month < nowMonth)) {
        throw new utils.errorUtils.CustomError(422, 'O cartão está expirado!');
    }
}

async function hasPassword(password: string|undefined) {
    if (password) {
        throw new utils.errorUtils.CustomError(422, 'O cartão já tem senha!');
    };
}

async function isActive(password: string|undefined) {
    if (!password) {
        throw new utils.errorUtils.CustomError(422, 'O cartão não está ativo!');
    }
}

async function sameCvcs(cvc: string, securityCode: string) {
    if (cvc !== securityCode) {
        throw new utils.errorUtils.CustomError(422, 'Problema no código de segurança do cartão.');
    }
}

async function has4Numbers(password: string) {
    const regex = new RegExp(/^\d{4}$/);
    if (!regex.test(password)) {
        throw new utils.errorUtils.CustomError(422, 'Problema na senha.')
    }
}

async function updatePassword(id: number, password: string) {
    const criptoPassword = await bcrypt.hash(password, 10);
    await repositories.cardRepository.update(id, {password: criptoPassword});
}

async function isBlocked(isBlocked: boolean) {
    if(isBlocked) {
        throw new utils.errorUtils.CustomError(422, 'O cartão está bloqueado.');
    }
}

async function isUnBlocked(isBlocked: boolean) {
    if(!isBlocked) {
        throw new utils.errorUtils.CustomError(422, 'O cartão está desbloqueado.');
    }
}

async function samePassword(passwordEncrypted: string, password: string) {
    if(!bcrypt.compare(password, passwordEncrypted)) {
        throw new utils.errorUtils.CustomError(422, 'Problema na senha.')
    }
}

async function blockCard(id: number) {
    await repositories.cardRepository.update(id, {isBlocked: true});
}

async function unBlockCard(id: number) {
    await repositories.cardRepository.update(id, {isBlocked: false});
}

async function recharge(cardId: number, amount: number) {
    await repositories.rechargeRepository.insert({cardId, amount});
}

async function payment(cardId: number, businessId: number, amount: number) {
    await repositories.paymentRepository.insert({cardId, businessId, amount});
}

const cardServices = {
    isApiKeyValid,
    isEmployeeRegistered,
    hasCardSameType,
    saveCard,
    getCardById,
    isExpired,
    hasPassword,
    sameCvcs,
    has4Numbers,
    updatePassword,
    isBlocked,
    isUnBlocked,
    samePassword,
    blockCard,
    unBlockCard,
    isActive,
    recharge,
    payment,
}

export default cardServices;