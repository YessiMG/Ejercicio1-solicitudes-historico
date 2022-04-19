import { Injectable } from '@angular/core';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companies: Company[];

  constructor() { 
    this.companies = new Array<Company>();

    this.companies = [
      {
        id: "empresa1",
        name: "Empresa 1",
        color1: "#03989e",
        color2: "#8138FF",
        logo: "empresa1.png",
        businessModel: "Por consumo",
        requests: [
          {
            registrationNumber: "0000FMI",
            documentType: "Cédula de ciudadanía",
            documentNumber: "1069777777",
            customerName: "Yessica Malaver",
            businessType: "Pago por consumo",
            requestDate: new Date("2022-03-16"),
            requestNumber: 1,
            customerEmail: "malaveryess@gmail.com",
            approvalDate: new Date("2022-03-20"),
            value: 12000000
          },
          {
            registrationNumber: "0001FMI",
            documentType: "Cédula de extranjería",
            documentNumber: "45033955",
            customerName: "Hernán Malaver",
            businessType: "Pago por consumo",
            requestDate: new Date("2022-04-01"),
            requestNumber: 2,
            customerEmail: "hernanmalaver@gmail.com",
            value: 8000000
          }
        ]
      },
      {
        id: "empresa2",
        name: "Empresa 2",
        color1: "#38b6ff",
        color2: "#ff914d",
        logo: "empresa2.png",
        businessModel: "Previo pago",
        requests: [
          {
            registrationNumber: "0033FMI",
            documentType: "NIT",
            documentNumber: "890.680.062-2",
            customerName: "Universidad de Cundinamarca",
            businessType: "Pago previo ",
            requestDate: new Date("2022-04-03"),
            requestNumber: 1,
            customerEmail: "",
            approvalDate: new Date("2022-04-10"),
            value: 20000000,
            paymentDate: new Date("2022-04-11")
          },
          {
            registrationNumber: "0034FMI",
            documentType: "NIT",
            documentNumber: "890.680.062-2",
            customerName: "Universidad de Cundinamarca",
            businessType: "Pago previo ",
            requestDate: new Date("2022-04-03"),
            requestNumber: 1,
            customerEmail: "",
            value: 20000000
          }
        ]
      }
    ];
  }

  getCompany() {
    let companyId = localStorage.getItem('company');
    let company: Company | undefined;
    company = this.companies.find((c: Company) => {
      if(companyId != null) return c.id == companyId
      return undefined;
    });
    return company;
  }
}
