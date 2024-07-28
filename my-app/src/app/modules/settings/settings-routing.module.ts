import { NgModule } from "@angular/core";
import { Route, Router, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { AccountComponent } from "./account/account.component";

const SETTINGS_ROUTES: Route[] = [
    { path: "", redirectTo: "profile", pathMatch: "full" },
    { path: "profile", component: ProfileComponent },
    { path: "favorite", component: FavoritesComponent },
    { path: "account", component: AccountComponent }
]

@NgModule({
    imports: [RouterModule.forChild(SETTINGS_ROUTES)],
    exports: [RouterModule]
})
export class SettingsRouting {

}