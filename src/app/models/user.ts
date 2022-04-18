import { Company } from "./company";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    companyId: string;
}