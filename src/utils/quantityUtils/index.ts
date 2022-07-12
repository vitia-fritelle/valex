import { PaymentWithBusinessName } from "../../repositories/paymentRepository/types";
import { Recharge } from "../../repositories/rechargeRepository/types";

function getBalance(
    payments: Array<PaymentWithBusinessName>, 
    recharges: Array<Recharge>
) {
    const income = recharges.reduce((acc,curr) => acc+curr.amount,0);
    const debt = payments.reduce((acc,curr) => acc+curr.amount,0); 
    return income-debt; 
}

const quantityUtils = {
    getBalance,
}

export default quantityUtils;