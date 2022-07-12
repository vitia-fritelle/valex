import { TransactionTypes } from "../../cardRepository/types";

export interface Business {
    id: number;
    name: string;
    type: TransactionTypes;
}