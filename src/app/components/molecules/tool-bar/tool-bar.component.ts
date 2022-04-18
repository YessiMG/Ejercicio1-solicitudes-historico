import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  panelOpenState = false;
  principalColor;
  secundaryColor;
  company: Company | undefined;

  constructor(private companyService: CompanyService, private loginService: LoginService, private router: Router) { 
    this.company = companyService.getCompany();
    this.principalColor = this.company?.color1;
    this.secundaryColor = this.company?.color2;
  }

  ngOnInit(): void {  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
