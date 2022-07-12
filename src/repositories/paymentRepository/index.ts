import { connection } from "../../database.js";
import { PaymentInsertData, PaymentWithBusinessName } from "./types";

async function findByCardId(cardId: number) {
    const result = await connection.query<PaymentWithBusinessName, [number]>(
        `
        SELECT payments.*, businesses.name as "businessName"
        FROM payments 
        JOIN businesses ON businesses.id=payments."businessId"
        WHERE "cardId"=$1`,
        [cardId]
    );

    return result.rows;
}

async function insert(paymentData: PaymentInsertData) {
    const { cardId, businessId, amount } = paymentData;

    await connection.query<any, [number, number, number]>(
        `
        INSERT INTO payments ("cardId", "businessId", amount) 
        VALUES ($1, $2, $3)`,
        [cardId, businessId, amount]
    );
}

const paymentRepository = {
    insert,
    findByCardId,
}

export default paymentRepository;