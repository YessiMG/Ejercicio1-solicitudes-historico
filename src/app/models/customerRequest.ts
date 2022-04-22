export interface CustomerRequest {
    registrationNumber: string;
    documentType: string;
    documentNumber: string;
    customerName: string;
    businessType: string;
    requestDate: Date;
    requestNumber: string;
    customerEmail: string;
    approvalDate?: Date;
    value: number;
    paymentDate?: Date;
}