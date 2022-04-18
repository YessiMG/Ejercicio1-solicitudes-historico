import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree { 
      return this.verifyLogin();
  }
  
  verifyLogin(): boolean{
    let status = false;
    if(!this.isLoggedIn()){
        this.router.navigate(['/login']);
    }
    else if(this.isLoggedIn()){
        status = true;
    }
    return status;
  }

  public isLoggedIn(): boolean{
      let status = false;
      if( localStorage.getItem('isLoggedIn') == "true"){
        status = true;
      }
      return status;
  }
}
