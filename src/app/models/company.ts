import { CustomerRequest } from "./customerRequest";

export interface Company {
    id: string;
    name: string;
    color1: string;
    color2: string;
    logo: string;
    businessModel: string;
    requests: CustomerRequest[];
}