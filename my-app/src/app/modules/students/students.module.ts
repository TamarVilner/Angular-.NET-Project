import { NgModule } from "@angular/core";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentDetailsComponent } from "./student-details/student-details.component";
import { StudentDetailsFormMDComponent } from "./student-details-form-md/student-details-form-md.component";
import { StudentService } from "./student.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { LoginSrvice } from "./login.service";

@NgModule({
    declarations: [StudentListComponent, StudentDetailsComponent, StudentDetailsFormMDComponent, LoginComponent],
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
    providers: [StudentService, LoginSrvice],
    exports: [StudentListComponent]
})
export class StudentsModule{


}