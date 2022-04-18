import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  message: string = "";
  returnUrl: string = "";

  constructor(private formBuilder: FormBuilder, 
              private loginService: LoginService,
              private router: Router,
              ) { 
                this.loginForm = this.formBuilder.group({
                  email: ['', Validators.required],
                  password: ['', Validators.required],
                });
              }

  ngOnInit(): void { 
    this.returnUrl = '/home';
    this.loginService.logout();
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor';
    }

    return this.email.hasError('email') ? 'No es un correo válido' : '';
  }

  submitLogin(login: Login){
    let domain = login.email.split('@',2);
    if (this.loginForm.invalid) return;
    if(this.loginService.authUser(login) == undefined || this.loginService.authUser(login) == null){
      this.message = "¡Por favor revise su correo electrónico y contraseña!";
    }
    else if(this.loginService.authUser(login)){
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', login.email);
      localStorage.setItem('company', domain[1].split('.', 1)[0]);
      this.router.navigate([this.returnUrl]);
    }
  }
}
