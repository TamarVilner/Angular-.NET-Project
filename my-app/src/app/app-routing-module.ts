import { NgModule } from "@angular/core";
import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StudentListComponent } from "./modules/students/student-list/student-list.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { StudentDetailsFormMDComponent } from "./modules/students/student-details-form-md/student-details-form-md.component";
import { LoginComponent } from "./modules/students/login/login.component";
import { ObservableDemoComponent } from "./modules/demo/observable-demo/observable-demo.component";
import { DirectiveDemoComponent } from "./modules/demo/directive-demo/directive-demo.component";


const APP_ROUTES: Route[] = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "students", component: StudentListComponent },
    { path: "directive", component: DirectiveDemoComponent },
    { path: "observable", component: ObservableDemoComponent },
    { path: "studentsDetails/:student", component: StudentDetailsFormMDComponent },
    { path: "settings", canActivate: [AuthGuardService], loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule) },
    { path: "**", component: PageNotFoundComponent } //קריטי שיהיה בסוף שלא ילכד אליו את כל ההפניות
]

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}