import { connection } from "../../database.js";
import { Employee } from "./types";

async function findById(id: number) {
    const result = await connection.query<Employee, [number]>(
        "SELECT * FROM employees WHERE id=$1",
        [id]
    );

    return result.rows[0];
}

const employeeRepository = {
    findById,
}

export default employeeRepository;
