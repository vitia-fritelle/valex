import { connection } from "../../database.js";
import { Business } from "./types";

async function findById(id: number) {
    const result = await connection.query<Business, [number]>(
        "SELECT * FROM businesses WHERE id=$1",
        [id]
    );

    return result.rows[0];
}

const businessRepository = {
    findById,
}

export default businessRepository;