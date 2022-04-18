import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  fieldBusiness: string = "Negocio";
  dataSource: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() { 
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

  applyFilterDate() {
    const filterValue = this.customerRequests?.filter(request=>{
      if (request.approvalDate != undefined){
        return request?.approvalDate >= this.range.value.start && request?.approvalDate <= this.range.value.end
      }
      return;
    });
    this.dataSource = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
