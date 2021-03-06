import { connection } from "../../database.js";
import utils from "../../utils";
import { Card, CardInsertData, CardUpdateData, TransactionTypes } from "./types";

const { mapObjectToUpdateQuery } = utils.sqlUtils;

async function find() {
    const result = await connection.query<Card>("SELECT * FROM cards");
    return result.rows;
}

async function findById(id: number) {
    const result = await connection.query<Card, [number]>(
        "SELECT * FROM cards WHERE id=$1",
        [id]
    );

    return result.rows[0];
}

async function findByTypeAndEmployeeId(
    type: TransactionTypes,
    employeeId: number
) {
    const result = await connection.query<Card, [TransactionTypes, number]>(
        'SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2',
        [type, employeeId]
    );

    return result.rows[0];
}

async function findByCardDetails(
    number: string,
    cardholderName: string,
    expirationDate: string
) {
    const result = await connection.query<Card, [string, string, string]>(
        ` 
        SELECT * 
        FROM cards 
        WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
        [number, cardholderName, expirationDate]
    );

    return result.rows[0];
}

async function insert(cardData: CardInsertData) {
    const {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password,
        isVirtual,
        originalCardId,
        isBlocked,
        type,
    } = cardData;

    connection.query(
        `
        INSERT INTO cards (
            "employeeId", 
            number, 
            "cardholderName", 
            "securityCode",
            "expirationDate", 
            password, 
            "isVirtual", 
            "originalCardId", 
            "isBlocked", 
            type
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            employeeId,
            number,
            cardholderName,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            originalCardId,
            isBlocked,
            type,
        ]
    );
}

async function update(id: number, cardData: CardUpdateData) {
    const { objectColumns: cardColumns, objectValues: cardValues } =
    mapObjectToUpdateQuery({
        object: cardData,
        offset: 2,
    });

    connection.query(
        `
        UPDATE cards
        SET ${cardColumns}
        WHERE $1=id`,
        [id, ...cardValues]
    );
}

async function remove(id: number) {
    connection.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
}

const cardRepository = {
    remove,
    update,
    insert,
    findByCardDetails,
    findByTypeAndEmployeeId,
    findById,
    find,
}

export default cardRepository;