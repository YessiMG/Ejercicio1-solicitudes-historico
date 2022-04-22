import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-new-requests-table',
  templateUrl: './new-requests-table.component.html',
  styleUrls: ['./new-requests-table.component.scss']
})
export class NewRequestsTableComponent implements OnInit {

  data: CustomerRequest[];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns: string[] = [];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ 'customerRequests': this.rows});
  company: Company | undefined;
  typeBusiness: string = "";

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { 
    this.company = companyService.getCompany();
    this.getTypeBusiness();
    this.data = [ { 
      registrationNumber: "", 
      documentType: "", 
      documentNumber: "",
      customerName: "",
      businessType: this.typeBusiness,
      requestDate: new Date(),
      requestNumber: this.generateNumberRequest(),
      customerEmail: "",
      value: 1
    } ];
  }

  ngOnInit(): void {
    this.data.forEach((d: CustomerRequest) => this.addRow(d, false));
    this.updateView();
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
  }

  addRow(d?: CustomerRequest, noUpdate?: boolean) {
    if (this.form.invalid){
      alert("Completa todos los campos");
      return;
    }
    const row = this.fb.group({
      'registrationNumber'   : [""],
      'documentType': [""],
      documentNumber: [""],
      customerName: [""],
      businessType: [this.typeBusiness],
      requestDate: [d && d.requestDate   ? d.requestDate   : null, []],
      requestNumber: this.generateNumberRequest(),
      customerEmail: [""],
      value: 1
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  getTypeBusiness(){
    if(this.company?.id == "empresa1"){
      this.typeBusiness = "Pago por consumo";
      this.displayColumns = ['registrationNumber', 'documentType', 'documentNumber', 'customerName', 'customerEmail', 'businessType', 'requestDate', 'requestNumber', 'value', 'ctl'];
    }
    else if(this.company?.id == "empresa2"){
      this.displayColumns = ['documentType', 'documentNumber', 'customerName', 'customerEmail', 'requestNumber', 'registrationNumber', 'requestDate', 'businessType', 'value', 'ctl'];
      this.typeBusiness = "Pago previo";
    }
  }

  generateNumberRequest(){
    let dt = new Date().getTime();
    let nrid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
      let r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return nrid;
  }
  saveRequests() {
    if (this.form.invalid) return;
    for(let i=0; i<this.rows.value.length; i++){
      if (i % 2 == 0){
        let copyDate = this.rows.value[i].requestDate;
        this.rows.value[i].approvalDate = this.addDays(copyDate, 5);
      }
    }
    if(this.company){
    this.company.requests = this.company?.requests.concat(this.rows.value);
    this.form.reset();
      for (const field in this.form.controls) {
        const control = this.form.get(field);
        control?.clearValidators();
        control?.updateValueAndValidity();
      }
    this.router.navigate(['/home']);
    }
  }

  addDays(date: Date, days: number){
    let dateNew = new Date();
    dateNew.setDate(date.getDate() + days);
    return dateNew;
  }
}
