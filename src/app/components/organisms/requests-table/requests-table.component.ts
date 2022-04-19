import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})
export class RequestsTableComponent implements AfterViewInit, OnInit {

  @Input() displayedColumns: string[] = [];
  @Input() customerRequests: CustomerRequest[] | undefined = [];
  @Input() isHistorical: boolean = false;
  fieldBusiness: string = "Negocio";
  dataSource: any;
  pipe: DatePipe;
  company: Company | undefined;
  secundaryColor: string | undefined = "";
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.secundaryColor = this.company?.color2;
    this.pipe = new DatePipe('en');
    this.nameFieldBusiness();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<CustomerRequest>(this.customerRequests);
  }

  ngAfterViewInit() {
    if(this.paginator) this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get fromDate() { return this.filterForm.get('fromDate')?.value; }
  get toDate() { return this.filterForm.get('toDate')?.value; }

  applyFilterDate() {
    if (!this.fromDate || !this.toDate || !this.customerRequests){
      return;
    }

    this.dataSource.data = this.customerRequests.filter(data=> {
      if (data.approvalDate)
        return data.approvalDate >= this.fromDate && data.approvalDate <= this.toDate
      return true;
    });
  }

  nameFieldBusiness(){
    if(localStorage.getItem("company") == "empresa1"){
      this.fieldBusiness = "Negocio";
    }
    else if(localStorage.getItem("company") == "empresa2"){
      this.fieldBusiness = "Tipo de Negocio";
    }
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
