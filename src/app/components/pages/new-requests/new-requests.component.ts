import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
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
  public requests: CustomerRequest[] = [];
  uploadFile = false;
  

  @ViewChild('csvReader') csvReader: any;

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

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray;
        if(csvData) csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.requests = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('¡Ocurrió un error al leer el archivo!');
      };

    } else {
      alert("Por favor importa un archivo .csv válido");
      this.fileReset();
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(';');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(';');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CustomerRequest = {} as CustomerRequest;
        if(localStorage.getItem('company') == "empresa1"){
          csvRecord.registrationNumber = curruntRecord[0].trim();
          csvRecord.documentType = curruntRecord[1].trim();
          csvRecord.documentNumber = curruntRecord[2].trim();
          csvRecord.customerName = curruntRecord[3].trim();
          csvRecord.customerEmail = curruntRecord[4].trim();
          csvRecord.requestDate = new Date(curruntRecord[5].trim());
          csvRecord.value = curruntRecord[6].trim();
          csvRecord.businessType = this.getTypeBusiness();
          csvRecord.requestNumber = this.generateNumberRequest();
        }
        else if(localStorage.getItem('company') == "empresa2"){
          csvRecord.documentType = curruntRecord[0].trim();
          csvRecord.documentNumber = curruntRecord[1].trim();
          csvRecord.customerName = curruntRecord[2].trim();
          csvRecord.customerEmail = curruntRecord[3].trim();
          csvRecord.registrationNumber = curruntRecord[4].trim();
          csvRecord.requestDate = new Date(curruntRecord[5].trim());
          csvRecord.value = curruntRecord[6].trim();
          csvRecord.businessType = this.getTypeBusiness();
          csvRecord.requestNumber = this.generateNumberRequest();
        }

        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.requests = [];
  }

  getTypeBusiness(){
    let typeBusiness = "";
    if(this.company?.id == "empresa1"){
      typeBusiness = "Pago por consumo";
    }
    else if(this.company?.id == "empresa2"){
      typeBusiness = "Pago previo";
    }
    return typeBusiness;
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

  sendRequests() {
    for(let i=0; i<this.requests.length; i++){
      if (i % 2 == 0){
        let copyDate = this.requests[i].requestDate;
        this.requests[i].approvalDate = this.addDays(copyDate, 5);
      }
    }
    if(this.company){
      this.company.requests = this.company?.requests.concat(this.requests);
      alert("Excel cargado satisfactoriamente, revisa en la bandeja de solicitudes pendientes y/o procesadas");
    }
    this.fileReset();
  }

  addDays(date: Date, days: number){
    let dateNew = new Date();
    dateNew.setDate(date.getDate() + days);
    return dateNew;
  }

  uploadFileButton(){
    this.uploadFile = true;
  }
}
