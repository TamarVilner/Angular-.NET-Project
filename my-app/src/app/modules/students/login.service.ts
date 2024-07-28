import { Injectable } from "@angular/core";

@Injectable()
export class LoginSrvice {

    isUser: boolean = false;

    setUser() {
        console.log(this.isUser);
        this.isUser = !this.isUser;
        console.log(this.isUser);
    }

    getUser(): boolean {
        return this.isUser;
    }

}