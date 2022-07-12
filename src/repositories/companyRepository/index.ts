import { connection } from "../../database.js";
import { Company } from "./types";

async function findByApiKey(apiKey: string) {
    const result = await connection.query<Company, [string]>(
        'SELECT * FROM companies WHERE "apiKey"=$1',
        [apiKey]
    );

    return result.rows[0];
}

const companyRepository = {
    findByApiKey,
};

export default companyRepository;
