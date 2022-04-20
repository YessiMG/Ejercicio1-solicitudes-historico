import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Company } from 'src/app/models/company';
import { CustomerRequest } from 'src/app/models/customerRequest';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-consumption-chart',
  templateUrl: './consumption-chart.component.html',
  styleUrls: ['./consumption-chart.component.scss']
})
export class ConsumptionChartComponent implements OnInit {

  @Input() customerRequests: CustomerRequest[] | undefined = [];

  company: Company | undefined;
  dates: Date[] = [];

  constructor(private companyService: CompanyService) { 
    this.company = companyService.getCompany();
    this.getMinAndMaxDates();
  }

  ngOnInit(): void {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Consumo',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public lineChartType: ChartType = 'line';

  getMinAndMaxDates() {
    let date = new Date();
    let pipe = new DatePipe('es-ES');
    let firstDay;
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.dates = [];
    if(localStorage.getItem('company') == 'empresa1'){
      firstDay= new Date(date.getFullYear(), date.getMonth(), 1);
    }
    else if(localStorage.getItem('company') == 'empresa2'){
      firstDay= new Date(date.getFullYear(), date.getMonth()-1, 1);
    }
    if(firstDay){
      while ((firstDay.getTime() <= lastDay.getTime())) {
        this.lineChartData.labels?.push(pipe.transform(new Date(firstDay), 'MMM d, y'));
        this.dates = [...this.dates, new Date(firstDay)];
        firstDay.setDate(firstDay.getDate() + 1);
      }
    }
    this.getDataSetData();
  }

  getDataSetData() {
    let countConsumption: number[] = new Array(this.dates.length);
    this.company?.requests.forEach(r=>{
      if(r.approvalDate)
      r.approvalDate.setHours(0, 0, 0, 0); 
    });
    for (let i = 0; i < this.dates.length; i++) {
      let count = 0;
      if(this.company?.requests) {
        count = this.company?.requests.filter(r=>{ 
          if(r.approvalDate) return r.approvalDate?.getTime()==this.dates[i].getTime();
          return 0;
        }).length;
      }
      countConsumption[i] = count;
    }
    this.lineChartData.datasets[0].data = countConsumption;
  }
}
