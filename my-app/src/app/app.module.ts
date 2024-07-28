import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { StudentsModule } from './modules/students/students.module';
import { DemoModule } from './modules/demo/demo.moduel';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing-module';
import { CustomDirective } from './modules/demo/custom.directive';
import { DirectiveDemoComponent } from './modules/demo/directive-demo/directive-demo.component';


@NgModule({
    // מערך של כל הקומפ' המשתתפות
    declarations: [AppComponent, HomeComponent, PageNotFoundComponent, CustomDirective, DirectiveDemoComponent],
    imports: [BrowserModule, FormsModule, StudentsModule, DemoModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
