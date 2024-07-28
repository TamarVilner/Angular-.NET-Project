import { Component } from '@angular/core';
import { LoginSrvice } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private loginSrvice: LoginSrvice, private _router: Router){
  }

  login() {
    this.loginSrvice.setUser();
    alert("You have successfully connected, now you can enter the settings")
    this._router.navigate(["/settings"]);

  }
  
}
