import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[];

  constructor() { 
    this.users = new Array<User>();

    this.users = [
      {
        id: 1,
        name: "admin",
        email: "admin@empresa1.co",
        password: "Tramiti2022",
        companyId: "empresa1"
      },
      {
        id: 2,
        name: "admin",
        email: "admin@empresa2.co",
        password: "Tramiti2022",
        companyId: "empresa2"
      }
    ];
  }

  getUser(){
    let email = localStorage.getItem('token');
    let user: User | undefined;
    user = this.users.find((u: User) => {
      if(email != null) return u.email == email;
      return undefined;
    });
    return user;
  }

  authUser(login: Login){
    return this.users.find((user: User)=>user.email == login.email && user.password == login.password);
  }
  
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('company');
  } 
}
