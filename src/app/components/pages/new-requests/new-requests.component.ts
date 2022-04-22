import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.scss']
})
export class NewRequestsComponent implements OnInit {

  principalColor;
  secundaryColor;
  company: Company | undefined;
  fileName: string = "";

  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.getFileName();
    this.principalColor = this.company?.color1;
    this.secundaryColor = this.company?.color2;
  }

  ngOnInit(): void {
  }

  getFileName() {
    if(localStorage.getItem('company')=="empresa1"){
      this.fileName = "NuevasSolicitudes1";
    }
    else if(localStorage.getItem('company')=="empresa2"){
      this.fileName = "NuevasSolicitudes2";
    }
  }

}
