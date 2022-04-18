import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss']
})
export class PendingRequestsComponent implements OnInit {

  principalColor;
  company: Company | undefined;
  typeCompany: string | null = "";
  displayedColumns: string[] = [];
  customerRequests: CustomerRequest[] | undefined = [];

  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.typeCompany = localStorage.getItem("company");
    this.customerRequests = this.getCustomerRequests();
    this.principalColor = this.company?.color1;
    this.getColumnsTable();
  }

  ngOnInit(): void {
  }

  private getColumnsTable(){
    if(this.typeCompany == "empresa1"){
      this.displayedColumns = ['registrationNumber', 'documentType', 'documentNumber', 'customerName', 'businessType', 'requestDate'];
    }
    else if(this.typeCompany == "empresa2"){
      this.displayedColumns = ['documentType', 'documentNumber', 'customerName', 'requestNumber', 'registrationNumber', 'requestDate', 'businessType'];
    }
  }

  private getCustomerRequests() {
    return this.company?.requests.filter(request=> request.approvalDate == null || request.approvalDate == undefined);
  }

}
