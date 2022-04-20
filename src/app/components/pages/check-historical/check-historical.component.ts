import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-check-historical',
  templateUrl: './check-historical.component.html',
  styleUrls: ['./check-historical.component.scss']
})
export class CheckHistoricalComponent implements OnInit {
  date = new Date();
  principalColor;
  company: Company | undefined;
  displayedColumns: string[] = [];
  customerRequests: CustomerRequest[] | undefined = [];
  typeCompany: string | null = "";
  consumptionActualMonth:number;
  consumptionLastMonth:number;
  previousBalance: number;
  units: number | undefined;
  stock: number | undefined;


  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.customerRequests = this.getCustomerRequests();
    this.principalColor = this.company?.color1;
    this.typeCompany = localStorage.getItem("company");
    this.consumptionActualMonth = this.getConsumptionMonth(this.date.getMonth());
    this.consumptionLastMonth = this.getConsumptionMonth(this.date.getMonth()-1);
    this.previousBalance = this.getPreviousMonthBalance();
    this.units = this.company?.requests.filter(r=> r.approvalDate).length;
    this.stock = this.getStock();
    this.getColumnsTable();
  }

  ngOnInit(): void {
  }

  private getColumnsTable(){
    this.displayedColumns = ['registrationNumber', 'customerName', 'customerEmail', 'approvalDate', 'businessType'];
  }

  private getCustomerRequests() {
    return this.company?.requests.filter(request=> request.approvalDate);
  }

  private getConsumptionMonth(month:number): number {
    let count = 0;
    let year = 0;
    if(month == 0) year = this.date.getFullYear()-1;
    else if(month != 0) year = this.date.getFullYear();
    this.company?.requests.forEach(r=>{
      if(r.approvalDate) r.approvalDate.setHours(0, 0, 0, 0); 
      if(r.approvalDate?.getMonth() == month && r.approvalDate.getFullYear() == year){
        count += 1;
      }
    });
    return count;
  }

  private getPreviousMonthBalance() {
    let countRequests = 0;
    let countPayment = 0;
    let balance = 0;
    let year = 0;
    this.company?.requests.forEach(r=>{
      if(r.approvalDate) r.approvalDate.setHours(0, 0, 0, 0); 
      if(r.paymentDate) r.paymentDate.setHours(0, 0, 0, 0);
      if(r.approvalDate?.getMonth() == this.date.getMonth()-1){
        if(r.approvalDate?.getMonth() == 0){ 
          year = this.date.getFullYear()-1;
        }
        else if(r.approvalDate?.getMonth() != 0){
          year = this.date.getFullYear();
        }
        if(r.approvalDate?.getFullYear() == year){
          countRequests += r.value;
        }
      }
      if(r.paymentDate?.getMonth() == this.date.getMonth()-1 && r.paymentDate?.getFullYear() == year){
        countPayment += r.value;
      }
    });
    balance = countPayment - countRequests;
    return balance;
  }

  private getStock(){
    let unitsTotal = this.company?.units;
    let units = this.company?.requests.filter(r=> r.approvalDate).length;
    if(units && unitsTotal) return unitsTotal - units;
    return 0;
  }
}
