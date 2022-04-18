import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  company: Company | undefined;
  user: User | undefined;
  secundaryColor: string | undefined;

  constructor(private loginService: LoginService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.company = this.companyService.getCompany();
    this.user = this.loginService.getUser();
    this.secundaryColor = this.company?.color2;
  }
}
