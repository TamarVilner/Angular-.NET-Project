import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSrvice } from './modules/students/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.getUser();
  }

  constructor(private loginService: LoginSrvice) { }

  canDeactivate() { }
}
