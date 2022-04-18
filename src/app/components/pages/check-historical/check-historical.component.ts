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

  principalColor;
  company: Company | undefined;
  displayedColumns: string[] = [];
  customerRequests: CustomerRequest[] | undefined = [];

  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.customerRequests = this.getCustomerRequests();
    this.principalColor = this.company?.color1;
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

}
